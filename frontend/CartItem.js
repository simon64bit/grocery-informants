import React from 'react';
import { Text,View, StyleSheet, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { removeItem } from './Actions.js';
import {server} from './Constants.js';

export default function CartItem(props){
    const item = props.item;

    const dispatch = useDispatch();
    const user = useSelector(state => state.Reducer.user);

    async function removeItemFromDatabase(item) {
        fetch(server + "/removeitem?user=" + user + "&description=" + item.description);
    }

    function removeFromCart(item) {
        if (user != null) {
            removeItemFromDatabase(item);
        }
        dispatch(removeItem(item));
    }
    
    return (
        <View style = {styles.container}>
            <Text style = {styles.description}>{item.description}</Text> 
            <Text style = {styles.price}>{(item.price != 0) ? ("$" + item.price) : "N/A"}</Text>
            <Text style = {styles.store}>{item.store}</Text>
            <Button style = {styles.button} onPress = {() => removeFromCart(item)} title = "-" />
        </View>
    )
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
        marginLeft: '8%'
    },
    store: {
        width: '15%',
        fontSize: 12,
        backgroundColor: 'lightskyblue'
    },
    button: {
        width: '15%',
        fontSize: 12,
    }
  });