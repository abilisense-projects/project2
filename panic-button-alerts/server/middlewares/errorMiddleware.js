const errorMiddleware = function (err, req, res, next) {
    const status = err.statusCode || 500;
    const msg = err.message || 'we have got some trouble 😒 ... try later';
    res.status(status)
        .send(`${msg}`)
}
module.exports = errorMiddleware