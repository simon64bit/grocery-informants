import React, { useState } from 'react';
import { Text,View, StyleSheet, Button, TextInput} from 'react-native';``
import { useNavigation } from '@react-navigation/native';
import {server} from './Constants.js';
import {useDispatch} from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { setUser } from './Actions.js';

export default function Signup() {
    const navigation = useNavigation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    // async function saveCart() {
    //     let response = await fetch(
    //         server + "/cart?user=" + username
    //       );
    //       let json = await response.json();
    //       print(json)
    //       if (json.length == 1) {
    //         setUser(username);
    //         saveCart();
    //         navigation.navigate("Tweets");
    //       }
    // }

    async function attemptSignup() {
        let response = await fetch(
          server + "/signup?user=" + username + "&password=" + password
        );
        let json = await response.json();
        if (json != undefined) {
          dispatch(setUser(username));
          navigation.navigate("Search");
        }
    }

    return (
      <View style={styles.container}>
        <TextInput placeholder="Username" onChangeText={setUsername}></TextInput>
        <TextInput placeholder="Password" onChangeText={setPassword}></TextInput>
        <Button onPress={() => attemptSignup()} title="Sign Up"/>
        <Button onPress={() => navigation.navigate("Profile")} title="Have an account? Log In"/>
        <StatusBar style="auto" />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });