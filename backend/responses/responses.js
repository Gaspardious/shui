export const sendResponse = (data, message = {}) => {
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({...message, data}),
    };
};

export const sendError = (statusCode, error) => {
    return {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ error }),
    };
};