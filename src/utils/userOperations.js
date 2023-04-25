import axios from 'axios';
import { URLBASEAPI } from '../config/connectionConfig';

export const addUser = async (user) =>{
    const params = {
        uidNumber: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        pass: user.pass,
        name: user.displayName,
        phone: user.photoURL,
        login: 1,
    };

    try {
        const response = await axios.post(URLBASEAPI, params);
        if (response.status === 200) {
            console.log(`${response.data.message}`);
        } else {
            console.log(`An error has occured - status: ${response.status} - message: ${response.data.message}`);
        }
    } catch (error) {
        console.log(`addUser - catch error: ${error}`);
    }    
     
};

export const getUserByUid = async (uid) =>{
    axios({
        method: 'get',
        url: `${URLBASEAPI}getByUid/${uid}`,
    }).then((response) => {
        console.log('getUserByUid - '+response.data);
        return response.data;

    }).catch(function(error){
        console.log(`getUserByUid - error: ${error}`);
    })       
};