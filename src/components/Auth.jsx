import React from 'react';
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from 'firebase/auth';
import Cookies from 'universal-cookie';

const cookies = new Cookies

function Auth(props) {
    const { setIsAuth } = props;
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(true);
            // console.log(result)
        } catch (err) {
            console.error(err);
        }

    };

    return (
        <div>
            <button onClick={signInWithGoogle}>
                <span className="bg-blue-500 fixed top-1/2 left-1/2 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">Sign in with Google</span>
            </button>
        </div>
    );
}

export default Auth;
