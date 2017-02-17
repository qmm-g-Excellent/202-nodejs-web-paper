const homeworks = require("./routers/homeworks");
const sections = require("./routers/section");
const papers = require("./routers/paper");

module.exports = function(app) {
    app.use('/homeworks', homeworks);
    app.use('/sections', sections);
    app.use('/papers', papers);

};