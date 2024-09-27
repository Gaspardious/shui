// PostMessage/index.js
import { sendResponse, sendError } from '../../responses/responses.js';
import db from '../../services/db.js';
import { v4 as uuidv4 } from "uuid";

export const handler = async (event) => {
  const body = JSON.parse(event.body);
  const messageId = uuidv4();
  const createdAt = new Date().toISOString();

  try {
    await db.put({
      TableName: 'MessageTable', 
      Item: {               
        messageId,    
        message: body.message,
        username: body.username,
        createdAt, 
      },
    });
  } catch (error) {
    console.log(error);

    return sendError(401, { message: 'Could not create Message', error: error });
  }

  return sendResponse({ message: 'Message created!' });
};