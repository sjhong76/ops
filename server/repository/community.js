import pool from '../db/connection.js';

export const eventAll = async () => {
    const sql = `select * from community_event order by id;`
    const [result] = await pool.execute(sql, []) // sql에 ?가 없으면 [] 생략 가능
    return result;
}

export const noticeAll = async (tabType) => {
    let sql = `select * from community_notice`
    const params = []

    if (tabType && tabType !== "전체") {
        sql += ` where type = ?`
        params.push(tabType)
    }

    sql += ` order by id desc`

    const [result] = await pool.execute(sql, params)
    return result
}