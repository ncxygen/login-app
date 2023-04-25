import { TextInput, View, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

export default function InputCustom({ label, value, onChangeText, secureTextEntry}) {
    return (
        <>  
{/*             <View style={styles.containerText}>
                <Text style={styles.textInput}>{text}</Text>
            </View> */}
            <View style={styles.containerInput}>
                <TextInput
                    placeholder={label}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    style={styles.input} 
                />
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    
    /* containerText: {
        width: '85%',
    },
    textInput:{
        fontSize: 16, 
        fontWeight: '400', 
        color: Colors.grey,
        margin:0,
        textAlign:'left',
    }, */
    containerInput: {
        width: '90%',
        height: 45,
        backgroundColor: Colors.ligth,
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.primary,
        justifyContent: 'center',
    },
    input: {
        width: '90%',
        fontSize: 16, 
    }
});