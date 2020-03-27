const generateUniqueID = require("../../src/utils/generateUniqueID");

describe('Generate unique ID', () => {
    test('it generates an unique ID', () => {
        const id = generateUniqueID();

        expect(id).toHaveLength(8);
    })
})
