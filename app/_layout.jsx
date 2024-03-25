import React, { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ToastProvider } from "react-native-toast-notifications";

const MainLayout = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  useEffect(() => {
    const inApp = segments[0] === "(app)";

    if (loading) {
      return;
    }

    if (isAuthenticated && !inApp) {
      router.replace("/(tabs)");
    } else if (!isAuthenticated) {
      router.replace("/login");
    }
    // You can add global side effects here
  }, [loading, isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Outfit-Regular": require("../assets/fonts/Outfit-Regular.ttf"),
    "Outfit-Bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "Outfit-Medium": require("../assets/fonts/Outfit-Medium.ttf"),
  });

  if (!fontsLoaded || fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ToastProvider>
          <StatusBar style="dark" />
          <MainLayout />
        </ToastProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
