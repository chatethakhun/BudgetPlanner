import { Button, View } from "react-native";
import React from "react";
import TextField from "../../components/form/textField";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { COLORS } from "../../constant/theme";
import CustomButton from "../../components/CustomButton";

const AddNewCategory = () => {
  return (
    <View style={{ flex: 1, padding: 20, gap: 20 }}>
      <TextField
        icon={<AntDesign name="tags" size={hp(2.5)} color={COLORS.grey} />}
        placeholder="Category Name"
      />
      <TextField
        keyboardType="numeric"
        icon={
          <FontAwesome5 name="dollar-sign" size={hp(2.5)} color={COLORS.grey} />
        }
        placeholder="Total Budget"
      />

      <CustomButton label={"Add Category"} />
    </View>
  );
};

export default AddNewCategory;
