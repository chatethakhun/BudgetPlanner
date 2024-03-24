import { Stack } from "expo-router/stack";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="addNewCategory"
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Add new category",
        }}
      />
    </Stack>
  );
}
