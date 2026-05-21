import pool from '../db/connection.js';

/** 전체 상품 조회 - pid를 id로 alias (프론트 호환) */
export const getAll = async () => {
    const sql = `
        SELECT  pid      AS id,
                name     AS title,
                price,
                category,
                CONCAT('/img/', imgurl) AS imgurl,
                icon
        FROM product
        ORDER BY pid
    `;
    const [results] = await pool.execute(sql);
    return results;
};

/** 상품 상세 조회 */
export const getProduct = async (pid) => {
    const sql = `
        SELECT  pid      AS id,
                name     AS title,
                price,
                category,
                edate,
                smethod,
                CONCAT('/img/', imgurl) AS imgurl,
                icon
        FROM product
        WHERE pid = ?
    `;
    const [result] = await pool.execute(sql, [pid]);
    return result[0];
};

/** 상품 QnA 조회 */
export const getQna = async (pid) => {
    const sql = `
        SELECT  qid,
                title,
                content,
                is_complete AS isComplete,
                is_lock     AS isLock,
                uid,
                pid,
                cdate
        FROM product_qna
        WHERE pid = ?
        ORDER BY cdate DESC
    `;
    const [results] = await pool.execute(sql, [pid]);
    return results;
};
