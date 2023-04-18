import React, { useState } from 'react';
import { Text,View, StyleSheet, Button, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { emptyCart } from './Actions.js';
import CartItem from './CartItem.js';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Cart(){
    const items = useSelector(state => state.Reducer.items);
    const price = useSelector(state => state.Reducer.price);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [storeValue, setValue] = useState("All");
    const [stores, setStores] = useState([
        {label: 'All', value: 'All'},
        {label: 'Kroger', value: 'Kroger'},
        {label: 'Target', value: 'Target'}
    ]);

    return (
        <View>
            <DropDownPicker
                open={open}
                value={storeValue}
                items={stores}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setStores}
            />
            <ScrollView style={styles.scrollview}>
                <Text style={{padding: 10, fontSize: 25, marginTop: 10}}>
                    {
                    getCartItems(storeValue, items)
                    }
                </Text>
            </ScrollView>
            <View style={styles.footer}>
                <Text style={{padding: 10, fontSize: 25, textAlign:"center"}}>Cart Price: ${getCartPrice(storeValue, items)}</Text>
                <Button onPress = {() => dispatch(emptyCart())} title = "Empty Cart"/>
            </View>
        </View>
    )
}

function getCartItems(storeValue, items) {
    if (storeValue != 'All') {
        items = items.filter(item => item.store == storeValue)
        console.log(items)
    }
    return (
        items.map(item => {
            return <CartItem item={item}></CartItem>
        })
    )
}

function getCartPrice(storeValue, items) {
    if (storeValue != 'All') {
        items = items.filter(item => item.store == storeValue)
    }
    var price = 0
    items.forEach(item =>
        price +=item.price
    );

    return price.toFixed(2)
}

const styles = StyleSheet.create({
    scrollview: {
       margin: 10,
       marginTop: 50,
       height: '80%'
    },
    footer: {
        marginBottom: 680
    }
  });