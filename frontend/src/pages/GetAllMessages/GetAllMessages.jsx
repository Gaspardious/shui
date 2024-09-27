import { useState, useEffect } from 'react';
import styles from './getallmessages.module.css';
import DeleteMessage from '../DeleteMessage/DeleteMessage.jsx';
import UpdateMessage from '../UpdateMessage/UpdateMessage.jsx';

const GetAllMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editText, setEditText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  // Function to fetch messages
  const fetchMessages = async () => {
    try {
      const response = await fetch('https://wsz0ffu3ta.execute-api.eu-north-1.amazonaws.com/messages', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (Array.isArray(data.data)) {
        setMessages(data.data);
      } else {
        setError('Unexpected data format.');
      }
    } catch {
      setError('Failed to load messages.');
    }
  };

  // Function to handle showing the edit form
  const handleEditClick = (message) => {
    setEditingMessage(message.messageId);
    setEditText(message.message);
  };

  // Function to handle the cancel action
  const handleCancelEdit = () => {
    setEditingMessage(null);
    setEditText('');
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Filter messages based on the search term
  const filteredMessages = messages.filter(({ username, message }) =>
    username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort the filtered messages based on the createdAt date
  const sortedMessages = [...filteredMessages].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  // Function to toggle the sort order between ascending and descending
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className={styles.container}>
      {error && <p className={styles.error}>{error}</p>}
      {messages.length > 0 && (
        <>
          <button onClick={toggleSortOrder} className={styles.sortButton}>
            Date ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
          </button>
          <input
            type="text"
            placeholder="Search by username or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchBar}
          />
        </>
      )}
      <ul className={styles.messagelist}>
        {sortedMessages.length === 0 ? (
          <p>No messages found</p>
        ) : (
          sortedMessages.map(({ messageId, createdAt, message, username }) => (
            <li key={messageId} className={styles.message}>
              <p className={styles.message_date}>
                Created at: {new Date(createdAt).toLocaleString()}
              </p>
              <p className={styles.message_text}>{message}</p>
              <p className={styles.message_username}>Username: {username}</p>
              <DeleteMessage
                messageId={messageId}
                setMessages={setMessages}
                setError={setError}
              />
              <button
                className={styles.editButton}
                onClick={() => handleEditClick({ messageId, message })}
                aria-label="Edit"
              >
                Edit
              </button>
              {editingMessage === messageId && (
                <UpdateMessage
                  messageId={messageId}
                  editText={editText}
                  setEditText={setEditText}
                  setMessages={setMessages}
                  setEditingMessage={setEditingMessage}
                  setError={setError}
                />
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default GetAllMessages;
