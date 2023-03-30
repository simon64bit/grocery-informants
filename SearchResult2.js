import React from 'react';
import { Text,View, StyleSheet, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { addItem } from './Actions.js';

export default function SearchResult2(item){

    const dispatch = useDispatch();

    item = item["item"];
    function addToCart(item) {
        let price = "N/A"
        if (Object.keys(item).includes('price')) {
            price = parseFloat(item.price.formatted_current_price.split("$")[1]);
            console.log(price);
        }
        dispatch(addItem({"description": item.item.product_description.title, "price": price, "store": "Target"}))
    }

    return (
        <View style = {styles.container}>
            <Text style = {styles.description}>{"\n" + item.item.product_description.title}</Text> 
            <Text style = {styles.price}>{(Object.keys(item).includes('price') ? item.price.formatted_current_price : "N/A")}</Text>
            <Button style = {styles.button} onPress = {() => addToCart(item)} title = "Add" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        'flexDirection': 'row',
        borderWidth: 2,
    },
    description: {
        width: '50%',
        fontSize: 12,
        backgroundColor: 'lightskyblue'
    },
    price: {
        width: '20%',
        marginLeft: '8%'
    },
    button: {
        width: '30%',
        fontSize: 12
    }
  });