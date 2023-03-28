import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function PostsScreen({ navigation }) {
  return (
    <View style={styles.conteiner}>
      <View style={styles.profile}>
        <Image style={styles.profileImage} />
        <View style={styles.profileDescription}>
          <Text>Natali Romanova</Text>
          <Text style={{ color: "#c0c0c0" }}>email@example.com</Text>
        </View>
      </View>
      <TouchableOpacity></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    marginTop: 32,
    marginHorizontal: 16,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  profileImage: {
    borderRadius: 16,
    width: 60,
    height: 60,
    backgroundColor: "#E8E8E8",
  },
  profileDescription: {
    flexDirection: "column",
    fontFamily: "QR",
  },
});
