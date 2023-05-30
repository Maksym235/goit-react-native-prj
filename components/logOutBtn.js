import { TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export function LogOutBtn({ signOut }) {
  return (
    <TouchableOpacity style={styles.btn} onPress={() => signOut()}>
      <Feather name="log-out" size={24} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginRight: 20,
  },
});
