const express = require('express');
const app = express();

// 포트 번호 설정
const PORT = 3000;
app.use(express.json());

let i = 0;
app.all('/api/data', (req, res) => {
    // 요청 정보 로그
    // console.log('HTTP 메서드:', req.method); 
    // console.log('요청 URL:', req.url); 
    // console.log('쿼리 문자열:', req.query);
    // console.log('요청 헤더:', req.headers); 
    console.log('요청 바디:', req.body); 
    // console.log('클라이언트 IP:', req.ip); 
    console.log('요청 총 횟수 : ', i++); 

    // 응답 데이터
    const jsonData = {
        message: "Hello, World!",
        timestamp: new Date(),
        items: req.body,
    };

    // 응답
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(jsonData);
    console.log('응답 바디 : ', jsonData);
});


// 서버 실행
app.listen(PORT, () => {
    console.log(`JSON 서버가 실행 중입니다. http://localhost:${PORT}/api/data`);
});




























