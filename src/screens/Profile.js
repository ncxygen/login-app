import { View, Text, Alert } from 'react-native';
import { globalStyles } from '../styles/global';
import ButtonCustom from '../components/ButtonCustom';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from '../features/auth/authRx';
import { auth } from '../config/firebaseConfig';
import { signOut as signOutFirebase } from 'firebase/auth';
import UserCard from '../components/UserCard';

export default function Profile() {

    const dispatch = useDispatch();

/*     const logOut = async () =>{
        try {
            signOutFirebase(auth).catch(e => Alert.alert(e));
            await AsyncStorage.removeItem('@token');
            dispatch(signOut());
        } catch (error) {
            console.log(error)
        }
    } */

    return (
        <View style={globalStyles.screenContainer}>
            <Text style={globalStyles.title}>Profile</Text>

            <UserCard/>

            <ButtonCustom 
                title='Logout' 
                onPress={async () => {
                    signOutFirebase(auth).catch(e => Alert.alert(e));
                    await AsyncStorage.removeItem('@token');
                    dispatch(signOut());
                    console.log('Logout complete');
                }}
            />
        </View>
    )
};