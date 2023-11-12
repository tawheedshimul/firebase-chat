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
        } catch (err) {
            console.error(err);
        }

    };

    return (
        <div>
            <button onClick={signInWithGoogle}>
                <span className="text-gray-700">Sign in with Google</span>
            </button>
        </div>
    );
}

export default Auth;
