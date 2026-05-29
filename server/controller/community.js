import * as repository from "../repository/community.js"

export const noticeAll = async (req,res,next) => {
    try{
    const {tab} = req.query

    const items = await repository.noticeAll(tab)
    res.json(items)
    } catch (error) {
        console.log(error);
    }
}

export const eventAll = async (req,res,next) => {
    try {
        const items = await repository.eventAll();

        res.json(items)
    } catch (error) {
        console.log(error);
    }
}