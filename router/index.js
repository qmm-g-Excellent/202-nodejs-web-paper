const homeworks = require("./routers/homeworks");
const sections = require("./routers/section");

module.exports = function(app) {
    app.use('/homeworks', homeworks);
    app.use('/sections', sections);

};