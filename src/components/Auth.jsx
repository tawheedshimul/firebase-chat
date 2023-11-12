// import React from 'react';
// import { auth, provider } from "../firebase-config";
// import { signInWithPopup } from 'firebase/auth';
// import Cookies from 'universal-cookie';

// const cookies = new Cookies

// function Auth(props) {
//     const { setIsAuth } = props;
//     const signInWithGoogle = async () => {
//         try {
//             const result = await signInWithPopup(auth, provider);
//             cookies.set("auth-token", result.user.refreshToken);
//             setIsAuth(true);
//         } catch (err) {
//             console.error(err);
//         }

//     };

//     return (
//         <div>
//             <button onClick={signInWithGoogle}>
//                 <span className="text-gray-700">Sign in with Google</span>
//             </button>
//         </div>
//     );
// }

// export default Auth;

import React from 'react';
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function Auth({ setIsAuth }) {
  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      const idToken = await user.getIdToken();
      
      cookies.set('auth-token', idToken);
      setIsAuth(true);

      console.log('Authentication successful:', user.displayName);
    } catch (error) {
      console.error('Authentication error:', error.message);
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

