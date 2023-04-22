import React, { useState } from 'react';
import { Text,View, TextInput, StyleSheet, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import SearchResult from './SearchResult.js';
import DropDownPicker from 'react-native-dropdown-picker';
import {server} from "./Constants.js";

export default function Search_bar(){
    const [text,set_text] = useState('');
    //const [location,set_location] = useState([]);
    const [data, set_data] = useState([]);
    const [data2, set_data2] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("All");
    const [items, setItems] = useState([
        {label: 'All', value: 'All'},
        {label: 'Kroger', value: 'Kroger'},
        {label: 'Target', value: 'Target'}
    ]);
    const user = useSelector(state => state.Reducer.user);

    async function handle_submit(event){
        const text = event.nativeEvent.text;
          await fetch("https://api.kroger.com/v1/connect/oauth2/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": "Basic Z2F0ZWNoLTkzMTNhMmUyODVlYTE2ZjZhNTU1OTIwYjcyOTZlNDhhMTQ3NjI4NTUwNzkyNDY5NDEzMDpJazNmZVdrNTl1T1NTdVozREUzcW1jTzJWbFlTRmRDQVNhSUpTY1Ja" ,
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
            if (json["data"] != null) {
                set_data(json["data"]);
            }
        })})

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'f9da3bcb3fmsh38a9cc95e01ad1fp1a538fjsn337e8b938b00',
                'X-RapidAPI-Host': 'target-com-store-product-reviews-locations-data.p.rapidapi.com'
            }
        };
        
        fetch(`https://target-com-store-product-reviews-locations-data.p.rapidapi.com/product/search?store_id=2137&keyword=${text}&offset=0&limit=24&sponsored=1&rating=0`, options)
        .then(res => res.json())
        .then(json => {
            if (json["data"] != null) {
                set_data2(json["data"]);
            }
        })

        if (user != null) {
            fetch(server + "/addsearch?user=" + user + "&search=" + text);
        }
    };


    // async function get_location(event){
    //     const text = event.nativeEvent.text;

    //     await fetch("https://api.kroger.com/v1/connect/oauth2/token", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/x-www-form-urlencoded",
    //             "Authorization": "Basic Z2F0ZWNoLTkzMTNhMmUyODVlYTE2ZjZhNTU1OTIwYjcyOTZlNDhhMTQ3NjI4NTUwNzkyNDY5NDEzMDp4ajByUGtRcWxucFgyclNrVHBqZVd2bVd0S25WbVBrYWVFY2Z5ckFS" ,
    //         },
    //         body: "grant_type=client_credentials&scope=product.compact"
            
    //         })
    //         .then(res => res.json())
    //         .then((token) => {
    //         fetch(`https://api.kroger.com/v1/locations?filter.zipCode.near=${text}`, 
    //         {
    //             method: "GET",
    //             headers: {
    //                 "Accept": "application/json",
    //                 "Authorization": "Bearer " + token.access_token,
    //             }
    //         })
    //     .then(res => res.json())
    //     .then(json => {
    //         console.log(json["data"]);
    //     })})
    // }

    return (
        <View>
            <TextInput
                style={styles.search}
                placeholder="Search"
                onChangeText={newText => {set_text(newText)}}
                defaultValue={text}
                onSubmitEditing={(event) => handle_submit(event)}
            />
            {/* <TextInput
                style={styles.search}
                placeholder="Zip Code: 30332"
                onChangeText={newText => set_location(newText)}
                defaultValue={location}
                onSubmitEditing={(event) => get_location(event)}
            /> */}
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            />
            <ScrollView style={styles.scrollview}>
            <Text style={{margin: 10}}>
                {(() => {
                    switch(value) {
                        case "Kroger": 
                            return data.map(item => {
                                return (<SearchResult key={item.tcin} item={item}/>);
                            });
                        case "Target": 
                            return data2.map(item => {
                                return (<SearchResult key={item.tcin} item={item}/>);
                            })
                        case "All": 
                            return data.concat(data2).map(item => {
                                return (<SearchResult key={item.tcin} item={item}/>);
                            })
                            
                        default: 
                            return data.map(item => {
                                return (<SearchResult key={item.tcin} item={item}/>);
                            });
                    }
                })()}
            </Text>
           </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    search: {
      color: "red",
      fontSize: 20,
      fontWeight: '500',
      marginTop: 20,
      marginBottom: 10,
      paddingTop: 0,
      paddingLeft: 20
    },

    scrollview: {
       marginBottom: 140,
       margin: 10
    }
  });
