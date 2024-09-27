import { sendResponse, sendError } from '../../responses/responses.js';
import db from '../../services/db.js';

export const handler = async (event) => {
  const { id } = event.pathParameters;
  const { message, username } = JSON.parse(event.body);

  if (!id || !message) {
    return sendError(400, { message: 'Message ID and message text are required.' });
  }

  try {
    const updateExpression = [];
    const expressionAttributeValues = { ':message': message };

    updateExpression.push('message = :message');

    // Add username update only if provided/needed
    if (username) {
      updateExpression.push('username = :username');
      expressionAttributeValues[':username'] = username;
    }

    const result = await db.update({
      TableName: 'MessageTable',
      Key: { messageId: id },
      ReturnValues: 'ALL_NEW',
      UpdateExpression: `SET ${updateExpression.join(', ')}`,
      ExpressionAttributeValues: expressionAttributeValues,
    });

    return sendResponse({
      message: 'Message updated successfully!',
      updatedItem: result.Attributes,
    });
  } catch (error) {
    console.error('Update Error:', error);
    return sendError(400, {
      message: 'Could not update the message. Please check your input and try again.',
      error: error.message,
    });
  }
};
