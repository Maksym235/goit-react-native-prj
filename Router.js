import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator } from "react-native";

// --------REDUX---------------------
import { useDispatch, useSelector } from "react-redux";
import { authSingOutUser } from "./redux/auth/authOperation";
import { selectIsLogedIn } from "./redux/selectors";

// --------COMPONENTS---------------
import { LogOutBtn } from "./components/LogOutBtn";

// -------- SCREENS------------------
import Registration from "./Screens/RegistrationScreen/RegistrationScreen";
import Login from "./Screens/LoginScreen/LoginScreen";
import PostsScreen from "./Screens/PostsScreen/PostsScreen";
import ProfileScreen from "./Screens/ProfileScreen/PorfileScreen";
import CreatePostsScreen from "./Screens/CreatePostsSceen/CreatePostsScreen";

// ----------ICONS-------------------
import { Octicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const useRoute = (isAuth) => {
  const isLoagedIn = useSelector(selectIsLogedIn);
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSingOutUser());
  };
  if (!isAuth) {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
          onSumbit
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={Registration}
        />
      </Stack.Navigator>
    );
  }
  if (!isLoagedIn) {
    <ActivityIndicator />;
  }
  return (
    <Tab.Navigator initialRouteName="PostScreen">
      <Tab.Screen
        options={{
          headerRight: () => {
            return <LogOutBtn signOut={signOut} />;
          },
          headerTitle: "Публікації",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size, color }) => {
            return <Octicons name="three-bars" size={size} color={color} />;
          },
        }}
        name="PostsScreen"
        component={PostsScreen}
      />
      <Tab.Screen
        options={{
          headerTitle: "Створити допис",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <FontAwesome name="plus-square-o" size={size} color={color} />
            );
          },
        }}
        name="CreatePostsScreen"
        component={CreatePostsScreen}
      />
      <Tab.Screen
        options={{
          headerTitle: "Профіль",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size, color }) => {
            return <Ionicons name="person" size={24} color="black" />;
          },
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};
export default useRoute;
