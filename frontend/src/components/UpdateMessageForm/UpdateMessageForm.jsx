// UpdateMessageForm.js
import React, { useState } from 'react';

const UpdateMessageForm = ({ messageId, currentMessage, currentUsername, onUpdate, onCancel, onError }) => {
  const [editText, setEditText] = useState(currentMessage);
  const [editUsername, setEditUsername] = useState(currentUsername);

  const updateMessage = async (e) => {
    e.preventDefault();

    try {
      // Ensure this URL matches the correct endpoint
      const response = await fetch(`https://wsz0ffu3ta.execute-api.eu-north-1.amazonaws.com/messages/${messageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: editText, username: editUsername }),
      });

      if (response.ok) {
        onUpdate(messageId, editText, editUsername);
        console.log('Message updated successfully');
        onCancel();
      } else {
        const errorData = await response.json();
        const errorMessage = errorData?.message || 'An unexpected error occurred while updating the message.';
        onError(`Error updating message: ${errorMessage}`);
      }
    } catch (error) {
      onError('Failed to update the message.');
    }
  };

  return (
    <form onSubmit={updateMessage} className={styles.editForm}>
      <input
        type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        className={styles.editInput}
      />
      <input
        type="text"
        value={editUsername}
        onChange={(e) => setEditUsername(e.target.value)}
        className={styles.editInput}
        placeholder="Username"
      />
      <button type="submit" className={styles.updateButton}>
        Update
      </button>
      <button type="button" onClick={onCancel} className={styles.cancelButton}>
        Cancel
      </button>
    </form>
  );
};

export default UpdateMessageForm;
