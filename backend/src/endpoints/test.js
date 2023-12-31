import Test from "#models/Test.js";

export default {
    method: "get",
    handler: async (_, res) => {
        const randomName = Math.random().toString(36).substring(7);

        await new Test({
            name: randomName
        }).save();

        res.status(200).json({
            message: `Successfully created test document with name ${randomName}.`
        });
    }
}