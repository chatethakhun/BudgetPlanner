import { View, Text, Pressable } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { blurhash } from "../constant/common";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { COLORS } from "../constant/theme";
import { Controller, useForm } from "react-hook-form";
import TextField from "../components/form/textField";
import client from "../configs/kinde";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {}
  };

  return (
    <View style={{ flex: 1, borderWidth: 1 }}>
      <StatusBar style="dark" />
      <Image
        source={require("../assets/login.png")}
        style={{
          height: 400,
          width: "100%",
          marginTop: hp(20),
        }}
        placeholder={blurhash}
        contentPosition={"center"}
        contentFit="contain"
      />

      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.primary,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          marginTop: hp(-10),
          paddingTop: 30,
          alignItems: "center",
          paddingHorizontal: 20,
          gap: 30,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text
            style={{ fontSize: hp(2.7), color: "white", fontWeight: "bold" }}
          >
            Person Budget Planner
          </Text>
          <Text style={{ fontSize: hp(2), color: "white" }}>
            Manage your budget easily
          </Text>
        </View>

        <View style={{ flex: 1, width: "100%" }}>
          <Pressable
            style={{
              width: "100%",
              backgroundColor: "white",
              height: 50,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleLogin}
          >
            <Text
              style={{ color: "black", textAlign: "right", fontSize: hp(2), fontWeight: "bold"}}
            >
              {"Continue to Sign Up/Sign In.".toUpperCase()}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;
