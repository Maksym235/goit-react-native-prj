import { TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export function LogOutBtn() {
  return (
    <TouchableOpacity style={styles.btn}>
      <Feather name="log-out" size={24} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginRight: 20,
  },
});
