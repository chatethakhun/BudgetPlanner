import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Image } from "expo-image";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { blurhash } from "../constant/common";
import { COLORS } from "../constant/theme";
import { Octicons } from "@expo/vector-icons";

const HomeHeader = () => {
  const { user } = useAuth();

  console.log(user);

  return (
    <View
      style={{
        height: hp(15),
        backgroundColor: COLORS.primary,
        paddingHorizontal: 15,
        flexDirection: "row",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "end",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            height: "100%",
            paddingBottom: 10,
            flexDirection: "row",
            gap: 10,
            alignItems: "flex-end",
          }}
        >
          <Image
            source={user.picture ?? require("../assets/grey-bg.jpg")}
            style={{
              aspectRatio: 1,
              height: 50,
              borderRadius: 25,
            }}
            placeholder={blurhash}
            transition={500}
            contentFit="cover"
          />

          <View>
            <Text
              style={{ color: "white", fontSize: hp(2.3), fontWeight: "bold" }}
            >
              Welcome
            </Text>
            <Text style={{ color: "white", fontSize: hp(2) }}>
              {user.given_name ?? user.email}
            </Text>
          </View>
        </View>

        <View
          style={{ height: "100%", justifyContent: "flex-end", paddingBottom: 20 }}
        >
          <Octicons name="bell-fill" size={hp(2.5)} color="white" />
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;
