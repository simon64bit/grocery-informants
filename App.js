import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Search_bar from './Search_bar.js';
import Cart from './Cart.js';
import Footer from './Footer.js';
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
        <Stack.Navigator initialRouteName="Search">
          <Stack.Screen name="Search" component={Search_bar}/>
          <Stack.Screen name="Cart" component={Cart}/>
        </Stack.Navigator>
      <StatusBar style="auto" />
      <Footer style={styles.footer} cart={cart} set_cart={set_cart}/>
      </NavigationContainer>
    </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
