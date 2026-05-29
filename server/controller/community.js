import * as repository from "../repository/community.js"

export const eventAll = async (req,res,next) => {
    try {
        const items = await repository.eventAll();

        res.json(items)
    } catch (error) {
        console.log(error);
    }
}