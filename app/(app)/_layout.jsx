import { Stack } from "expo-router/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { COLORS } from "../../constant/theme";
import { Pressable, View } from "react-native";
import { useRouter } from "expo-router";

export default function AppLayout() {
  const router = useRouter();
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
      <Stack.Screen
        name="categoryDetail"
        options={{
          headerTitle: "",
          headerBackground: () => {
            return (
              <View
                style={{
                  flex: 1,
                  backgroundColor: COLORS.lightGrey,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></View>
            );
          },
          headerLeft: () => {
            return (
              <Pressable
                style={{
                  backgroundColor: COLORS.darkGrey,
                  borderRadius: 50,
                  padding: 8,
                }}
              >
                <MaterialCommunityIcons
                  name="arrow-left"
                  size={hp(3)}
                  color={"white"}
                  onPress={() => router.replace("(tabs)")}
                />
              </Pressable>
            );
          },
        }}
      />


      <Stack.Screen name="addNewCategoryItem" options={{ headerTitle: "Add Category Item"}} />
    </Stack>
  );
}
