require("dotenv").config();
const dbserver = process.env.DB_SERVER || "localhost";
const dbport = process.env.DB_PORT || "27017";
const connectionString = `mongodb://${dbserver}:${dbport}`;
const dbname = "hiring";

const sender_host = process.env.SENDER_HOST;
const sender_port = process.env.SENDER_PORT;
const sender_address = process.env.SENDER_ADDRESS;
const sender_name = process.env.SENDER_NAME;
const sender_password = process.env.SENDER_PASSWORD;

module.exports = {
    connectionString,
    dbname,
    sender_host,
    sender_port,
    sender_name,
    sender_address,
    sender_password
}