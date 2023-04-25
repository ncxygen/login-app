import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

export default function ButtonThirdParty({title, onPress, img, disabled}) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled}>
            {img==='google' && <Image source={require('../../assets/google_icon.png')} style={styles.buttonImage} />}
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button:{
        width: '90%',
        height: 45,
        backgroundColor: Colors.primary,
        padding: 10,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        /* justifyContent: 'center', */
        flexDirection: 'row',
    },
    buttonText: {
        color: Colors.ligth,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    buttonImage: {
        width: 24,
        height: 24,
        marginRight: 10,
    }
})