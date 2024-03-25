import { View, Text } from "react-native";
import React from "react";
import Dialog from "react-native-dialog";

const DeleteDialog = ({
  visible = false,
  title,
  description,
  onConfirm = () => {},
  onCancel = () => {},
}) => {
  return (
    <View>
      <Dialog.Container visible={visible}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>
        <Dialog.Button label="Cancel" onPress={onCancel} />
        <Dialog.Button label="Delete" onPress={onConfirm} />
      </Dialog.Container>
    </View>
  );
};

export default DeleteDialog;
