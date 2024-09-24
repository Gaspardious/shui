import { sendResponse, sendError } from '../../responses/responses.js';
import db from '../../services/db.js';

export const handler = async (event) => {
  const { id } = event.pathParameters;
  const { message, username } = JSON.parse(event.body);

  try {

    const result = await db.update({
      TableName: 'MessageTable',  
      Key: { messageId: id },     
      ReturnValues: 'ALL_NEW',    // Returns the updated item after the operation
      UpdateExpression: 'SET message = :message, username = :username',
      ExpressionAttributeValues: {
        ':message': message,
        ':username': username,
      },
    })  

    return sendResponse({
      message: 'Message updated successfully!',
      updatedItem: result.Attributes,  // Include the updated item in the response
    });

  } catch (error) {
    console.error('Update Error:', error);

    return sendError(400, { message: 'Could not update Message', error: error.message });
  }
};
