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
    <div>
      <div>
        {!isAuth ? (
          <Auth setIsAuth={setIsAuth} />
        ) : (
          <>
            {room ? (
              <Chat room={room}></Chat>
            ) : (
              <div className="flex flex-col mt-24 space-y-4">
                <label className="text-lg text-white text-center bg-black p-3 font-bold mb-4">Enter The Room</label>
                <div className='flex flex-col items-center justify-center'>
                  <div>
                    <input
                      className="border border-gray-300 p-2 rounded-md w-64"
                      ref={roomInputRef}
                      type="text"
                    />
                  </div>
                  <button
                    className="bg-blue-500 mt-3 w-24 text-white p-2 rounded-md hover:bg-blue-600"
                    onClick={() => setRoom(roomInputRef.current.value)}
                  >
                    Enter Chat
                  </button>
                </div>

              </div>
            )}
            <div className="mt-4">
              <button
                className="bg-red-500 fixed top-3 right-3 text-white p-2 rounded-md hover:bg-red-600"
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
