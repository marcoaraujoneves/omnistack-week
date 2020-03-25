const crypto = require("crypto");
const connection = require("../database/connection");

module.exports = {
    async index(request, response) {
        const ngos = await connection("ngo").select("*");

        return response.json(ngos);
    },

    async store(request, response) {
        const { name, email, whatsapp, city, fu } = request.body;

        const id = crypto.randomBytes(4).toString("HEX");

        await connection("ngo").insert({
            id,
            name,
            email,
            whatsapp,
            city,
            fu
        })

        return response.json({ id });
    }
};
