import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "../screens/Auth";

const StackAuth = createStackNavigator();

export default function AuthStack(){
    return(
        <StackAuth.Navigator screenOptions={{headerShown: false}}>
            <StackAuth.Screen name='Auth' component={AuthScreen}/>
        </StackAuth.Navigator>
    )

}