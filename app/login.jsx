import { View, Text, Pressable, Alert, ActivityIndicator } from "react-native";
import React, { useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { blurhash } from "../constant/common";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { COLORS } from "../constant/theme";
import { useAuth } from "../contexts/AuthContext";
import TextField from "../components/form/textField";

const LoginPage = () => {
  const { login, executing } = useAuth();
  const email = useRef("");
  const password = useRef("");

  const handleLogin = async () => {
    if (!email.current || !password.current)
      return Alert.alert("Please fill all fields");
    try {
      await login({ email: email.current, password: password.current });
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

        <View style={{ gap: 15 }}>
          <TextField
            placeholder={"Email"}
            onChangeText={(text) => (email.current = text)}
          />
          <TextField
            secureTextEntry
            placeholder={"Password"}
            onChangeText={(text) => (password.current = text)}
          />
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
            {!executing ? (
              <Text
                style={{
                  color: COLORS.darkGrey,
                  textAlign: "right",
                  fontSize: hp(2),
                  fontWeight: "bold",
                }}
              >
                {"Sign In".toUpperCase()}
              </Text>
            ) : (
              <ActivityIndicator size="small" color={COLORS.primary} />
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;
