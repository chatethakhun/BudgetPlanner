import { View, Text, Pressable } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
const CategoryList = ({ categories }) => {
  const router = useRouter();

  return (
    <View style={{ height: hp(50), marginTop: 20 }}>
      <Text style={{ fontFamily: "Outfit-Bold", fontSize: hp(2.5) }}>
        Latest Budget
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, marginTop: 10, paddingBottom: 10 }}
      >
        {categories.map((category, index) => (
          <Pressable
            onPress={() => {
              router.push({
                pathname: "/categoryDetail",
                params: { categoryId: category.id },
              });
            }}
            key={index}
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 10,
              flexDirection: "row",
              gap: 20,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View
                style={{
                  height: 100,
                  aspectRatio: 1,
                  backgroundColor: category.color,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: hp(5) }}>{category.icon}</Text>
              </View>
              <View style={{ justifyContent: "center" }}>
                <Text style={{ fontFamily: "Outfit-Bold", fontSize: hp(2) }}>
                  {category.name}
                </Text>
                <Text
                  style={{ fontFamily: "Outfit-Regular", fontSize: hp(1.5) }}
                >{`${category.CategoryItems.length} Items`}</Text>
              </View>
            </View>

            <View style={{ justifyContent: "center" }}>
              <Text style={{ fontFamily: "Outfit-Bold" }}>{`$${category.assigned_budget}`}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryList;
