require('dotenv').config();

module.exports = {
    development: {
        username: process.env.COFFEESHOP_DB_USERNAME,
        password: process.env.COFFEESHOP_DB_PASSWORD,
        database: process.env.COFFEESHOP_DB_NAME,
        host: process.env.COFFEESHOP_DB_HOST,
        dialect: process.env.COFFEESHOP_DB_DIALECT,
    },
};
