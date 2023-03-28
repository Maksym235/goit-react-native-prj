import { View, Text, ImageBackground, Image, StyleSheet } from "react-native";
import { LogOutBtn } from "../../components/logOutBtn";

export default function ProfileScreen() {
  return (
    <View style={styles.conteiner}>
      <ImageBackground
        source={require("../../assets/PhotoBG.jpg")}
        style={styles.img}
      >
        <View style={styles.profile}>
          <View style={styles.btn}>
            <LogOutBtn />
          </View>
          <View style={styles.image}></View>
          <Text style={styles.title}>Name</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
  },
  img: {
    flex: 1,
    resizeMode: "cover",
  },
  profile: {
    flex: 1,
    position: "relative",
    // borderColor: "red",
    // borderWidth: 1,
    marginTop: 150,
    backgroundColor: "#fff",
    alignItems: "center",
    gap: 16,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  title: {
    color: "#000",
    fontSize: 30,
    marginBottom: 32,
    marginTop: 50,
    fontFamily: "QR",
  },
  image: {
    top: -50,
    left: 125,
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  btn: {
    marginTop: 20,
    marginLeft: "auto",
  },
});
