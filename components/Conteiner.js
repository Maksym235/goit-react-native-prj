import { StyleSheet } from "react-native/types";
import { View } from "react-native/types";

export function Container() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
