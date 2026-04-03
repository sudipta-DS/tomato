import log from "../utils/logger.js";
const tryCatch = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        }
        catch (error) {
            log.error("User Login failed : " + error.stack);
            res.status(500).json({ message: error.message });
        }
    };
};
export default tryCatch;
