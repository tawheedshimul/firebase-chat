import React from 'react';
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function Auth({ setIsAuth }) {
    const signInWithGoogle = async () => {
        try {
            const { user } = await signInWithPopup(auth, provider);
            cookies.set('auth-token', user.refreshToken);
            setIsAuth(true);
        } catch (error) {
            console.error(error);
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

