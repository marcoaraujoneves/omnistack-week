/**
 * This script it's the controller that stores the dev's info in the database in the first
 * access, and, if there is a user with the given username, it returns the dev's info.
 * There is also a function for return a list of users, excepting the user with the _id passed
 * in the request header    
 */

const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async index(req, res) {

        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);
        // (MongoDB) $ne: not equal ; $nin: not in ; $and: perform a AND logical operation between the expressions
        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: loggedDev.likes } },
                { _id: { $nin: loggedDev.dislikes } }
            ]
        });

        return res.json(users);
    },

    async store(req, res) {

        const { username } = req.body;

        const userExists = await Dev.findOne({ user: username });

        if (userExists) {
            return res.json(userExists);
        }
        //HTTP GET request for the Github public API to get the dev's info
        const response = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio, avatar_url: avatar } = response.data;
        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        });

        return res.json(dev);
    }
};