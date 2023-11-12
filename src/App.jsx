import React, { useRef, useState } from 'react';
import Auth from './components/Auth';
import Cookies from 'universal-cookie';
import Chat from './components/Chat';
import { getAuth, signOut } from 'firebase/auth'; // Assuming you are using Firebase

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);
  const auth = getAuth(); // Get the auth instance

  const signUserOut = async () => {
    try {
      await signOut(auth);
      cookies.remove("auth-token");
      setIsAuth(false);
      setRoom(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <>
      {room ? (
        <Chat room={room}></Chat>
      ) : (
        <div>
          <label>Enter The Room</label>
          <input ref={roomInputRef} type="text" />
          <button onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat</button>
        </div>
      )}
      <div>
        <button onClick={signUserOut}>Sign Out</button>
      </div>
    </>
  );
}

export default App;
