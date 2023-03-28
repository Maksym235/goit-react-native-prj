// ------DEFAULT------------------
import { View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
//--------FONTS------------
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { useRoute } from "./Router";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const routing = useRoute(true);

  const [fontsLoaded] = useFonts({
    QR: require("./assets/fonts/Quicksand-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>{routing}</NavigationContainer>
    </View>
  );
}
