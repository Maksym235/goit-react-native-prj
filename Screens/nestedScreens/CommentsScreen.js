import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  collection,
  addDoc,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import app from "../../firebase/config";
import { AntDesign } from "@expo/vector-icons";
import { selectUserName } from "../../redux/selectors";

const db = getFirestore(app);

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [state, setState] = useState(null);
  const [commentsCount, setCommentsCount] = useState(0);

  const name = useSelector(selectUserName);

  const { postId } = route.params;

  useEffect(() => {
    getAllPost();
  }, [state]);

  const createpost = async () => {
    if (!comment.trim()) {
      // alert("Comment cannot be empty");
      return;
    }
    try {
      const docRef = await doc(db, "posts", postId);

      await addDoc(collection(docRef, "comments"), {
        comment,
        name,
      });
      setComment("");
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllPost = async () => {
    const docRef = await doc(db, "posts", postId);
    await getDocs(collection(docRef, "comments")).then((snapshot) => {
      setState(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.container}>
        {state && (
          <FlatList
            data={state}
            renderItem={({ item }) => (
              <View style={styles.commentWrapper}>
                {item.data.name && (
                  <Text style={styles.name}>{item.data.name}:</Text>
                )}
                <Text style={styles.comment}>{item.data.comment}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </SafeAreaView>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="коментувати..."
          style={styles.input}
          onChangeText={setComment}
          value={comment}
        />
        <TouchableOpacity style={styles.sendBth} onPress={createpost}>
          <AntDesign name="arrowup" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 5,
    columnGap: 30,
  },
  inputContainer: {},
  input: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    paddingLeft: 15,
    position: "relative",
    height: 50,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#e8e8e8",
    backgroundColor: "#F6F6F6",
  },
  sendBth: {
    position: "absolute",
    right: 18,
    top: 10,
    width: 34,
    height: 34,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
  },
  commentWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    width: "80%",
    borderRadius: 20,
    flex: 1,
    marginVertical: 10,
  },
  comment: {
    padding: 10,
    color: "#000",
    fontSize: 24,
    fontFamily: "QR",
  },
  name: {
    fontSize: 24,
    fontFamily: "QR",
    color: "#a98df0",
    marginBottom: 10,
    fontWeight: "bold",
    borderBottomWidth: 1,
  },
});

export default CommentsScreen;
