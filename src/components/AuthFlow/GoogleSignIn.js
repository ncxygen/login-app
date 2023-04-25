import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import ButtonThirdParty from '../ButtonThirdParty'; 
import { auth } from '../../config/firebaseConfig';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { addUser, getUserByUid } from '../../utils/userOperations';
import { CLIENTIDGOOGLE } from '../../config/connectionConfig';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignInButton() {

    const [request, response, promtAsync] = Google.useIdTokenAuthRequest({
        clientId: CLIENTIDGOOGLE,
    });

    const getUser = async(uid) => {
        console.log(`GoogleSingIn - getUser async - uid:${uid}`);
        const user = await getUserByUid(uid);
        return user
    }

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential)
            .then((result) => {    
                const user = result.user;
                if (user!==null||user!==undefined){
                        console.log(`GoogleSignIn -x- user:${user.email}`);
                        const userSavedAPI = getUser(user.uid);
                        console.log(`GoogleSignIn - user back:${userSavedAPI.uidNumber}`);
                        if (userSavedAPI.uidNumber===null || userSavedAPI.uidNumber===undefined){
                            const newUser = {
                                uid: user.uid,
                                email: user.email,
                                emailVerified: user.emailVerified,
                                pass: ' ', // Resolver, deberiamos guardar token y no pass
                                displayName: user.displayName,
                                photoURL: user.photoURL,
                            };
                            addUser(newUser);
                        }    

                } else {
                    console.log(`GoogleSignIn -else- user ${user}`);
                }
                
            })
            .catch((error) => {
                // ...
            });   
        }
    }, [response]);

    return (
        <ButtonThirdParty
            title="Sign in with Google"
            disabled={!request}
            onPress={() => promtAsync()}
            img="google"
        />
      );
}    