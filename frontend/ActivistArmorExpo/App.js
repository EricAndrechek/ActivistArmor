import * as React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";

import FeedScreen from "./screens/FeedScreen";
import PostScreen from "./screens/PostScreen";
import AboutScreen from "./screens/drawerscreens/AboutScreen";
import Maps from "./screens/mapscreens/routes";

const BottomTab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <BottomTab.Navigator
      initialRouteName={"Feed"}
      tabBarOptions={{
        showLabel: false,
        style: styles.tabBar
      }}
    >
      <BottomTab.Screen name="Feed" component={FeedScreen} />
      <BottomTab.Screen name="Map" component={Maps} />
      <BottomTab.Screen name="Post" component={PostScreen} />
    </BottomTab.Navigator>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
              drawerIcon: (config) => (
                <Icon
                  size={23}
                  name={Platform.OS === "android" ? "md-list" : "ios-list"}
                ></Icon>
              )
            }}
          />
          <Drawer.Screen
            name="About"
            component={AboutScreen}
            options={{
              drawerIcon: (config) => (
                <Icon
                  size={23}
                  name={Platform.OS === "android" ? "md-list" : "ios-list"}
                ></Icon>
              )
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  tabBar: {
    backgroundColor: "#6dd5ed",
    height: 0
  }
});
