import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
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

    return (
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
            <div>Welcome to: {room.toUpperCase()} </div>
            <div>
                {messages.map((message) => (
                    <div key={message.id}>
                        <span>{message.user}</span>
                        <span>{message.text}</span>
                        {/* <span>{new Date(message.createdAt.toDate()).toLocaleString()}</span> */}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="flex items-center">
                <input
                    type="text"
                    placeholder="Type your message here"
                    className="flex-1 p-3 mr-2 bg-gray-200 rounded-md"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                />
                <button
                    type="submit"
                    className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600 focus:outline-none"
                >
                    Send
                </button>
            </form>
        </div>
    );
}

export default Chat;
