import bcrypt from 'bcryptjs';
import jwt    from 'jsonwebtoken';
import * as repository from '../repository/auth.js';

/** 회원가입 */
export const join = async (req, res, next) => {
    try {
        const { id, pwd, name, phone, email } = req.body;

        // 필수값 검사
        if (!id || !pwd || !name) {
            return res.status(400).json({ message: '필수 항목을 입력해주세요.' });
        }

        // 아이디 중복 검사
        const existing = await repository.findById(id);
        if (existing) {
            return res.status(409).json({ message: '이미 사용 중인 아이디입니다.' });
        }

        // 비밀번호 암호화
        const hashedPwd = await bcrypt.hash(pwd, 10);

        await repository.createUser({ id, pwd: hashedPwd, name, phone, email });
        res.status(201).json({ message: '회원가입이 완료되었습니다.' });
    } catch (err) {
        next(err);
    }
};

/** 로그인 */
export const login = async (req, res, next) => {
    try {
        const { id, pwd } = req.body;

        if (!id || !pwd) {
            return res.status(400).json({ message: '아이디와 비밀번호를 입력해주세요.' });
        }

        // 사용자 조회
        const user = await repository.findById(id);
        if (!user) {
            return res.status(401).json({ message: '아이디 또는 비밀번호가 올바르지 않습니다.' });
        }

        // 비밀번호 검증
        const isMatch = await bcrypt.compare(pwd, user.pwd);
        if (!isMatch) {
            return res.status(401).json({ message: '아이디 또는 비밀번호가 올바르지 않습니다.' });
        }

        // JWT 발급
        const accessToken = jwt.sign(
            { uid: user.uid, id: user.id, role: 'ROLE_USER' },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({
            message: '로그인 성공',
            accessToken,
            userId: user.id,
            role: 'ROLE_USER',
        });
    } catch (err) {
        next(err);
    }
};

/** 로그아웃 (클라이언트에서 토큰 삭제) */
export const logout = (req, res) => {
    res.json({ message: '로그아웃 되었습니다.' });
};
