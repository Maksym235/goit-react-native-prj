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
import { useState, useEffect } from "react";
// import { authSingIn } from "../../redux/auth/authOperation";
import { authSingInUser } from "../../redux/auth/authOperation";
import { useDispatch } from "react-redux";
const initialState = {
  email: "",
  password: "",
};

import { Feather } from "@expo/vector-icons";

export default function Login({ navigation }) {
  const [user, setUser] = useState(initialState);
  const [isHidePasw, setIsHidePasw] = useState(true);
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);

  const dispatch = useDispatch();

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
    setUser(initialState);
    dispatch(authSingInUser(user));
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
                paddingBottom: isOnFocus ? 32 : 144,
                width: dimensions,
              }}
            >
              <Text style={styles.title}>Увійти</Text>
              <View>
                <TextInput
                  value={user.email}
                  style={styles.input}
                  placeholder="Електрона адреса"
                  onFocus={() => setIsOnFocus(true)}
                  onChangeText={(value) =>
                    setUser((prev) => ({ ...prev, email: value }))
                  }
                />
              </View>
              <View>
                <TextInput
                  value={user.password}
                  style={styles.input}
                  placeholder="Пароль"
                  secureTextEntry={isHidePasw}
                  onFocus={() => setIsOnFocus(true)}
                  onChangeText={(value) =>
                    setUser((prev) => ({ ...prev, password: value }))
                  }
                />
                <TouchableOpacity onPress={ToggleSecure} style={styles.showPsw}>
                  {isHidePasw ? (
                    <Feather name="eye" size={24} color="#c0c0c0" />
                  ) : (
                    <Feather name="eye-off" size={24} color="#c0c0c0" />
                  )}
                </TouchableOpacity>
              </View>
              {!isOnFocus && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onSubmit}
                  style={styles.btn}
                >
                  <Text style={styles.btnTitle}>Ввійти</Text>
                </TouchableOpacity>
              )}
              {!isOnFocus && (
                <Text
                  style={styles.linkToReg}
                  onPress={() => navigation.navigate("Registration")}
                >
                  Немає акаунта?
                  <Text style={styles.link}> Зареєструватися</Text>
                </Text>
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
    // borderColor: "red",
    // borderWidth: 1,
    position: "relative",
    backgroundColor: "#fff",
    marginTop: "auto",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  title: {
    color: "#000",
    fontSize: 30,
    marginBottom: 32,
    marginTop: 32,
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
    top: 15,
    left: 290,
    position: "absolute",
  },
  btn: {
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
  linkToReg: {
    fontFamily: "QR",
    color: "#1B4371",
  },
  link: {
    color: "#0E7DFD",
  },
});
