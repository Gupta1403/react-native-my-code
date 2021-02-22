import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// To avoid the view touching the status bar of mobile
import Constants from "expo-constants";

import Home from "./screens/Home";
import CreateEmployee from "./screens/CreateEmployee";
import Profile from "./screens/Profile";

//Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function App() {

  let myOptions = {headerTintColor: "white", headerStyle :{ backgroundColor : "#1976d2"} };

  return (
    <View style={styles.container}>
      {/* <Text>Hello World</Text> */}{/* <Home/> */}{/* <CreateEmployee /> */}{/* <Profile /> */}
      {/* <Stack.Navigator headerMode='none'> */}{/* HEADERMODE=None to remove the header */}
      <Stack.Navigator >
        <Stack.Screen name='Home' component={Home} options={{title : "My Sweet Home", ...myOptions}}/>
        <Stack.Screen name='Create' component={CreateEmployee} options={{title : "Add Employee", ...myOptions}}/>
        <Stack.Screen name='Profile' component={Profile} options={myOptions}/>{/* If title is not provided in options, then name is taken as header title */}
      </Stack.Navigator>
    </View>
  );
}

export default () =>{
  return (
    // NavigationContainer is just as BrowserRouter
    <NavigationContainer>  
      <App />
    </NavigationContainer>
  ) 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed',
    // marginTop : Constants.statusBarHeight, // To avoid the view touching the status bar of mobile
    // alignItems: 'center', // Align  Horizontally by default
    // justifyContent: 'center', //Aligns vertically by deafult
    // flexDirection : 'row' // To reverse the effect of alignItems and justifyContent, defaultvalue is coloumn
  },
});
