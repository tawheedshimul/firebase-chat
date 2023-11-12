import React, { useRef, useState } from 'react';
import Auth from './components/Auth';
import Cookies from 'universal-cookie';
import Chat from './components/Chat';
import { getAuth, signOut } from 'firebase/auth';


const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);
  const auth = getAuth();

  const signUserOut = async () => {
    try {
      await signOut(auth);
      cookies.remove('auth-token');
      setIsAuth(false);
      setRoom(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        {!isAuth ? (
          <Auth setIsAuth={setIsAuth} />
        ) : (
          <>
            {room ? (
              <Chat room={room}></Chat>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <label className="text-lg font-bold mb-4">Enter The Room</label>
                <input
                  className="border border-gray-300 p-2 rounded-md w-64"
                  ref={roomInputRef}
                  type="text"
                />
                <button
                  className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                  onClick={() => setRoom(roomInputRef.current.value)}
                >
                  Enter Chat
                </button>
              </div>
            )}
            <div className="mt-4">
              <button
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                onClick={signUserOut}
              >
                Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
