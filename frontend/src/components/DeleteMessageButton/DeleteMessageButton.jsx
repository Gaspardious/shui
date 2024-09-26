
  const deleteMessage = async () => {
    try {
      const response = await fetch(`https://wsz0ffu3ta.execute-api.eu-north-1.amazonaws.com/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        onDelete(messageId); // Notify parent component of successful deletion
        console.log('Message deleted successfully');
      } else {
        const errorData = await response.json();
        onError(`Error deleting message: ${errorData.message}`);
      }
    } catch (error) {
      onError('Failed to delete the message.');
    }
  };

export default deleteMessage;
