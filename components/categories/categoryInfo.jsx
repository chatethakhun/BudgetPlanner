import { View, Text, Pressable, Alert, ActivityIndicator } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../../constant/theme";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import * as Progress from "react-native-progress";
import DeleteDialog from "../DeleteDialog";
import supabase from "../../configs/supabase";
import MODEL_NAME from "../../constant/model";
import { useRouter } from "expo-router";
import { useToast } from "react-native-toast-notifications";

const CategoryInfo = ({ category }) => {
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const sumCost = category.CategoryItems?.reduce(
    (acc, item) => acc + item.cost,
    0
  );

  const progressPercentage = sumCost / category.assigned_budget ?? 0;

  const router = useRouter();
  const toast = useToast();

  const confirmDelete = async () => {
    setVisible(false);
    // Delete category

    try {
      setLoading(true);
      const { error } = await supabase
        .from(MODEL_NAME.CATEGORY_ITEMS)
        .delete()
        .eq("category_id", category.id);

      const { data, status } = await supabase
        .from(MODEL_NAME.CATEGORY)
        .delete()
        .eq("id", category.id);

      if (status === 204) {
        // Success
        router.replace({
          pathname: "(tabs)",
        });

        toast.show("Category deleted", {
          type: "success",
        });
      }else {
        throw error;
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

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

        {!loading ? (
          <Pressable
            style={{ marginLeft: "auto", justifyContent: "center" }}
            onPress={() => setVisible(true)}
          >
            <FontAwesome name="trash" size={hp(3)} color={COLORS.red} />
          </Pressable>
        ) : (
          <View style={{ marginLeft: "auto", justifyContent: "center" }}>
            <ActivityIndicator size="small" color={COLORS.primary} />
          </View>
        )}
      </View>

      <View style={{ marginTop: 10 }}>
        <View
          style={{
            marginBottom: 5,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
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

      <DeleteDialog
        visible={visible}
        title="Item delete"
        description="Do you want to delete this item? You cannot undo this action."
        onCancel={() => setVisible(false)}
        onConfirm={confirmDelete}
      />
    </View>
  );
};

export default CategoryInfo;
