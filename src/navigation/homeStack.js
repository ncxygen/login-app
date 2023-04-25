import { createStackNavigator } from '@react-navigation/stack';
import Settings from '../screens/Settings';
import { View, Text } from 'react-native';
import { Colors } from '../constants/colors';
import BottomTab from './bottomTab';

const Stack = createStackNavigator();

const myScreenOptions = {
    headerShown: false,
    //title: 'Title',
    headerTitleAlign: 'center',
    presentation: 'card',
    gestureEnabled: false,
    keyboardHandlingEnabled: true,
    /* header: ({ navigation, route, options, back})=> <CustomHeader title={route.name}/> */
}

const CustomHeader = ({title})=>{
    return(
        <View
            style={{
                height: 80,
                width: '100%',
                backgroundColor: Colors.secondary,
                padding: 10,
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}
        >
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: Colors.ligth,
                }}
            >
                {title}
            </Text>
        </View>
    )
}

export default function HomeStack() {
    return(
        <Stack.Navigator initialRouteName='Home' screenOptions={ myScreenOptions }>
            <Stack.Screen name='Root' component={BottomTab}/>
            <Stack.Group screenOptions={{headerShown: true}}>
                <Stack.Screen name='Settings' component={Settings} options={{headerBackTitle: 'Home'}}/>
            </Stack.Group>    
        </Stack.Navigator>
    );
};