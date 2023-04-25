import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

export default function TextButton({title, onPress}) {
    return (
        <View style={styles.container}>
            <Text style={styles.leftText} onPress={onPress}>{title}</Text>
        </View>  
    )
};

const styles = StyleSheet.create({
    container:{
        width: '85%',
    },
    leftText: {
        color: Colors.primary,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        marginVertical: 10,
        textDecorationLine: 'underline',
    }
})