# OPS - 베이커리 쇼핑몰

상품 탐색부터 장바구니, 찜, 리뷰와 결제까지 구현한 4인 팀 쇼핑몰 프로젝트입니다. React 화면과 Express API를 연결하고 MySQL 관계형 데이터베이스로 회원·상품·활동 데이터를 관리합니다.

## 프로젝트 정보

- 기간: 2026.05.11 - 2026.05.26
- 형태: 4인 팀 프로젝트
- 담당: 백엔드 개발, 회원·상품·장바구니·찜·리뷰 중심의 DB 테이블 생성

## 주요 기능

- 회원가입, 로그인과 JWT 인증
- 상품 목록·상세 조회와 관리자 상품 관리
- 장바구니 수량 관리와 찜 목록
- 상품 리뷰와 커뮤니티
- KakaoPay 결제 연동

## 데이터베이스 설계

- `user.id`에 UNIQUE 제약조건을 적용해 로그인 ID 중복 방지
- `wishlist (uid, pid)`에 UNIQUE 제약조건을 적용해 같은 상품의 중복 찜 방지
- 장바구니·찜·리뷰에서 회원과 상품을 외래키로 연결
- 장바구니와 상품 테이블을 JOIN해 상품명·가격·수량을 함께 조회

```text
user 1 ── N cart N ── 1 product
user 1 ── N wishlist N ── 1 product
user 1 ── N review N ── 1 product
```

## 기술 스택

| 구분 | 기술 |
|---|---|
| Front | React 18, Vite, Redux Toolkit, Axios |
| Back | Node.js, Express, JWT |
| DB | MySQL, mysql2, AWS RDS |
| Payment | KakaoPay API |
| Tool | Git, GitHub, VS Code, MySQL Workbench |

## 프로젝트 구조

```text
front/               React 사용자 화면
server/routes/       API 경로
server/controller/   요청 처리
server/repository/   SQL 조회와 데이터 접근
server/db/           MySQL 연결
server/ops_dump.sql  테이블 구조와 초기 데이터
```

## 실행 방법

### Backend

```bash
cd server
npm install
npm start
```

### Frontend

```bash
cd front
npm install
npm run dev
```

서버 실행 전 프로젝트 환경에 맞는 `.env` 파일을 별도로 생성합니다.

```env
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=ops
DB_PORT=3306
SERVER_PORT=9000
JWT_SECRET=replace_with_a_random_secret
```

> 실제 데이터베이스 비밀번호, JWT Secret과 결제 API 키는 Git에 커밋하지 않습니다.
