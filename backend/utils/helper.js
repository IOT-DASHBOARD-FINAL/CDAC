const formatResponse = (status, message, data = null) => {
    return {
        status,
        message,
        data,
    };
};

const handleError = (res, error) => {
    console.error(error);
    return res.status(500).json(formatResponse('error', 'Internal Server Error'));
};

module.exports = {
    formatResponse,
    handleError,
};