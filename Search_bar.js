import React, { useState } from 'react';
import { Text,View, TextInput, StyleSheet} from 'react-native';

export default function Search_bar(token){
    const [text,set_text] = useState('');
    const [data, set_data] = useState(null);
    const [results,set_results] = useState(null);

    function handle_submit(event,token){
        const text = event.nativeEvent.text;
        //console.log(`Submitted text: ${text}`);
        console.log(token["token"] );

        
        
        fetch(`https://api.kroger.com/v1/products?filter.term=${text}&filter.locationId=02400784`, 
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + token["token"],
            }
        })
        .then(res => res.json())
        .then(json => set_data(json));
        
        
        if (data !== null){
            for (let i = 0; i<data["data"].length;i++){
                //results.push(data["data"][0]['items'][0]['price']["regular"]);
                //results[0] = (data["data"][0]['items'][0]['price']["regular"]);
                set_results(data["data"][0]['items'][0]['price']["regular"]);
                break;
            }

        }

    }
    return (
        <View>
            <TextInput
                style={styles.search}
                // style={{ paddingTop: 600,paddingLeft:20 }}
                placeholder="Search"
                onChangeText={newText => set_text(newText)}
                defaultValue={text}
                onSubmitEditing={(event) => handle_submit(event, token)}
            />
            <Text style={{padding: 10, fontSize: 42}}>
                The price is {results}
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
      paddingTop: 600,
      paddingLeft: 20
    }
  });
