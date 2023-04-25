import { View, Text } from 'react-native';
import { globalStyles } from '../../styles/global';
import InputCustom from '../InputCustom';
import ButtonCustom from '../ButtonCustom';
import { useDispatch } from 'react-redux';
import { setAuthState } from '../../features/auth/authRx';
import TextButton from '../TextBotton';

export default function SignUp({onSignUp, setEmail, setPassword}){
    const dispatch = useDispatch();

    const addUser = () => {

    }

    return (
        <View style={globalStyles.screenContainer}>
            <Text style={globalStyles.title}>SignUp</Text>
            <InputCustom label='Email' onChangeText={setEmail}/>
            <InputCustom label='Password' secureTextEntry onChangeText={setPassword}/>
            <ButtonCustom title='REGISTER NOW' onPress={onSignUp}/>
            <TextButton title="I'm already a member" onPress={()=>dispatch(setAuthState('signIn'))}/>
        </View>
    )
};