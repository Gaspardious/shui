import { sendResponse, sendError } from '../../responses/responses.js';
import db from '../../services/db.js';

export const handler = async (event) => {
  try {
    // Extract messageId from the path parameters
    const { id: messageId } = event.pathParameters;

    if (!messageId) {
      return sendError(400, { message: "No messageId provided" });
    }

    // Perform the delete operation in DynamoDB
    await db.delete({
      TableName: "MessageTable",
      Key: { messageId: messageId },
    });

    return sendResponse({ message: 'Message deleted successfully.' });
  } catch (error) {
    console.error('Error deleting message:', error);
    return sendError(500, { message: 'Could not delete the message.', error: error.message });
  }
};
