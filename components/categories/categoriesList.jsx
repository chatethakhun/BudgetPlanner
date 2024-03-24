import { View, Text } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";
const CategoryList = ({ categories }) => {
  return (
    <View style={{  height: hp(50), marginTop: 20 }}>
      <Text style={{ fontFamily: "Outfit-Bold", fontSize: hp(2.5) }}>
        Latest Budget
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, marginTop: 10, paddingBottom: 10 }}
      >
        {categories.map((category, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 10,
              flexDirection: "row",
              gap: 20,
              justifyContent: "space-between"
            }}
          >
            <View style={{ flexDirection: "row", gap: 10}}>
              <View
                style={{
                  height: 100,
                  aspectRatio: 1,
                  backgroundColor: "red",
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>Emoji</Text>
              </View>
              <View style={{ justifyContent: "center" }}>
              <Text style={{ fontFamily: "Outfit-Bold", fontSize: hp(2) }}>BedRoom</Text>
              <Text style={{ fontFamily: "Outfit-Regular", fontSize: hp(1.5) }}>{`0 Items`}</Text>
            </View>
            </View>

            

            <View
              style={{ justifyContent: "center" }}
            >
              <Text style={{ fontFamily: "Outfit-Bold" }}>$3000</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryList;
