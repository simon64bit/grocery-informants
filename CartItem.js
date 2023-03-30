import React from 'react';
import { Text,View, StyleSheet, Button} from 'react-native';

export default function CartItem(props){
    const item = props.item;
    return (
        <View style = {styles.container}>
            <Text style = {styles.description}>{item.description}</Text> 
            <Text style = {styles.price}>${item.price}</Text>
            <Text style = {styles.store}>{item.store}</Text>
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
        marginLeft: '5%'
    },
    store: {
        width: '25%',
        fontSize: 12,
        backgroundColor: 'lightgreen'
    }
  });