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

        // Optionally add the mb-24 class
        // chatContainerRef.current.classList.add('mb-44');
    }, [messages]);;

    return (
        <div>
            <div className="text-3xl font-bold mb-4 fixed top-0 bg-blue-800 w-full text-white text-center p-3">Welcome to: {room.toUpperCase()}</div>

            <div className="flex flex-col space-y-4">
                {messages.map((message) => (
                    <div key={message.id} className="flex flex-col">
                        <span className="bg-blue-500 text-white p-2 font-bold">{message.user}:</span>
                        <span className="bg-blue-200 font-semibold p-2 pb-16 rounded">{message.text}</span>
                    </div>
                ))}
                <div ref={chatContainerRef}></div>
            </div>


            <form className="flex p-4 bg-blue-300 rounded shadow fixed w-full bottom-0" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Write your message!"
                    className="flex-1 p-2 mr-2 border border-gray-300 rounded focus:outline-none"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                />
                <button type="submit" className="flex items-center px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900 focus:outline-none">
                    <span className="mr-2">SEND</span>
                    <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M22 2L11 13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                </button>
            </form>

        </div>



    );
}

export default Chat;
{/* <span>{new Date(message.createdAt.toDate()).toLocaleString()}</span> */ }