import { sendResponse, sendError } from '../../responses/responses.js';
import db from '../../services/db.js';

export const handler = async (event) => {

  try {
    const { Items } = await db.scan({
      TableName: "MessageTable",
    });

    return sendResponse(Items, { message: "Messages retrieved successfully" });
  } catch (error) {
    return sendError(500, error);
  }



};
