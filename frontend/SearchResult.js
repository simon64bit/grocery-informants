import React from 'react';
import { Text,View, StyleSheet, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { addItem } from './Actions.js';
import {server} from './Constants.js';

export default function SearchResult(item){

    const dispatch = useDispatch();

    item = item["item"];
    const user = useSelector(state => state.Reducer.user);

    async function addItemToDatabase(description, price, store) {
        fetch(server + "/additem?user=" + user + "&description=" + description
            + "&price=" + price + "&store=" + store);
    }

    if (item.items){
        function addToCart(item) {
            let price = 0;
            if (Object.keys(item.items[0]).includes('price')) {
                price = item.items[0].price.regular;
                if (price == "N/A") {
                    price = 0;
                }
            }
            if (user != null) {
                addItemToDatabase(item.description, price, "Kroger");
            }
            dispatch(addItem({"description": item.description, "price": price, "store": "Kroger"}));
        }
    
        return (
            <View style = {styles.container}>
                <Text style = {styles.description}>{"\n" + item.description}</Text> 
                <Text style = {styles.price}>{(Object.keys(item.items[0]).includes('price') ? ("$" + item.items[0].price.regular) : "N/A")}</Text>
                <Text style = {styles.store}>{" Kroger"}</Text> 
                <Button style = {styles.button} onPress = {() => addToCart(item)} title = "+" />
            </View>
        )
    } else {
        function addToCart(item) {
            let price = "N/A";
            if (Object.keys(item).includes('price')) {
                price = parseFloat(item.price.formatted_current_price.split("$")[1]);
            }
            addItemToDatabase(item, "Target");
            dispatch(addItem({"description": item.item.product_description.title, "price": price, "store": "Target"}))
        }
    
        return (
            <View style = {styles.container}>
                <Text style = {styles.description}>{"\n" + item.item.product_description.title}</Text> 
                <Text style = {styles.price}>{(Object.keys(item).includes('price') ? item.price.formatted_current_price : "N/A")}</Text>
                <Text style = {styles.store}>{" Target"}</Text> 
                <Button style = {styles.button} onPress = {() => addToCart(item)} title = "+" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        'flexDirection': 'row',
        borderWidth: 2,
    },
    description: {
        width: '55%',
        fontSize: 12,
        backgroundColor: 'lightskyblue'
    },
    
    price: {
        width: '15%',
        marginLeft: '2%'
    },
    store: {
        width: '15%',
        fontSize: 12,
        backgroundColor: 'lightskyblue'
    },
    button: {
        width: '15%'
    }
  });