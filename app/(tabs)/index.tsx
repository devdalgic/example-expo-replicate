import {Image, StyleSheet, Platform, TextInput, Button} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from "react";
import Replicate from "replicate";

export default function HomeScreen() {
    const [prompt, onChangePrompt] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [image, setImage] = React.useState<string>("https://replicate.delivery/yhqm/SBdmNAnv2eWgdCnoKp1YqXJufQrkwsL3kBZstQfYs961dkcmA/out-0.webp");

    const replicate = new Replicate({
        auth: process.env.EXPO_PUBLIC_REPLICATE_API_TOKEN
    });

    async function createImage() {
        setLoading(true)
        const input = {
            prompt: prompt,
            output_quality: 90
        };

        const output = await replicate.run("black-forest-labs/flux-schnell",
            { input }) as string[];
        setLoading(false)
        setImage(output[0])
    }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Flux Schnell App</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <TextInput
          style={{
            padding: 8,
            borderRadius: 8,
            fontSize: 16,
          }}
          multiline
          onChangeText={onChangePrompt}
          value={prompt}
          placeholder="Prompt girin..."/>
          <Button title="Gönder" disabled={loading} onPress={() => createImage()} />
      </ThemedView>
        <ThemedView style={styles.stepContainer}>
            <Image
                source={{uri: image}}
                style={{height: 300, width: "100%"}}
                resizeMode={"contain"}
            />
        </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 2
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
