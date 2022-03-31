export default class ErrorApp {
    errorHandler(err, req, res, next) {
        res.status(err.statusCode || 500).json({
            success: false,
            msg: err.message,
        });
    }
}
