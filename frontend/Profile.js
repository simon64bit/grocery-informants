import React, { useState } from 'react';
import { Text,View, StyleSheet, Button, TextInput} from 'react-native';``
import { useNavigation } from '@react-navigation/native';
import {server} from './Constants.js';
import {useDispatch, useSelector} from 'react-redux';
import { setUser } from './Actions.js';
import { StatusBar } from 'expo-status-bar';

export default function Profile(){
    const navigation = useNavigation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const user = useSelector(state => state.Reducer.user);
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

    async function attemptLogin() {
        let response = await fetch(
          server + "/login?user=" + username + "&password=" + password
        );
        let json = await response.json();
        if (json.length == 1) {
          dispatch(setUser(username));
          //saveCart();
          navigation.navigate("Search");
        }
      }

      async function logout() {
          dispatch(setUser(null));
          navigation.navigate("Search");
        }

    if (user != null) {
        return (
            <View style = {styles.container}>
                <Button onPress={() => logout()} title="Log Out"/>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <TextInput placeholder="Username" onChangeText={setUsername}></TextInput>
                <TextInput placeholder="Password" onChangeText={setPassword}></TextInput>
                <Button onPress={() => attemptLogin()} title="Log In"/>
                <Button onPress={() => navigation.navigate("Signup")} title="No account? Sign Up"/>
                <StatusBar style="auto" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });