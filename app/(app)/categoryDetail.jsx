import {
  View,
  Alert,
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import supabase from "../../configs/supabase";
import MODEL_NAME from "../../constant/model";
import { COLORS } from "../../constant/theme";
import CategoryInfo from "../../components/categories/categoryInfo";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Image } from "expo-image";
import { blurhash } from "../../constant/common";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CategoryDetail = () => {
  const { categoryId } = useLocalSearchParams();
  const [category, setCategory] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const getCategory = useCallback(async () => {
    try {
      const { data } = await supabase
        .from(MODEL_NAME.CATEGORY)
        .select("*, CategoryItems(*)")
        .eq("id", categoryId)
        .single();

      setCategory(data);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 15,
        backgroundColor: COLORS.lightGrey,
        gap: 30,
      }}
    >
      <CategoryInfo category={category} />

      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: "Outfit-Bold", fontSize: hp(2.3) }}>
          Item List
        </Text>
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 10, marginTop: 10 }}
        >
          {category.CategoryItems.length ? (
            category.CategoryItems?.map((item, index) => (
              <View
                key={item.id}
                style={{
                  flexDirection: "row",
                  gap: 15,
                  borderBottomWidth:
                    category.CategoryItems.length - 1 === index ? 0 : 1,
                  paddingBottom: 10,
                  borderColor: COLORS.grey,
                }}
              >
                <Image
                  source={item.image_url ?? "http://via.placeholder.com/640x360"}
                  placeholder={blurhash}
                  transition={500}
                  style={{
                    aspectRatio: 1,
                    height: 100,
                    borderRadius: 10,
                  }}
                />

                <View style={{ justifyContent: "center", flex: 1 }}>
                  <Text style={{ fontSize: hp(2), fontFamily: "Outfit-Bold" }}>
                    {item.name}
                  </Text>
                  <Text
                    ellipsizeMode="tail"
                    lineBreakMode="tail"
                    numberOfLines={3}
                    style={{ fontSize: hp(1.8), fontFamily: "Outfit-Regular" }}
                  >
                    {item.note}
                  </Text>
                </View>

                <View style={{ justifyContent: "center" }}>
                  <Text
                    style={{ fontFamily: "Outfit-Bold", fontSize: hp(2) }}
                  >{`$${item.cost}`}</Text>
                </View>
              </View>
            ))
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: hp(2.8),
                  fontFamily: "Outfit-Bold",
                  color: COLORS.grey,
                }}
              >
                Item is empty
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "addNewCategoryItem",
            params: { categoryId },
          })
        }
        style={{
          position: "absolute",
          bottom: 20,
          right: 16,
          height: 50,
          width: 50,
          borderRadius: 50,
          backgroundColor: COLORS.primary,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name="plus-thick"
          size={hp(4)}
          color={"white"}
        />
      </TouchableOpacity>
    </View>
  );
};

const Divider = () => (
  <View
    style={{ height: 1, backgroundColor: COLORS.lightGrey, marginVertical: 10 }}
  />
);

export default CategoryDetail;
