// UpdateMessage.js
import React, { useState } from 'react';
import styles from './updatemessage.module.css'; // Create a CSS file specific for this component if needed

const UpdateMessage = ({ messageId, editText, setEditText, setMessages, setEditingMessage, setError }) => {
  // Function to handle updating a message
  const updateMessage = async () => {
    try {
      const response = await fetch(
        `https://wsz0ffu3ta.execute-api.eu-north-1.amazonaws.com/messages/${messageId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: editText }), // Send the updated message text
        }
      );

      if (response.ok) {
        // Update the state with the updated message
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.messageId === messageId ? { ...msg, message: editText } : msg
          )
        );
        console.log('Message updated successfully');
        setEditingMessage(null); // Close the edit form
      } else {
        const errorData = await response.json();
        const errorMessage = errorData?.message || 'An unexpected error occurred while updating the message.';
        setError(`Error updating message: ${errorMessage}`);
      }
    } catch (error) {
      setError('Failed to update the message.');
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateMessage();
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
        <button
          type="button"
          onClick={() => setEditingMessage(null)}
          className={styles.cancelButton}
        >
          Cancel
        </button>
      </section>
    </form>
  );
};

export default UpdateMessage;
