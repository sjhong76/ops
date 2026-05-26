import express  from 'express';
import cors     from 'cors';
import dotenv   from 'dotenv';

import productsRouter from './routes/products.js';
import authRouter     from './routes/auth.js';
import cartRouter     from './routes/cart.js';
import reviewRouter    from './routes/review.js';
import wishlistRouter  from './routes/wishlist.js';

dotenv.config();

const PORT = process.env.PORT || 9000;
const app  = express();

// ── 미들웨어
app.use(cors());
app.use(express.json());

// ── 라우팅
app.use('/api/products', productsRouter);
app.use('/api/auth',     authRouter);
app.use('/api/cart',     cartRouter);
app.use('/api/reviews',  reviewRouter);
app.use('/api/wishlist', wishlistRouter);

// ── 서버 시작
app.listen(PORT, () => {
    console.log(`✅ OPS 서버 실행 => http://localhost:${PORT}`);
});
