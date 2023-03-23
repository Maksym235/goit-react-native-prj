import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function Registration({ navigation }) {
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);

  const [isOnFocus, setIsOnFocus] = useState(false);
  const [isHidePasw, setIsHidePasw] = useState(true);
  const [newUser, setNewUser] = useState(initialState);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;

      setDimensions(width);
    };

    Dimensions.addEventListener("change", onChange);
  }, []);

  const KeyboardHide = () => {
    setIsOnFocus(false);
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    console.log(newUser);
    setNewUser(initialState);
  };
  const ToggleSecure = () => {
    setIsHidePasw((prev) => !prev);
  };

  return (
    <TouchableWithoutFeedback onPress={KeyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/PhotoBG.jpg")}
          style={styles.img}
        >
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isOnFocus ? 32 : 100,
                width: dimensions,
              }}
            >
              <View style={styles.image}></View>
              <Text style={{ ...styles.title }}>Зареєструватися</Text>
              <TextInput
                value={newUser.login}
                style={styles.input}
                placeholder="Логін"
                onFocus={() => setIsOnFocus(true)}
                onChangeText={(value) =>
                  setNewUser((prev) => ({ ...prev, login: value }))
                }
              />
              <TextInput
                value={newUser.email}
                style={styles.input}
                placeholder="Електрона адреса"
                onFocus={() => setIsOnFocus(true)}
                onChangeText={(value) =>
                  setNewUser((prev) => ({ ...prev, email: value }))
                }
              />
              <View>
                <TextInput
                  value={newUser.password}
                  secureTextEntry={isHidePasw}
                  style={styles.input}
                  placeholder="Пароль"
                  onFocus={() => setIsOnFocus(true)}
                  onChangeText={(value) =>
                    setNewUser((prev) => ({ ...prev, password: value }))
                  }
                />
                <TouchableOpacity onPress={ToggleSecure} style={styles.showPsw}>
                  <Text>Показати</Text>
                </TouchableOpacity>
              </View>

              {!isOnFocus && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.button}
                  onPress={onSubmit}
                >
                  <Text style={styles.btnTitle}>Зареєструватися</Text>
                </TouchableOpacity>
              )}
              {!isOnFocus && (
                <TouchableOpacity activeOpacity={0.8} onPress>
                  <Text>Вже є акаунт? Ввійти</Text>
                </TouchableOpacity>
              )}
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  img: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
  },
  form: {
    position: "relative",
    // borderColor: "red",
    // borderWidth: 1,
    backgroundColor: "#fff",
    marginTop: "auto",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
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
  title: {
    color: "#000",
    fontSize: 30,
    marginBottom: 32,
    marginTop: 92,
    fontFamily: "QR",
  },
  input: {
    position: "relative",
    width: 343,
    height: 50,
    paddingLeft: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    fontFamily: "QR",
  },
  showPsw: {
    top: 17,
    left: 260,
    position: "absolute",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 343,
    height: 50,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    marginTop: 43,
    marginBottom: 16,
  },
  btnTitle: {
    color: "#fff",
    fontFamily: "QR",
  },
});
