import React, { useState } from 'react';
import { Text,View, TextInput, StyleSheet, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { emptyCart } from './Actions.js';

export default function Cart(){
    // const [text,set_text] = useState('');
    // const [data, set_data] = useState([]);
    const items = useSelector(state => state.Reducer.items);
    const price = useSelector(state => state.Reducer.price);
    const dispatch = useDispatch();

    return (
        <View>
            <Button onPress = {() => dispatch(emptyCart())} title = "Empty Cart"/>
            <Text style={{padding: 10, fontSize: 25}}>
                Cart Price: {price}
                {
                items.map(item => {
                    return "\n" + item.description + ": " + item.price
                })
                }
                
            </Text>
        </View>
    )
}
