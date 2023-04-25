import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeStack from "./homeStack";
/* import BottomTab from "./bottomTab";
import SignUp from "../components/AuthFlow/SignUp"; */
import AuthStack from "./authStack";
import { useSelector, useDispatch} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { restoreToken } from "../features/auth/authRx";
import Splash from "../screens/Splash";
import { auth } from '../config/firebaseConfig';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { setUser } from "../features/user/userRx";

export default function RootNavigator(){
    const [isLoading, setIsLoading] = useState(true);
    const {userToken} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const authFirebase = getAuth();
        const unsubscribeAuth = onAuthStateChanged(authFirebase, async user => { //authFirebase en lugar de auth
            if (user){
                const userToSave = {
                    id: user.uid,
                    name: user.displayName,
                    email: user.email,
                    photoUrl: user.photoURL,
                };
                console.log(`rootnavigator - user complete - ${JSON.stringify(user)}`);
                console.log(`rootNavigator - UserToSave: ${user.uid} - ${user.displayName} - ${user.email} - ${user.photoURL} ${user.emailVerified}`);
                dispatch(setUser(userToSave));
                dispatch(restoreToken(user.email));
                console.log('rootNavigator - user is authenticated')
            } else {
                console.log('rootNavigator - user is not authenticated');
            }
            setIsLoading(false);    
        });
        return unsubscribeAuth;
    },[]);
 
    /* useEffect(() => { 
        getToken()
    },[]);

    const getToken = async () =>{
        try {
            const token = await AsyncStorage.getItem('@token');
            if (token !== null){
                const user = getAuth().currentUser; // No funciona buscar otra forma
                console.log('Get user from firebase', user);
                const userToSave = { 
                    id: user.uid,
                    name: user.displayName,
                    email: user.email,
                    photoUrl: user.photoURL,
                };
                dispatch(setUser(userToSave)); 
                dispatch(restoreToken(token));
                console.log('data restored ', token);
            } else {
                dispatch(restoreToken(null));
                console.log('no data');
            }
        } catch (error) {
            console.log(error)
        }
    }  */

    if (isLoading) return <Splash/>;

    return(
        <NavigationContainer>
            {userToken ? <HomeStack/> : <AuthStack/>}
        </NavigationContainer> 
    ) 
}