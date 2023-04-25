import { View, Text, ActivityIndicator } from 'react-native';
import { globalStyles } from '../styles/global';

const Splash = () => {
    return (
        <View style={globalStyles.screenContainer}>
            <Text style={globalStyles.title}>Loading...</Text>
            <ActivityIndicator size='large'/>
        </View>
    )
}

export default Splash