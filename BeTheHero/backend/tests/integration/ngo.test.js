const request = require("supertest");
const application = require("../../src/application");
const connection = require("../../src/database/connection");

describe("NGO", () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    test("register a valid NGO works", async () => {
        const response = await request(application)
            .post("/ngo")
            .send({
                name: "TEST",
                email: "test@test.com",
                whatsapp: "00000000000",
                city: "Test",
                fu: "TT"
            });

        expect(response.body).toHaveProperty("id");
        expect(response.body.id).toHaveLength(8);
    });
});
