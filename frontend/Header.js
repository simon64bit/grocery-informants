import { Text, View, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
    const navigation = useNavigation();

    return (
    <View style={styles.header} >
        <Button style={{alignSelf: 'right'}} onPress={() => navigation.navigate("Profile") } title = "Profile"/>  
    </View>
    );
  }

const styles = StyleSheet.create({
    header: {
      backgroundColor: "lightskyblue",
      padding: 20,
      paddingTop: 20,
      flexDirection: "row",
      justifyContent: "flex-end"
    }
  });