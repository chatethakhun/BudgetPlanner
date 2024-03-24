import { View, Text, Alert } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import supabase from "../../../configs/supabase";
import MODEL_NAME from "../../../constant/model";
import { useAuth } from "../../../contexts/AuthContext";
import HomeHeader from "../../../components/HomeHeader";
import { StatusBar } from "expo-status-bar";

const HomePage = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);

  const getCategories = useCallback(async () => {
    try {
      let { data: categories, error } = await supabase
        .from(MODEL_NAME.CATEGORY)
        .select("*, CategoryItems(*)")
        .eq("created_by", user.email);

      if (error) {
        throw error;
      }


      setCategories(categories);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }, [user.email]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <HomeHeader categories={[1,2,43,4,4,4,4,4,4,4,4,4]} />

    </View>
  );
};

export default HomePage;
