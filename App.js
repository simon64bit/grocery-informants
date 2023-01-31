import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Search_bar from './Search_bar.js';
import {useState} from "react";
import React from 'react';
import firebase from './realtime';


export default function App() {

  const [token, set_token] = useState(0);
  const KrogerReq = async () => {
    await fetch("https://api.kroger.com/v1/connect/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic Z2F0ZWNoLTkzMTNhMmUyODVlYTE2ZjZhNTU1OTIwYjcyOTZlNDhhMTQ3NjI4NTUwNzkyNDY5NDEzMDp4ajByUGtRcWxucFgyclNrVHBqZVd2bVd0S25WbVBrYWVFY2Z5ckFS" ,
      },
      body: "grant_type=client_credentials&scope=product.compact"
      
    })
    .then(res => res.json())
    .then(json => set_token(json))
  };
  
  //KrogerReq("gatech-9313a2e285ea16f6a555920b7296e48a1476285507924694130","xj0rPkQqlnpX2rSkTpjeWvmWtKnVmPkaeEcfyrAR","product.compact");
  React.useEffect(() => {
    const getData = async () => {
      await KrogerReq();
      firebase();
    };
    getData();
  }, []);

    return (
        <Search_bar 
          token={token["access_token"]}
        />
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
