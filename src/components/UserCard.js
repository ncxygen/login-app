import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import { useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { URLDEFAULTIMAGE, USERDEFAULTNAME } from '../config/generalConfig';
import { URLBASEAPI } from '../config/connectionConfig';
import axios from 'axios';

export default function UserCard() {
    const userState = useSelector(state => state.user);
    const [user, setUser] = useState(null);
    const [edit, setEdit] = useState(false);
    const [editableName, setEditableName] = useState(user===null||user.name===null||user.name===undefined ? USERDEFAULTNAME : user.name);
    
    useEffect(() => {
        getUser();
    },[]);  

    console.log(`Card - user ${user}`);

    const getUser = () => {
        axios({
            method: 'get',
            url: `${URLBASEAPI}getByUid/${userState.id}`,
        }).then((response) => {
            setUser(response.data) ;
            console.log('getUser - '+response.data);
            //update name variable
            setEditableName(response.data.name);

        }).catch(function(error){
            console.log(`getUser - error: ${error}`);
        })    
    };

    const handleEditName = (name) => {
        setEditableName(name);
    };


    const updateUser = async (id, datos) => {
        try {
            const response = await axios.put(`${URLBASEAPI}${id}`, datos);
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error('Error al actualizar el usuario');
        }
    };

    const handleSaveName = () => {
        setEdit(false);
        //Send to the backend here ->
        const params = {
            uidNumber: user.uidNumber,
            email: user.email,
            pass: user.pass,
            emailVerified: user.emailVerified,  
            name: editableName,
            phone: user.phone,
            login: user.login  
        };

        console.log(`handleSaveName - params id:${user.idUser} - 1:${params.uidNumber} - 2:${params.email} - 3:${params.pass} - 4:${params.emailVerified} - 5:${params.name} - 6:${params.phone} - 7:${params.login}`)

        updateUser(user.idUser, params)
        .then(userUpdated => {
            console.log('User updated:', userUpdated);
            // update user 
            getUser(); 
        })
        .catch(error => {
            console.error('Error updating user:', error.message);
        });
    };
    
    const handleCancelEditName = () => {
        //
        setEditableName(user.name===null||user.name===undefined ? USERDEFAULTNAME : user.name);
        setEdit(false);
    };

    return(
        <View style={styles.card}>
            {user ? 
                <>  
                    <View style={styles.editButtonContainer}>
                        <TouchableOpacity style={styles.editButton} onPress={()=>setEdit(!edit)}>
                            <FontAwesome name='edit' size={20} color={Colors.ligth}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <Image source={{ uri: user.phone===null||user.phone===undefined ? URLDEFAULTIMAGE : user.phone }} style={styles.img} />
                    </View>
                    <Text style={styles.name}>{user.email}</Text>

                    {edit ? (
                        <>
                            <View style={styles.containerInput}>
                                <TextInput
                                    style={styles.name}
                                    value={editableName}
                                    onChangeText={handleEditName}
                                />
                            </View>

                            <View style={styles.containerButton}>

                                <TouchableOpacity style={styles.button} onPress={handleSaveName}>
                                    <Text style={styles.textButton}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={handleCancelEditName}>
                                    <Text style={styles.textButton}>Cancel</Text>
                                </TouchableOpacity>

                            </View>
                        </>    
                    ) : (
                        <Text style={styles.name}>{user===null||user.name===null||user.name===undefined ? USERDEFAULTNAME : user.name}</Text>
                    )}
                </> :
                <Text>There is no data available.</Text>
            }
        </View>
    )

}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    card: {
        position: 'relative',
        backgroundColor: 'snow',
        width: '85%',
        padding: 20,
        margin: 10,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: Colors.primary,
        alignItems: 'center',
    },
    editButtonContainer: {
        position: 'absolute',
        right: 10,
        top: 5,
    },
    editButton: {
        width: '100%',
        height: 40,
        backgroundColor: Colors.primary,
        padding: 10,
        margin: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    name: {
      fontSize: 17,
      fontWeight: 'bold',
      marginLeft: 10,
      flexShrink: 1,
    },
    containerInput: {
        width: '85%',
        height: 35,
        backgroundColor: Colors.ligth,
        padding: 5,
        margin: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerButton: {
        flexDirection: 'row'
    },
    button: {
        width: '45%',
        height: 40,
        backgroundColor: Colors.primary,
        padding: 10,
        margin: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton: {
        color: Colors.ligth,
        fontSize: 16,
        fontWeight: 'bold',
    }
});