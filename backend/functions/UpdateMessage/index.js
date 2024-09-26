import { sendResponse, sendError } from '../../responses/responses.js';
import db from '../../services/db.js';

export const handler = async (event) => {
  const { id } = event.pathParameters;
  const { message, username } = JSON.parse(event.body);

  // Check if required fields are missing
  if (!id || !message) {
    return sendError(400, { message: 'Message ID and message text are required.' });
  }

  try {
    // Initialize the UpdateExpression and ExpressionAttributeValues
    let updateExpression = 'SET message = :message';
    let expressionAttributeValues = {
      ':message': message,
    };

    // Conditionally add username to the update expression
    if (username !== undefined && username !== null) {
      updateExpression += ', username = :username';
      expressionAttributeValues[':username'] = username;
    }

    const result = await db.update({
      TableName: 'MessageTable',
      Key: { messageId: id },
      ReturnValues: 'ALL_NEW',
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
    });

    return sendResponse({
      message: 'Message updated successfully!',
      updatedItem: result.Attributes,
    });

  } catch (error) {
    console.error('Update Error:', error);

    return sendError(400, {
      message: 'Could not update Message. Please check your input and try again.',
      error: error.message,
    });
  }
};
