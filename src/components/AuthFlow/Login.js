import { useState } from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../../styles/global';
import InputCustom from '../InputCustom';
import ButtonCustom from '../ButtonCustom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setAuthState } from '../../features/auth/authRx';
import { signIn } from '../../features/auth/authRx'; 
import GoogleSignInButton from './GoogleSignIn';
import TextButton from '../TextBotton';

export default function Login({onLogin, setEmail, setPassword}){
    /* const [token, setToken] = useState('');  */
    const dispatch = useDispatch();

    /* const save = async (value) =>{
        try {
            await AsyncStorage.setItem('@token', value);
            dispatch(signIn(value));
            console.log('Login - data saved');
        } catch (error) {
            console.log(error)
        }
    }  */
    return (
        <View style={globalStyles.screenContainer}>
            <Text style={globalStyles.title}>Login</Text>
            <GoogleSignInButton/>
            <Text style={globalStyles.divisionText}>Or</Text>
            <InputCustom label='Email' onChangeText={setEmail}/>
            <InputCustom label='Password' secureTextEntry onChangeText={setPassword}/>
            <ButtonCustom title='LOGIN' onPress={onLogin}/>
            <TextButton title='Create new account' onPress={()=>dispatch(setAuthState('signUp'))}/>
        </View>
    )
};