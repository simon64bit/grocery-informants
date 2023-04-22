import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Search_bar from './Search_bar.js';
import Cart from './Cart.js';
import Footer from './Footer.js';
import Header from './Header.js';
import Profile from './Profile.js';
import Signup from './Signup.js';
import React, {useState} from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
//import firebase from './realtime';
import { Provider } from 'react-redux';
import { Store } from './Store.js';

export default function App() {

  const Stack = createNativeStackNavigator();
  const [cart, set_cart] = useState([]);

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Header />
        <Stack.Navigator initialRouteName="Search">
          <Stack.Screen name="Search" component={Search_bar}/>
          <Stack.Screen name="Cart" component={Cart}/>
          <Stack.Screen name="Profile" component={Profile}/>
          <Stack.Screen name="Signup" component={Signup}/>
        </Stack.Navigator>
      <StatusBar style="auto" />
      <Footer cart={cart} set_cart={set_cart}/>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
    footer: {
      backgroundColor: "lightskyblue",
      padding: 20
    }
  });