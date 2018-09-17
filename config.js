exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://admin:admin123@ds157742.mlab.com:57742/recipe-book-node-fullstack-node';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://admin:admin123@ds157742.mlab.com:57742/recipe-book-node-fullstack-node';
exports.PORT = process.env.PORT || 8080;
