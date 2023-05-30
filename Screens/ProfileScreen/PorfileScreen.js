import { LogOutBtn } from "../../components/LogOutBtn";
import { authSingOutUser } from "../../redux/auth/authOperation";
import { PostItem } from "../../components/PostItem";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import app from "../../firebase/config";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import {
  collection,
  query,
  where,
  getFirestore,
  getDocs,
} from "firebase/firestore";

const db = getFirestore(app);

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  const { userId, name } = useSelector((state) => state.auth);

  const getUserPosts = async () => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const userPost = [];
    querySnapshot.forEach((doc) => {
      userPost.push({ ...doc.data(), id: doc.id });
    });
    setUserPosts(userPost);
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserPosts();
    }, [])
  );

  const signOut = () => {
    dispatch(authSingOutUser());
  };
  return (
    <View style={styles.conteiner}>
      <ImageBackground
        source={require("../../assets/PhotoBG.jpg")}
        style={styles.img}
      >
        <View style={styles.profile}>
          <View style={styles.btn}>
            <LogOutBtn signOut={signOut} />
          </View>
          <View style={styles.image}></View>
          <Text style={styles.title}>{name}</Text>
          <FlatList
            data={userPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PostItem item={item} />}
          />
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
