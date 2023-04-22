import { Text, View, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Footer() {
    const navigation = useNavigation();
    return (
    <View style={styles.footer}>
        <Button onPress={() => navigation.navigate("Search")} title = "Search"/>  
        <Button onPress={() => navigation.navigate("Cart")} title = "Cart"/>  
    </View>
    );
  }

const styles = StyleSheet.create({
    footer: {
      backgroundColor: "navy",
      padding: 20
    }
  });