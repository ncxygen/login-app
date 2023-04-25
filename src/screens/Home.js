import { View, Text } from 'react-native';
import { globalStyles } from '../styles/global';
import { useNavigation } from '@react-navigation/native';
import ButtonCustom from '../components/ButtonCustom';

const Home = () => {
    const navigation = useNavigation();
    return (
        <View style={globalStyles.screenContainer}>
            <Text style={globalStyles.title}>Home</Text>
            <ButtonCustom
                title='Go to Settings'
                onPress={()=> navigation.navigate('Settings')}
            />
        </View>
    )
}

export default Home