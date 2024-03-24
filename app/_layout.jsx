import React, { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { StatusBar } from "expo-status-bar";

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
      router.push("/(tabs)");
    } else if (!isAuthenticated) {
      router.push("/login");
    }
    // You can add global side effects here
  }, [loading, isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <MainLayout />
    </AuthProvider>
  );
}
