import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from '../components/AuthFlow/Login';
import SignUp from '../components/AuthFlow/SignUp';
import { setAuthState } from '../features/auth/authRx';
import { auth } from '../config/firebaseConfig';
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Alert } from 'react-native';
import { validateEmail, validatePassword } from '../utils/validation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from 'react-native';
import { addUser } from '../utils/userOperations';

export default function Auth(){
    const dispatch = useDispatch();
    const { authState } = useSelector(state => state.auth); 
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const onLogin = () => {
        const errorEmail = validateEmail(email);
        const errorPassword = validatePassword(password);
        if (errorEmail || errorPassword) {
            Alert.alert(errorEmail, errorPassword);
        } else {
            signInWithEmailAndPassword(auth, email, password)
            .then(user => {
                signSuccess(user,'Signed in');
            })
            .catch(err => Alert.alert('Login error', err.message));
        }
    };   

    const signSuccess = async (value, message) =>{
        try {
            console.log(`Auth - ${message} success`, value.user.email);
            /* await AsyncStorage.setItem('@token', value.user.email); */
            dispatch(setAuthState('signIn')); // signedIn usa el del curso
            Alert.alert(`${message} success`);
        } catch (error) {
            console.log(error)
        }
    };
    
    const onSignUp = () => {
        const errorEmail = validateEmail(email);
        const errorPassword = validatePassword(password);
        if (errorEmail || errorPassword) {
            Alert.alert(errorEmail, errorPassword);
        } else {
            createUserWithEmailAndPassword(auth, email, password)
            .then(user => {
                addUser(user.user);
                signSuccess(user,'Sign up');
            })
            .catch(err => Alert.alert('Signup error', err.message));
        }
    };

    const onSignOut = () => {
        signOut(auth).catch(err => console.log(err));
      };

    return(
        <>
            {authState === 'signIn' && <Login onLogin={onLogin} setEmail={setEmail} setPassword={setPassword}/>}
            {authState === 'signUp' && <SignUp onSignUp={onSignUp} setEmail={setEmail} setPassword={setPassword}/>}
            {authState !== 'signIn' && authState !== 'signUp'? <View><Text>Tamo frito - authState:{authState}</Text></View>: <></>}
        </>
    );
}