import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from "../constants/colors";

const TabNavigator = createBottomTabNavigator();

export default function BottomTab(){
    return( 
        <TabNavigator.Navigator 
            initialRouteName="Home" 
            screenOptions={{
                headerTitleAlign: 'center',
                tabBarActiveTintColor: Colors.secondary,
            }}
            >
            <TabNavigator.Screen 
                name='Home' 
                component={Home} 
                options={{tabBarIcon: ({color})=><FontAwesome name="home" size={30} color={color} />}}/>
            <TabNavigator.Screen 
                name='Profile' 
                component={Profile}
                options={{tabBarIcon: ({color})=><FontAwesome name="user" size={28} color={color} />}}/>
        </TabNavigator.Navigator>
    )
}