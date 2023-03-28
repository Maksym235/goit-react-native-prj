import React, { useState } from "react";
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
} from "react-native";

const CreatePostsScreen = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [isOnFocus, setIsOnFocus] = useState(false);

  const handleChoosePhoto = () => {
    // Діалогове вікно вибору фото з галереї або камери
  };

  const handleCreatePost = () => {
    // Функція для створення нової публікації з даними зі стану компонента
  };

  const KeyboardHide = () => {
    setIsOnFocus(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={KeyboardHide}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.photoContainer}
          onPress={handleChoosePhoto}
        >
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.photo} />
          ) : (
            <Text style={styles.choosePhoto}>Вибрати фото</Text>
          )}
        </TouchableOpacity>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View>
            <TextInput
              style={styles.titleInput}
              value={title}
              onChangeText={setTitle}
              placeholder="Назва"
            />

            <TextInput
              style={styles.titleInput}
              value={location}
              onChangeText={setLocation}
              placeholder="місце"
            />
          </View>
        </KeyboardAvoidingView>
        {!isOnFocus && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              ...styles.createButton,
              backgroundColor: title && location ? "#FF6C00" : "#F6F6F6",
            }}
            onPress={handleCreatePost}
          >
            <Text style={styles.createButtonText}>Опублікувати</Text>
          </TouchableOpacity>
        )}
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
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
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
