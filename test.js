// 자바스크립트 메모리 구조
// 스택 - 함수호출,지역변수,원시값 저장 - 숫자,불리언,지역변수
// 힙 - 객체,배열,함수 등 동적 데이터 저장 - 객체,배열,클로저
// 콜스택 - 함수 호출과 실행 순서 관리 - 현재 실행중인 함수
// 큐 - 비동기 작업(setTimeout,I/O 콮백) 관리 - 이벤트 루프레서 처리될 태스크
// 마이크로테스크큐 - Promise.then, async/await 후속 작업 관리 - Promise 콜백
// 코드 영역 - 실행할 자바스크립트 코드 저장 - 소스코드
// 글로벌 변수 저장 영역 - 전역 변수 및 함수 저장 - 전역 변수

// res - 전체 메모리 사용량
// heepTotal - 힙 메모리에 할당된 총 메모리
// heepUsed 실제 사용중인 힙 메모리
// external - 힙 메모리 외부에서 사용중인 메모리 (버퍼 등)
// 해당 코드로 원시값도 힙 영역에 저장됨을 알 수 있다
console.log(process.memoryUsage());
let heep1 = process.memoryUsage().heapUsed / 1024 / 1024;
// const bigString1 = 'x'.repeat(10 * 1024 * 1024);
// console.log(bigString1);
let heep2 = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(heep2 - heep1);
console.log(process.memoryUsage());



