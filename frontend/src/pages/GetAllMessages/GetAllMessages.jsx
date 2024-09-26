import { useState, useEffect } from 'react';
import styles from './getallmessages.module.css';



const GetAllMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null); // State for tracking the message being edited
  const [editText, setEditText] = useState(''); // State for the edited message text

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

      // Check if data is an array and set messages state accordingly
      if (Array.isArray(data.data)) {
        setMessages(data.data);
      } else {
        setError('Unexpected data format.');
      }
    } catch {
      setError('Failed to load messages.');
    }
  };

  // Function to delete a message
  const deleteMessage = async (messageId) => {
    try {
      const response = await fetch(`https://wsz0ffu3ta.execute-api.eu-north-1.amazonaws.com/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Update the state to remove the deleted message
        setMessages((prevMessages) => prevMessages.filter((msg) => msg.messageId !== messageId));
        console.log('Message deleted successfully');
      } else {
        const errorData = await response.json();
        setError(`Error deleting message: ${errorData.message}`);
      }
    } catch (error) {
      setError('Failed to delete the message.');
    }
  }; 
  
  // Function to handle updating a message
// Function to handle updating a message
const updateMessage = async (messageId) => {
  try {
    const response = await fetch(`https://wsz0ffu3ta.execute-api.eu-north-1.amazonaws.com/messages/${messageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: editText }), // Send the updated message text
    });

    if (response.ok) {
      // Update the state with the updated message
      setMessages((prevMessages) =>
        prevMessages.map((msg) => (msg.messageId === messageId ? { ...msg, message: editText } : msg))
      );
      console.log('Message updated successfully');
      setEditingMessage(null); // Close the edit form
    } else {
      // Attempt to parse the error response for a message
      const errorData = await response.json();
      const errorMessage = errorData?.message || 'An unexpected error occurred while updating the message.';
      setError(`Error updating message: ${errorMessage}`);
    }
  } catch (error) {
    // Handle any unexpected errors during the request
    setError('Failed to update the message.');
  }
};


  // Function to handle showing the edit form
  const handleEditClick = (message) => {
    setEditingMessage(message.messageId);
    setEditText(message.message); // Pre-fill the form with the current message text
  };

  // Function to handle the cancel action
  const handleCancelEdit = () => {
    setEditingMessage(null);
    setEditText('');
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className={styles.container}>
      {error ? <p className={styles.error}>{error}</p> : null}
      <ul className={styles.messagelist}>
        {messages.length === 0 ? (
          <p>No messages found</p>
        ) : (
          messages.map(({ messageId, date, message, username }) => (
            <li key={messageId} className={styles.message}>
              <p className={styles.message_date}>Created at: {new Date(date).toLocaleString()}</p>
              <p className={styles.message_text}>{message}</p>
              <p className={styles.message_username}>Username: {username}</p>
              <button
                className={styles.deleteButton}
                onClick={() => deleteMessage(messageId)}
                aria-label="Delete"
              >
                ✕
              </button>
              <button
                className={styles.editButton}
                onClick={() => handleEditClick({ messageId, message })}
                aria-label="Edit"
              >
                Edit
              </button>
              {/* Show the edit form if this message is being edited */}
              {editingMessage === messageId && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateMessage(messageId);
                  }}
                  className={styles.editForm}
                >
                  <textarea  
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className={styles.editInput}
                    maxLength={300} 
                  />
                <section className={styles.buttons}>
                  <button type="submit" className={styles.updateButton}>
                    Update
                  </button>
                  <button type="button" onClick={handleCancelEdit} className={styles.cancelButton}>
                    Cancel
                  </button>
                  </section>
                </form>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default GetAllMessages;
