-- OPS Bakery Database
CREATE DATABASE IF NOT EXISTS ops DEFAULT CHARACTER SET utf8mb4;
USE ops;

-- ── 상품 테이블
CREATE TABLE IF NOT EXISTS product (
    pid      INT          PRIMARY KEY AUTO_INCREMENT,
    name     VARCHAR(100) NOT NULL,
    price    INT          NOT NULL,
    category VARCHAR(50),
    edate    VARCHAR(100),
    smethod  VARCHAR(200),
    imgurl   VARCHAR(200),
    icon     VARCHAR(200)
);

-- ── 상품 QnA 테이블
CREATE TABLE IF NOT EXISTS product_qna (
    qid         INT          PRIMARY KEY AUTO_INCREMENT,
    pid         INT          NOT NULL,
    uid         INT,
    title       VARCHAR(200),
    content     TEXT,
    is_complete TINYINT(1)   DEFAULT 0,
    is_lock     TINYINT(1)   DEFAULT 0,
    cdate       DATETIME     DEFAULT NOW(),
    FOREIGN KEY (pid) REFERENCES product(pid)
);

-- ── 회원 테이블
CREATE TABLE IF NOT EXISTS user (
    uid        INT          PRIMARY KEY AUTO_INCREMENT,
    id         VARCHAR(50)  NOT NULL UNIQUE,
    pwd        VARCHAR(200) NOT NULL,
    name       VARCHAR(50)  NOT NULL,
    phone      VARCHAR(20),
    email      VARCHAR(100),
    created_at DATETIME     DEFAULT NOW()
);

-- ── 장바구니 테이블
CREATE TABLE IF NOT EXISTS cart (
    cid   INT PRIMARY KEY AUTO_INCREMENT,
    uid   INT NOT NULL,
    pid   INT NOT NULL,
    count INT NOT NULL DEFAULT 1,
    FOREIGN KEY (uid) REFERENCES user(uid) ON DELETE CASCADE,
    FOREIGN KEY (pid) REFERENCES product(pid)
);

-- ── 상품 초기 데이터 (products.js 기준)
INSERT INTO product (name, price, category, edate, smethod, imgurl, icon) VALUES
('갸또 쇼콜라',                '38000', '케이크', '제조일로부터 5일',          '냉장보관',                                            'product1.jpg',  ''),
('쉭쎄',                      '29000', '케이크', '제조일로부터 8일',          '냉장보관',                                            'product2.jpg',  ''),
('초코 구운과자 묶음 (4+1)',    '9200',  '초콜렛', '별도 표기일까지',           '직사광선을 피하고 서늘한 곳 보관',                    'product3.jpg',  'newicon.gif'),
('통팥앙금빵(6EA)',             '13000', '빵',    '별도 표기일까지',           '직사광선을 피하고 서늘한 곳 보관 (하절기 냉장보관)',   'product4.jpg',  ''),
('당근케익',                   '5500',  '케이크', '제조일로부터 5일까지',      '직사광선을 피하고 서늘한 곳 보관 (개봉 후 냉장보관)', 'product5.jpg',  'newicon.gif'),
('애플파이',                   '18000', '빵',    '제조일로부터 5일까지',      '직사광선을 피하고 서늘한 곳 보관 (개봉 후 냉장보관)', 'product6.jpg',  ''),
('카스텔라',                   '18000', '빵',    '제조일로부터 10일까지',     '직사광선을 피하고 서늘한 곳 보관 (하절기 냉장보관)',   'product7.jpg',  ''),
('밤만주 세트',                '17000', '빵',    '제조일로부터 10일까지',     '직사광선을 피하고 서늘한 곳 보관 (하절기 냉장보관)',   'product8.jpg',  ''),
('파인치즈 케익',              '37000', '케이크', '제조일로부터 7일',          '냉장보관',                                            'product9.jpg',  'newicon.gif'),
('다쿠와즈(6EA)',               '14800', '빵',    '제조일로부터 25일',         '직사광선을 피하고 서늘한 곳 보관 (하절기 냉장보관)',   'product10.jpg', 'newicon.gif'),
('브라우니(8EA)',               '18600', '빵',    '제조일로부터 25일',         '직사광선을 피하고 서늘한 곳 보관 (하절기 냉장보관)',   'product11.jpg', 'newicon.gif'),
('아몬드 쇼꼴라 2종',          '6500',  '초콜렛', '제조일로부터 2개월까지',    '직사광선을 피하고 서늘한 곳 보관 (개봉 후 냉장보관)', 'product12.jpg', 'newicon.gif'),
('후랑보아즈',                 '35000', '케이크', '제조일로부터 5일',          '냉장보관',                                            'product13.jpg', 'newicon.gif'),
('스위스롤 & 말차롤케익 [반피스 2종]', '16000', '빵', '제조일로부터 20일',   '직사광선을 피하고 서늘한 곳 보관 (하절기 냉장보관)',   'product14.jpg', 'newicon.gif'),
('따블렛',                     '12000', '초콜렛', '제조일로부터 6개월까지',    '개봉 후 냉장보관',                                    'product15.jpg', 'newicon.gif'),
('바따르',                     '4200',  '빵',    '제조일로부터 5일',          '직사광선을 피하고 서늘한 곳 보관(개봉 후 냉장보관)',   'product16.jpg', 'newicon.gif'),
('뺑 드 세글',                 '8000',  '빵',    '제조일로부터 5일',          '직사광선을 피하고 서늘한 곳 보관(개봉 후 냉장보관)',   'product17.jpg', 'newicon.gif');
