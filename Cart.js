import React, { useState } from 'react';
import { Text,View, StyleSheet, Button, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { emptyCart } from './Actions.js';
import CartItem from './CartItem.js';

export default function Cart(){
    const items = useSelector(state => state.Reducer.items);
    const price = useSelector(state => state.Reducer.price);
    const dispatch = useDispatch();

    return (
        <View>
            <ScrollView style={styles.scrollview}>
                <Text style={{padding: 10, fontSize: 25, marginTop: 10}}>
                    {
                    items.map(item => {
                        return <CartItem item={item}></CartItem>
                    })
                    }
                </Text>
            </ScrollView>
            <View style={styles.footer}>
                <Text style={{padding: 10, fontSize: 25, textAlign:"center"}}>Cart Price: ${price}</Text>
                <Button onPress = {() => dispatch(emptyCart())} title = "Empty Cart"/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollview: {
       margin: 10,
       marginTop: 50,
       height: '80%'
    },
    footer: {
        marginBottom: 500
    }
  });