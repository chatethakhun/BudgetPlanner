import { View, Alert, ActivityIndicator } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import supabase from "../../configs/supabase";
import MODEL_NAME from "../../constant/model";
import { COLORS } from "../../constant/theme";
import CategoryInfo from "../../components/categories/categoryInfo";

const CategoryDetail = () => {
  const { categoryId } = useLocalSearchParams();
  const [category, setCategory] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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

  if(isLoading) {
    return <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
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
    </View>
  );
};

export default CategoryDetail;
