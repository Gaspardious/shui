import styles from './deletemessage.module.css';

const DeleteMessage = ({ messageId, setMessages, setError }) => {

  const deleteMessage = async () => {
    try {
      const response = await fetch(
        `https://wsz0ffu3ta.execute-api.eu-north-1.amazonaws.com/messages/${messageId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.ok) {
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.messageId !== messageId)
        );
        console.log('Message deleted successfully');
      } else {
        const errorData = await response.json();
        setError(`Error deleting message: ${errorData.error?.message || 'Unexpected error occurred.'}`);
      }
    } catch (error) {
      setError('Failed to delete the message.');
    }
  };
  

  return (
    <button
      className={styles.deleteButton}
      onClick={deleteMessage}
      aria-label="Delete"
    >
      ✕
    </button>
  );
};

export default DeleteMessage;
