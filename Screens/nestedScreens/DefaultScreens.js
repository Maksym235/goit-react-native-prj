import { useState, useEffect } from "react";
import { Button } from "react-native";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { selectUserName, selectUserEmail } from "../../redux/selectors";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import app from "../../firebase/config";

const db = getFirestore(app);

export default function DefaultScreenPost({ route, navigation }) {
  const [posts, setPosts] = useState([]);
  // const location = route.params.location
  const [location, serLocation] = useState(null);

  const getAllPost = async () => {
    const userPostsRef = collection(db, "posts");
    const unsubscribe = await onSnapshot(userPostsRef, (data) => {
      const userPosts = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(userPosts);
    });
    return () => unsubscribe();
  };

  useEffect(() => {
    getAllPost();
  }, []);

  // useEffect(() => {
  //   if (route.params) {
  //     setPosts((prev) => [...prev, route.params]);
  //     serLocation(route.params);
  //   }
  // }, [route.params]);
  return (
    <View style={styles.conteiner}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.profile}>
            <View style={{ flexDirection: "row" }}>
              <Image style={styles.profileImage} />
              <View style={styles.profileDescription}>
                <Text>{item.name}</Text>
              </View>
            </View>
            <Image source={{ uri: item.photo }} style={styles.image} />
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.location}>{item.locationTitle}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("MapScreen", { location: item.location })
                }
              >
                <Text style={styles.asside}>location</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("CommentsScreen", { postId: item.id })
                }
              >
                <Text style={styles.asside}>comments</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {/* <Button
        title="map"
        onPress={() => {
          navigation.navigate("MapScreen", location);
        }}
      />
      <Button
        title="comments"
        onPress={() => {
          navigation.navigate("CommentsScreen");
        }}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    marginTop: 32,
    marginHorizontal: 16,
    flex: 1,
    columnGap: 20,
  },
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
