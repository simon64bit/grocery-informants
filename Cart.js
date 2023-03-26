import React, { useState } from 'react';
import { Text,View, StyleSheet, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { emptyCart } from './Actions.js';

export default function Cart(){
    const items = useSelector(state => state.Reducer.items);
    const price = useSelector(state => state.Reducer.price);
    const dispatch = useDispatch();

    return (
        <View>
            <Button onPress = {() => dispatch(emptyCart())} title = "Empty Cart"/>
            <Text style={{padding: 10, fontSize: 25}}>
                
                {
                items.map(item => {
                    return "\n" + item.description + ": " + "$" + item.price
                })
                }

                Cart Price:${price}
                
            </Text>
        </View>
    )
}
