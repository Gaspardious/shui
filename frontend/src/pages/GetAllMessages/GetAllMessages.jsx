import { useState, useEffect } from 'react';
import styles from './getallmessages.module.css';

const GetAllMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch messages
  const fetchMessages = async () => {
    try {
      const response = await fetch('https://wsz0ffu3ta.execute-api.eu-north-1.amazonaws.com/messages');
      const data = await response.json();

      // Check if data is an array and set messages state accordingly or set error state if data is not an array or fetch fails 
      if (Array.isArray(data.data)) {
        setMessages(data.data);
      } else {
        setError('Unexpected data format.');
      }
    } catch {
      setError('Failed to load messages.');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className={styles.container}>
      {error ? <p className={styles.error}>{error}</p> : null} {/* using ternary operator to conditionally render error message if error is not null */}
      <ul className={styles.messagelist}>
        {messages.length === 0 ? (
          <p>No messages found</p>
        ) : (           // using ternary operator to conditionally render messages if messages array is not empty
          messages.map(({ messageId, date, message, username }) => (
            <li key={messageId} className={styles.message}>
              <p className={styles.message_date}>Created at: {new Date(date).toLocaleString()}</p>
              <p className={styles.message_text}>{message}</p>
              <p className={styles.message_username}>Username: {username}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default GetAllMessages;
