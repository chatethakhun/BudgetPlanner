import { View, Text } from "react-native";
import React from "react";
import CustomButton from "../../../components/CustomButton";
import { useAuth } from "../../../contexts/AuthContext";
const ProfilePage = () => {
  const { logout } = useAuth();
  return (
    <View>
      <Text>ProfilePage</Text>
      <CustomButton
        label="Logout"
        onPress={() => {
          logout();
        }}
      />
    </View>
  );
};

export default ProfilePage;
