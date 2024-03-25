import { View, Text, Pressable, Alert } from "react-native";
import React, { useState, useRef } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { blurhash } from "../../constant/common";
import TextField from "../../components/form/textField";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { COLORS } from "../../constant/theme";
import CustomButton from "../../components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import supabase from "../../configs/supabase";
import { decode } from "base64-arraybuffer";
import { useToast } from "react-native-toast-notifications";
import DeleteDialog from "../../components/DeleteDialog";

const AddNewCategoryItem = () => {
  const { categoryId } = useLocalSearchParams();
  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const itemName = useRef("");
  const cost = useRef(0);
  const url = useRef("");
  const note = useRef("");

  const router = useRouter();

  const toast = useToast();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      selectionLimit: 1,
      quality: 1,
    });

    if (!result.canceled) {
      setPreviewImage(result.assets[0].uri);
      setImage(result.assets[0].base64);
    }
  };

  const onCreateItem = async () => {
    if (itemName.current && cost.current) {
      setLoading(true);
      try {
        let baseUrlImage = 'https://ffznrhohffevxmekqboi.supabase.co/storage/v1/object/public/';
        if (image) {
          const { data } = await supabase.storage
            .from("MainStorage/budgetPlanner")
            .upload(
              `category-item-${categoryId}-${itemName.current}-${Date.now()}.png`,
              decode(image),
              {
                contentType: "image/png",
              }
            );
          
          baseUrlImage += data.fullPath;
        }

        const { status } = await supabase.from("CategoryItems").insert([
          {
            name: itemName.current,
            cost: cost.current,
            note: note.current,
            category_id: categoryId,
            image_url: baseUrlImage,
          }
        ])

        if(status === 201) {
          router.replace({ 
            pathname: "categoryDetail",
            params: { categoryId }
          });

          toast.show("Item created successfully", {
            type: "success",
          });
        }
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={{ flex: 1, padding: 10, alignItems: "center", gap: 15 }}>
      <View style={{ position: "relative", marginBottom: 20 }}>
        <Image
          source={previewImage ?? "http://via.placeholder.com/640x360"}
          placeholder={blurhash}
          transition={300}
          style={{
            aspectRatio: 1,
            height: 150,
            borderRadius: 10,
          }}
          contentFit="cover"
        />
        <Pressable
          onPress={pickImage}
          style={{
            position: "absolute",
            bottom: -10,
            right: -10,
            height: hp(5),
            aspectRatio: 1,
            backgroundColor: COLORS.primary,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AntDesign name="camerao" size={hp(3)} color={"white"} />
        </Pressable>
      </View>

      <TextField
        placeholder="Item name"
        icon={<AntDesign name="tags" size={hp(2.5)} color={COLORS.grey} />}
        onChangeText={(text) => (itemName.current = text)}
      />
      <TextField
        placeholder="Cost"
        icon={
          <FontAwesome5 name="dollar-sign" size={hp(2.5)} color={COLORS.grey} />
        }
        keyboardType="numeric"
        onChangeText={(text) => (cost.current = text)}
      />
      <TextField
        placeholder="URL"
        icon={<AntDesign name="link" size={hp(2.5)} color={COLORS.grey} />}
        onChangeText={(text) => (url.current = text)}
      />
      <TextField
        placeholder="Note"
        icon={
          <MaterialCommunityIcons
            name="pencil"
            size={hp(2.5)}
            color={COLORS.grey}
          />
        }
        numberOfLines={3}
        onChangeText={(text) => (note.current = text)}
      />

      <CustomButton label={"Add Item"} onPress={onCreateItem} loading={loading}/>
    </View>
  );
};

export default AddNewCategoryItem;
