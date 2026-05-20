# ops
팀 프로젝트


## 2026-05-20
# server 폴더 생성, 각종 모듈 다운, 초기 환경 설정, 회원가입(users) 테이블 생성
1) app.js 추가
    -> 포트 변수명 : PORT
    -> .env 파일 포트 설정시 변수명 PORT로 설정

2) .gitignore추가
    -> git clone 할 때 마다 .env 파일 추가, npm install 하기

3) routes, controller, repository 폴더 생성

4) db 폴더 생성 -> connection.js 파일 생성
    -> db 명 ops

5) 회원가입(users) 테이블 생성
    -> front에서 겹치는 부분 일부 삭제 예정(회원가입 페이지 하단 지역 삭제 예정)