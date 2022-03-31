export default class AsyncHandler {
    request = (fn) => (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
