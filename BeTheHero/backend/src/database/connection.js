const knex = require("knex");
const knexfile = require("../../knexfile");

const configuration = process.env.NODE_ENV === "test" ? knexfile.test : knexfile.development;

const connection = knex(configuration);

module.exports = connection;
