import { Text, Pressable, View, Alert, TouchableOpacity } from "react-native";
import React, { useState, useMemo, useCallback, useRef } from "react";
import TextField from "../../components/form/textField";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { COLORS } from "../../constant/theme";
import CustomButton from "../../components/CustomButton";
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import BottomSheet, {
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import ColorPicker from "../../components/form/colorPicker";
import supabase from '../../configs/supabase'
import MODEL_NAME from '../../constant/model'
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "expo-router";

const pastelColors = [
  "#ffb6c1", // Light pink
  "#ffdead", // Navajo white
  "#add8e6", // Light blue
  "#98fb98", // Pale green
  "#ffc0cb", // Pink
  "#ffe4e1", // Misty rose
  "#f0e68c", // Khaki
];
const AddNewCategory = () => {
  const { user } = useAuth()
  const [emojiSelected, setEmojiSelected] = useState(null);
  const [colorSelected, setColorSelected] = useState(pastelColors[2]);
  const categoryName = useRef("");
  const totalBudget = useRef(0);
  const router = useRouter();

  const bottomSheetRef = React.useRef(null);
  const initialSnapPoints = useMemo(() => ["75%", "100%"], []);

  const onCreateCategory = useCallback(async () => {
    console.log("Category Created");
    if (
      emojiSelected &&
      categoryName.current &&
      totalBudget.current &&
      colorSelected
    ) {
      console.log("Category Created");

      try {
        const { status } = await supabase.from(MODEL_NAME.CATEGORY).insert([
          {
            name: categoryName.current,
            icon: emojiSelected,
            color: colorSelected,
            assigned_budget: totalBudget.current,
            created_by: user.email
          }
        ])

        if(status === 201) {
          router.back()
        }
      } catch (error) {
        Alert.alert("Error", error.message)
      }
    }
  }, [emojiSelected, categoryName.current, totalBudget.current, colorSelected]);

  return (
    <View style={{ flex: 1, padding: 20, gap: 20, alignItems: "center" }}>
      <TouchableOpacity onPress={() => bottomSheetRef.current.snapToIndex(0)}>
        <View
          style={{
            height: 60,
            aspectRatio: 1,
            backgroundColor: colorSelected,
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: hp(3),
              textAlign: "center",
            }}
          >
            {emojiSelected}
          </Text>
        </View>
      </TouchableOpacity>

      <ColorPicker
        colorsOptions={pastelColors}
        colorSelected={colorSelected}
        onChange={(color) => setColorSelected(color)}
      />

      <TextField
        icon={<AntDesign name="tags" size={hp(2.5)} color={COLORS.grey} />}
        placeholder="Category Name"
        onChangeText={(text) => (categoryName.current = text)}
      />
      <TextField
        keyboardType="numeric"
        icon={
          <FontAwesome5 name="dollar-sign" size={hp(2.5)} color={COLORS.grey} />
        }
        placeholder="Total Budget"
        onChangeText={(text) => (totalBudget.current = text)}
      />
      <CustomButton label={"Add Category"} onPress={onCreateCategory} />

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={initialSnapPoints}
        index={-1}
        enablePanDownToClose
      >
        <BottomSheetView
          style={{
            flex: 1,
            padding: 20,
          }}
        >
          <EmojiSelector
            category={Categories.symbols}
            onEmojiSelected={(emoji) => setEmojiSelected(emoji)}
          />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default AddNewCategory;
