import React from "react";
import { moduleName } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

// --------------SCREENS---------------
import DefaultScreenPost from "../nestedScreens/DefaultScreens";
import CommentsScreenPost from "../nestedScreens/CommentsScreen";
import MapScreenPost from "../nestedScreens/MapScreens";

const NestedScreens = createStackNavigator();

export default function PostsScreen() {
  return (
    <NestedScreens.Navigator>
      <NestedScreens.Screen
        name="DefutlScreen"
        component={DefaultScreenPost}
        options={{ headerShown: false }}
      />
      <NestedScreens.Screen
        name="CommentsScreen"
        component={CommentsScreenPost}
      />
      <NestedScreens.Screen name="MapScreen" component={MapScreenPost} />
    </NestedScreens.Navigator>
  );
}
