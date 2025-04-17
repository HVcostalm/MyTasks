import { Audio } from "expo-av";

export async function tocarMusica() {
  const { sound } = await Audio.Sound.createAsync(
    require("./GtaSanAndreasSoundEffect.mp3")
  );
  await sound.setRateAsync(1.5, true);

  await sound.playAsync();
}
