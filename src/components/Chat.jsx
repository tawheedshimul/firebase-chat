import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { auth, db } from '../firebase-config';

function Chat(props) {
    const { room } = props;

    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messageRef = collection(db, "messages");

    useEffect(() => {
        const queryMessages = query(messageRef, where("room", "==", room), orderBy("createdAt"));

        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(messages);
        });

        return () => unsubscribe();
    }, [room]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") return;

        await addDoc(messageRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });

        setNewMessage("");
    };


    //new 

    const chatContainerRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom of the chat container
        chatContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [messages]);

    return (
        <div className="w-full h-full flex flex-col bg-gray-900 text-white">
            <div className="text-3xl fixed top-0 w-full ms-6 bg-black p-4 font-bold mb-4">Welcome to: {room.toUpperCase()}</div>

            <div className="flex-1 overflow-y-auto mb-10 space-y-2 p-4">
                {messages.map((message) => (
                    <div key={message.id} className="flex items-start w-screen text-sm">
                        <span className="mr-2 font-semibold text-blue-500">{message.user}:</span>
                        <span>{message.text}</span>
                    </div>
                ))}
                <div ref={chatContainerRef}></div>
            </div>

            <form onSubmit={handleSubmit} className="flex fixed bottom-0 w-full ms-6 mx-auto items-center bg-white rounded-b-lg p-4">
                <input
                    type="text" placeholder="Write your message!" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-2 bg-gray-200 rounded-md py-3"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6 ml-2 transform rotate-90">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                </button>
            </form>
        </div>


    );
}

export default Chat;
{/* <span>{new Date(message.createdAt.toDate()).toLocaleString()}</span> */ }