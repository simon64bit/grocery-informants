import React, { useState } from 'react';
import { Text,View, TextInput, StyleSheet, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { getItems, addItem } from './Actions.js';

export default function Search_bar(){
    
    const [text,set_text] = useState('');
    const [location,set_location] = useState([]);
    const [data, set_data] = useState([]);
    //const [results, set_results] = useState([]);
    const items = useSelector(state => state.Reducer.items);
    const dispatch = useDispatch();

    async function handle_submit(event){
        const text = event.nativeEvent.text;
        //console.log(`Submitted text: ${text}`);
          await fetch("https://api.kroger.com/v1/connect/oauth2/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": "Basic Z2F0ZWNoLTkzMTNhMmUyODVlYTE2ZjZhNTU1OTIwYjcyOTZlNDhhMTQ3NjI4NTUwNzkyNDY5NDEzMDp4ajByUGtRcWxucFgyclNrVHBqZVd2bVd0S25WbVBrYWVFY2Z5ckFS" ,
            },
            body: "grant_type=client_credentials&scope=product.compact"
            
          })
          .then(res => res.json())
          .then((token) => {
        fetch(`https://api.kroger.com/v1/products?filter.term=${text}&filter.locationId=01100695`, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + token.access_token,
            }
        })
        .then(res => res.json())
        .then(json => {
            set_data(json["data"]);
            console.log(json["data"])
        })})
    };
        
    function addToCart(item) {
        let price = "N/A"
        if (Object.keys(item.items[0]).includes('price')) {
            price = item.items[0].price.regular;
        }
        dispatch(addItem({"description": item.description, "price": price}))
    }


    async function get_location(event){
        const text = event.nativeEvent.text;

        await fetch("https://api.kroger.com/v1/connect/oauth2/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic Z2F0ZWNoLTkzMTNhMmUyODVlYTE2ZjZhNTU1OTIwYjcyOTZlNDhhMTQ3NjI4NTUwNzkyNDY5NDEzMDp4ajByUGtRcWxucFgyclNrVHBqZVd2bVd0S25WbVBrYWVFY2Z5ckFS" ,
            },
            body: "grant_type=client_credentials&scope=product.compact"
            
            })
            .then(res => res.json())
            .then((token) => {
            fetch(`https://api.kroger.com/v1/locations?filter.zipCode.near=${text}`, 
            {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token.access_token,
                }
            })
        .then(res => res.json())
        .then(json => {
            console.log(json["data"]);
        })})
    }
        
        /*if (data !== null){
            for (let i = 0; i<data["data"].length;i++){
                //results.push(data["data"][0]['items'][0]['price']["regular"]);
                //results[0] = (data["data"][0]['items'][0]['price']["regular"]);
                //set_results(data["data"][0]['items'][0]['price']["regular"]);
                //set_results(data["data"][0]['items'])
                console.log(data)
                set_results(data["data"])
                break;
            }
        }*/

    return (
        <View>
            <TextInput
                style={styles.search}
                // style={{ paddingTop: 600,paddingLeft:20 }}
                placeholder="Search"
                onChangeText={newText => set_text(newText)}
                defaultValue={text}
                onSubmitEditing={(event) => handle_submit(event)}
            />
            <TextInput
                style={styles.search}
                // style={{ paddingTop: 600,paddingLeft:20 }}
                placeholder="Zip Code: 30332"
                onChangeText={newText => set_location(newText)}
                defaultValue={location}
                onSubmitEditing={(event) => get_location(event)}
            />
            <Text style={{padding: 10, fontSize: 25}}>
                {
                data.map(item => {
                    return <View><Text>{"\n" + item.description + ": " + (Object.keys(item.items[0]).includes('price') ? item.items[0].price.regular : "N/A")}</Text>
                    <Button onPress = {() => addToCart(item)} title = "Add" /></View>
                })
                }
                
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    search: {
      color: "red",
      fontSize: 20,
      fontWeight: '500',
      marginTop: 10,
      paddingTop: 60,
      paddingLeft: 20
    }
  });
