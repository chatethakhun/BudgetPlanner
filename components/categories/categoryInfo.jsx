import { View, Text, Pressable } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../../constant/theme";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import * as Progress from "react-native-progress";

const CategoryInfo = ({ category }) => {
  const sumCost = category.CategoryItems?.reduce((acc, item) => acc + item.cost, 0);

  const progressPercentage = (sumCost / category.assigned_budget ?? 0);

  return (
    <View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <View
          style={{
            height: 100,
            aspectRatio: 1,
            backgroundColor: category.color ?? "white",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15,
          }}
        >
          <Text style={{ fontSize: hp(6) }}>{category.icon ?? "Emoji"}</Text>
        </View>

        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontFamily: "Outfit-Bold", fontSize: hp(2.5) }}>
            {category.name ?? "Category Name"}
          </Text>
          <Text
            style={{
              fontFamily: "Outfit-Regular",
              fontSize: hp(2),
              color: COLORS.darkGrey,
            }}
          >
            {`${category.CategoryItems?.length ?? 0} Items`}
          </Text>
        </View>

        <Pressable style={{ marginLeft: "auto", justifyContent: "center" }}>
          <FontAwesome name="trash" size={hp(3)} color={COLORS.red} />
        </Pressable>
      </View>

      <View style={{ marginTop: 10 }}>
        <View style={{ marginBottom: 5, flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontFamily: "Outfit-Bold", fontSize: hp(1.8) }}>
            {`$${sumCost ?? 0}`}
          </Text>
          <Text
            style={{
              fontFamily: "Outfit-Regular",
              fontSize: hp(1.5),
              color: COLORS.darkGrey,
            }}
          >{`Total budget: $${category.assigned_budget ?? 0}`}</Text>
        </View>
        <Progress.Bar
          progress={progressPercentage}
          width={null}
          height={12}
          borderRadius={10}
          color={COLORS.primary}
          borderWidth={0}
          style={{
            backgroundColor: COLORS.grey,
          }}
        />
      </View>
    </View>
  );
};

export default CategoryInfo;
