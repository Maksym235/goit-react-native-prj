import { View, Text, Image, StyleSheet } from "react-native";

export function PostItem({ item }) {
  return (
    <View style={styles.profile}>
      <Image source={{ uri: item.photo }} style={styles.image} />
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        <Text style={styles.name}>{item.title}</Text>
        <Text style={styles.location}>{item.locationTitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 20,
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
  image: {
    width: 300,
    height: 150,
  },
  name: {
    fontSize: 24,
    fontFamily: "QR",
  },
  location: {
    fontSize: 24,
    fontFamily: "QR",
  },
  asside: {
    fontSize: 24,
    fontFamily: "QR",
    color: "#a98df0",
  },
});
