import { View, Text, Pressable } from "react-native";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Image } from "expo-image";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { blurhash } from "../constant/common";
import { COLORS } from "../constant/theme";
import { Octicons } from "@expo/vector-icons";
import CircularChart from "./CircularChart";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

const HomeHeader = () => {
  const { user } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: hp(18),
          backgroundColor: COLORS.primary,
          paddingHorizontal: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "end",
            justifyContent: "space-between",
            marginTop: hp(3),
            marginBottom: hp(2),
          }}
        >
          <View
            style={{
              flex: 1,
              height: "100%",
              paddingBottom: 10,
              flexDirection: "row",
              gap: 10,
              marginTop: hp(2),
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", gap: 15 }}>
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
                  style={{
                    color: "white",
                    fontSize: hp(2.3),
                    fontWeight: "bold",
                    fontFamily: "Outfit-Bold",
                  }}
                >
                  Welcome
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: hp(2),
                    fontFamily: "Outfit-Regular",
                  }}
                >
                  {user.given_name ?? user.email}
                </Text>
              </View>
            </View>

            <View
              style={{
                justifyContent: "center",
              }}
            >
              <Octicons name="bell-fill" size={hp(2.5)} color="white" />
            </View>
          </View>
        </View>

        <CircularChart />
      </View>
      <Link
        href="addNewCategory"
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
      >
        <View
          style={{
            height: hp(6),
            aspectRatio: 1,
            backgroundColor: COLORS.primary,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="plus-thick"
            size={hp(4)}
            color={"white"}
          />
        </View>
      </Link>
    </View>
  );
};

export default HomeHeader;
