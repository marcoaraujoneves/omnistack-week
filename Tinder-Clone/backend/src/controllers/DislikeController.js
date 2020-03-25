/**
 * This script it's the controller that stores the _id's that the logged user dislikes
 */

const Dev = require('../models/Dev');

module.exports = {

    async store(req, res) {

        const { user } = req.headers;
        const { devId } = req.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if (!targetDev) {
            return res.json({ error: "Dev not exists." });
        }

        loggedDev.dislikes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
}