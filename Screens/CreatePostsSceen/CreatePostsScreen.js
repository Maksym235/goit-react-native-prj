import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import db from "../../firebase/config";
import app from "../../firebase/config";
import { selectUserName, selectUserId } from "../../redux/selectors";
import { useSelector } from "react-redux";

const storage = getStorage(db);
const getPost = getFirestore(app);

const CreatePostsScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState(null);
  const [locationTitle, setLocationTitle] = useState("");
  // const [imageUri, setImageUri] = useState(null);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [snap, setSnap] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const name = useSelector(selectUserName);
  const userId = useSelector(selectUserId);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // let location = await Location.getCurrentPositionAsync({});
      // setLocation(location);
    })();
  }, []);

  const handleChoosePhoto = async () => {
    const photo = await snap.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    setLocation(location);
    setPhoto(photo.uri);
  };

  const handleCreatePost = () => {
    uploadPostToServer();
    navigation.navigate("DefutlScreen");
    //  {
    //   title,
    //   location,
    //   photo,
    //   locationTitle,
    // }
  };

  const uploadPostToServer = async () => {
    try {
      const photo = await uploadPhotoToServer();
      await addDoc(collection(getPost, "posts"), {
        photo,
        title,
        location,
        locationTitle,
        name,
        userId,
      });
    } catch (error) {
      console.log(error.massage);
    }
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);

    const file = await response.blob();

    const uniquePostId = Date.now().toString();

    const storageRef = ref(storage, `postImage/${uniquePostId}`);
    await uploadBytes(storageRef, file);
    const getStorageRef = await getDownloadURL(storageRef);
    return getStorageRef;
  };

  const KeyboardHide = () => {
    setIsOnFocus(false);
    Keyboard.dismiss();
  };
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={KeyboardHide}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.photoContainer}>
            <Camera style={styles.camera} ref={setSnap}>
              {photo && (
                <View style={styles.takePhoto}>
                  <Image
                    source={{ uri: photo }}
                    style={{ height: 150, width: 200 }}
                  />
                </View>
              )}
              <TouchableOpacity style={styles.snap} onPress={handleChoosePhoto}>
                <Ionicons name="md-camera" size={40} color="#fff" />
              </TouchableOpacity>
            </Camera>
          </View>

          <View>
            <TextInput
              style={styles.titleInput}
              value={title}
              onChangeText={setTitle}
              placeholder="Назва"
            />

            <TextInput
              style={styles.titleInput}
              value={locationTitle}
              onChangeText={setLocationTitle}
              placeholder="Назва місця"
            />
          </View>

          {!isOnFocus && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                ...styles.createButton,
                backgroundColor: title && locationTitle ? "#FF6C00" : "#F6F6F6",
              }}
              onPress={handleCreatePost}
            >
              <Text style={styles.createButtonText}>Опублікувати</Text>
            </TouchableOpacity>
          )}
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "QR",
  },
  photoContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "100%",
    height: 230,
    justifyContent: "center",

    marginBottom: 20,
  },
  camera: {
    height: 230,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  snap: {
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 50,
    marginBottom: 20,
    padding: 5,
  },
  takePhoto: {
    position: "absolute",
    top: 5,
    left: 70,
    borderColor: "#fff",
    borderWidth: 1,
  },
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  choosePhoto: {
    fontSize: 18,
    color: "#666",
    fontFamily: "QR",
  },
  titleInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    marginBottom: 20,
    fontFamily: "QR",
  },
  createButton: {
    padding: 16,
    borderRadius: 100,
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "QR",
  },
});

export default CreatePostsScreen;
