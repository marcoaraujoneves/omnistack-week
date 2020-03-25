const User = require('../models/User');
const Spot = require('../models/Spot');

module.exports = {

    async index(request, response) {
        const { technology } = request.query;

        const spots = await Spot.find({ technologies : technology });

        return response.json(spots);
    },

    async store(request, response) {
        const { filename } = request.file;
        const { company, price, technologies } = request.body;
        const { user_id } = request.headers;

        const user = await User.findById(user_id);

        if(!user) {
            return response.status(400).json({ error : 'User does not exists!'});
        }

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            price,
            technologies: technologies.split(',').map(tech => tech.trim()),
        });


        return response.json(spot);
    }
}