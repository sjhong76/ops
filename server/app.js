import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 9000;
const app = express();

//미들웨어 -> 공통작업 정의
app.use(cors());
app.use(express.json());


app.listen(PORT, () => {
    console.log(`서버 실행 => ${PORT}`);    
});