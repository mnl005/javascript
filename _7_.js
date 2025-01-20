import XMLHttpRequest from "xhr2";

// 자바스크립트 엔진은 싱글 스레드로 동작하고 setTimeout,setInterval 함수는 비동기 처리 방식으로 동작한다

// setTimeout - 두번째 인수로 전달받은 시간으로 단 한번 동작하는 타이머 생성, 타이머 만료시 첫번째 인수로 전달받은 콜백함수 실행

// 1초뒤 콜백함수에 매개변수 전달하고 실행
let time_id = setTimeout((x) => console.log(x), 1, "text..") ;
// 호출 스케줄링 취소
clearTimeout(time_id);

// 디바운스 - 짧은시간내 이벤트 연속 발생시 이벤트 호출 막다가 일정 시간 경과 후 한번만 호출되도록
// 쓰로틀 - 짧은시간내 이벤트 연속 발생시 일정 시간 간격으로 최대 한번만 호출, 이벤트를 그룹화해서 일정 시간 단위로 이벤트 핸들러가 호출되도록

// 자바스크립트 엔진은 단 하나의 실행 컨텍스트를 갖는다
// 자바스크립트 엔진은 한번에 하나의 테스크만 실행할 수 있는 싱글 스레드 방식으로 동작한다
// ... 처리에 시간이 걸리는 테스크를 실행하는 경우 블로킹(작업중단) 이 발생

// 동기처리 - sleep 함수가 종료될 때까지 다음 태스크를 블로킹
function sleep1(func, delay) {
  const delayUnit = Date.now() + delay;
  while (Date.now() < delayUnit);
  func();
}
let f1 = () => console.log("f1");
let f2 = () => console.log("f2");
sleep1(f1, 1000);
f2();

// 비동기 처리 - 실행중인 태스크가 종료되지 않아도 다음 태스크를 바로 실행
// f4는 항상 f3보다 우선 실행된다(f3는 비동기로 싫행되어 테스크 큐에 대기함으로)
let f3 = () => console.log("------f3");
let f4 = () => console.log("f4------");
setTimeout(f3, 0);
f4();
setTimeout(f3, 0);

// 콜스택 - 소스코드 평가 과정에서 생성된 실행 컨텍스트가 추가되고 제거되는 스택 자료구조인 실행 컨택스트 스택
// ... 함수 호출시 실행 컨텍스트가 순차적으로 콜스택에 푸시되어 순차적으로 실행

// 힙 - 객체가 저장되는 메모리 공간, 콜스택의 요소인 실행 컨텍스트는 힙에 저장된 객체를 참조
// ... 객체가 저장되는 힙 메모리 공간은 구조화 되어있지 않다

// 자바스크립트 엔진은 테스크 요청시 콜스택 통해 요청된 작업을 순차적 실행
// 브라우저 또는 node.js는 소스코드의 평가와 실행 제외한 나머지를 담당
// ... 비동기 설정과 콜백 함수 등록도 브라우저나 node.js가 담당

// 태스크 큐 - setTimeout, setInterval 등의 비동기 함수의 콜백 함수 또는 이벤트 핸들러가 일시적으로 보관되는 영역
// 이벤트 루프 - 콜스택이 비어 있고 태스크 큐에 대기중인 함수가 존재한다면 이벤트 루프는 순차적으로 태스크 큐에 대기중인 함수를 콜스택으로 이동
// ... 따라서 비동기 함수는 전역 코드 및 명시적으로 호출된 함수가 모두 종료되야 콜스택에 푸시되어 실행된다

// setTimeout과 같은 비동기 함수는 호출시 자바스크립트 엔진의 콜스택에 푸시되어 실행
// ... 타이머 설정과 setTimeout의 만료시 콜백 함수를 태스크큐에 등록하는 처리는 브라우저가 한다
// ... 브라우저는 멀티 스레드로 동작하며 자바스크립트 엔진과 협력해 비동기 함수를 실행

// Ajax - 자바스크립트 사용해 브라우저가 서버에게 비동기 방식으로 데이터를 요청하고 서버가 응답한 데이터를 수신해 웹페이지를 동적으로 갱신하는 프로그래밍 방식
// 아작스 장점 - 변경할 부분을 갱신하는데 필요한 데이터만 전송받는다, 변경 불필요한 부분은 다시 렌더링 하지 않는다, 서버에게 요청보낸 이후 블로킹 발생 않는다

// JSON - 클라이언트와 서버간 http 통신 위한 텍스트 데이터 포맷
// JSON.stringigy - 직렬화
// JSON.parse - 역질렬화
let ob1 = {
  name: "qwer",
  age: 20,
  other: [null, undefined, false, 1, "text"],
  oo: function () {
    console.log("asdfasdf");
  }, // 사라짐
};

let json1 = JSON.stringify(ob1, null, 2);
console.log(json1, "\n", JSON.parse(json1));

// XMLHttRequest - http 요청 전송과 응답 수신을 위한 메서드와 프로퍼티 제공
// 요청 메서드 구분 - GET, POST, PUT, PATCH, DELETE
// ... GET 방식은 데이터를 url의 일부인 쿼리 문자열로 서버에 전송
// ... POST 방식은 데이터(페이로드)를 몸체에 담아 전송
// xhr.readyState - 0(객체생성직후), 1(open 호출 후), 2(send()후응답헤더수신시),3(응답 본문을 수신중), 4(요청완료)
let m1 = (method, url, data, stop = false) => {
  return new Promise((resolve, reject) => {
    // XMLRequest 객체 생성
    const xhr = new XMLHttpRequest();

    // 상태변화 추적
    xhr.onreadystatechange = function () {
      switch (xhr.readyState) {
        case 0: // UNSENT
          break;
        case 1: // OPENED
          break;
        case 2: // HEADERS_RECEIVED
          break;
        case 3: // LOADING
          break;
        case 4: // DONE
          console
            .log
            // 'xhr.response : ', xhr.response,
            // '\n',
            // 'xhr.responseText', xhr.responseText,
            // '\n',
            // 'xhr.statusText : ', xhr.statusText,
            // '\n',
            // 'xhr.status : ', xhr.status,
            // '\n',
            // 'xhr.responseType : ', xhr.responseType,
            ();

          // 요청 완료 시 처리
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.response); // 성공적으로 완료되었을 때 응답 반환
          } else {
            reject(new Error(`HTTP Error: ${xhr.status} ${xhr.statusText}`));
          }
          break;
      }
    };

    // 응답 받기 시작
    xhr.onloadstart = function () {
      console.log("응답 받기 시작");
    };

    // 요청 완료 시
    xhr.onloadend = function () {
      console.log("아무튼 완료");
    };

    // 진행 상황 이벤트
    xhr.onprogress = function (event) {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        // console.log(`다운로드 진행: ${percentComplete.toFixed(2)}%`);

        if (percentComplete > 50 && stop) {
          xhr.abort();
        }
      }
    };

    // 에러 발생 시
    xhr.onerror = function () {
      reject(new Error("요청 중 에러 발생"));
    };

    // 요청 중단 시
    xhr.onabort = function () {
      reject(new Error("요청이 중단되었습니다."));
    };

    // 시간 초과 시
    xhr.timeout = 4000;
    xhr.ontimeout = function () {
      reject(new Error("지정된 시간 초과"));
    };

    // 요청 초기화
    xhr.open(method, url, true);

    // 요청 헤더 설정
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("accept", "application/json");

    // 응답 타입 설정
    xhr.responseType = "json";

    // 요청 전송
    xhr.send(JSON.stringify(data));
  });
};

m1("POST", "http://localhost:3000/api/data", { a: 1123 });

// REST - HTTP 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍처
// REST API - REST를 기반으로 서비스를 구현한 API
// REST API 구성 - 자원(URI - 엔드포인트), 행위(HTTP 요청 메서드), 표현(폐이로드 - 자원에 대한 행위의 구체적 내용)
// REST API 설계원칙 - URI는 리소스를 표현하는데 집중, 행위에 대한 정의는 HTTP요청 메서드를 통해 한다

// GET - 모든/특정 리로스 취득 - 페이로드 없음
// POST - 리소스 생성 - 페이로드 있음
// PUT - 리소스의 전체 교체 - 페이로드 있음
// PATCH - 리소스의 일부 수정 - 페이로드 있음
// DELETE - 모든/특정 리소스 삭제

// 비동기 함수를 호출하면 함수 내부의 비동기로 동작하는 코드가 완료되지 않아도 기다리지 않고 즉시 종료됨
// ... 비동기 함수 내부의 비동기 동작 코드는 비동기 함수가 완료된 이후에 완료된다
// ... 따라서 비동기 함수 내부의 결과를 외부로 반환하거나 상위 스코프의 변수에 할당시 기대한 대로 동작하지 않는다
// ... 비동기 처리 결과를 받기 위해서 콜백 함수로 처리 결과를 처리하면 복잡도가 높아진다
// ... 비동기 함수의 에러 처리시 곤란
let xxx1;
xxx1 = m1("POST", "http://localhost:3000/api/data", { a: 1123 });
let xxx2 = m1("POST", "http://localhost:3000/api/data", { a: 1123 });
console.log("xxx1 : ", xxx1); // undefined
console.log("xxx2 : ", xxx2); // undefined

// Promise 생성자 함수는 new 연산자와 함께 호출 시 프로미스 객체를 생성
// Promise 생성자 함수는 비동기 처리를 수행할 콜백 함수를 인수로 전달받는다(resolbe, reject)
// ... 프로미스 생성자 함수가 인수로 전달받은 콜백 함수 내부에서 비동기 처리를 수행
// ... 비동기 처리가 성공하면 resolve 함수를 호출
// ... 비동기 처리가 실패시 reject 함수를 호출
const promise1 = new Promise((resolve, reject) => {
  resolve("asdf");
});
promise1.then((x) => console.log(x));

m1("POST", "http://localhost:3000/api/data", { a: 1123 })
  .then((x) => {
    console.log("응답 성공:", x);
  })
  .catch((error) => {
    console.error("응답 실패:", error);
  });

new Promise((resolve) => resolve("리졸브")).then((x) => console.log(x));

// pending - 비동기 처리가 수행되지 않은 프로미스가 생성된 직후의 상태
// fulfilled - 비동기 처리가 수행된 상태, resolve 함수 호출시
// reject - 비동기 처리가 수행된 상태, reject 함수 호출시
// 사용이유 - 콜백함수의 구조적 개선, 상태관리, 에러 전파 및 처리, 복수의 작업 병렬처리 또는 경쟁
// 프로미스의 모든 콜백 함수는 프로미스 객체를 반환
// 콜백함수 내에서 프로미스 객체의 상태 변화시 다음 콜백 함수로 새로운 프로미스 객체 반환
Promise.allSettled([
  m1("POST", "http://localhost:3000/api/data", { a: 111 }),
  m1("POST", "http://localhost:3000/api/data", { a: 222 }),
  m1("POST", "http://localhost:3000/api/data", { a: 333 }),
])
  .then(console.log)
  .finally(() => {
    console.log("완료");
  });

// 이미 해결된 값을 사용하는경우, new키워드로 프로미스 객체 생성해 비동기 작업을 정의하는경우
let p1 = Promise.resolve([1, 2, 3]);
let p2 = new Promise((resolve) => resolve([1, 2, 3]));
p1.then(console.log);
p2.then(console.log);

// 이미 해결된 값을 사용하는경우, new키워드로 프로미스 객체 생성해 비동기 작업을 정의하는경우
let p3 = Promise.resolve([1, 2, 3]);
let p4 = new Promise((_, reject) => reject(new Error("erroror")));
p3.catch(console.log);
p4.catch(console.log);

// 순차적 처리
let p5 = () => new Promise((resolve) => setTimeout(() => resolve(1), 300));
let p6 = () => new Promise((resolve) => setTimeout(() => resolve(2), 200));
let p7 = () => new Promise((resolve) => setTimeout(() => resolve(3), 500));

let res1 = [];
p5()
  .then((x) => {
    res1.push(x);
    return p6();
  })
  .then((x) => {
    res1.push(x);
    return p7();
  })
  .then((x) => {
    res1.push(x);
  })
  .finally(() => console.log("총1초가 소요", res1));

// 병렬 처리
Promise.all([p5(), p6(), p7()])
  .then((x) => {
    res1.push(...x);
  })
  .finally((x) => console.log("총 500ms 가 소요", res1));

// 경쟁- 먼저 처리된거 우선
Promise.race([
  new Promise((resolve) => setTimeout(() => resolve(1111), 100)),
  new Promise((resolve) => setTimeout(() => resolve(2222), 200)),
  new Promise((resolve) => setTimeout(() => resolve(3333), 300)),
]).then(console.log); // 1111

// 콜스택 -> 테스크큐 -> 마이크로테스크큐
// 마이크로태스크큐 - 프로미스의 후속 처리 메서드의 콜백 함수는 마이크로테스크큐에 저장
// ... 테스크큐인 setTimeout은 프로미스의 후속 처리 메소드인 마이크로테스크큐보다 우선 실행

// fetch - XMLHttpRequest 객체와 마찬가지로 요청 전송 기능을 제공하는 클라이언트 사이드 웹 api
// ... HTTP 응답을 나타내는 Response 객체를 래핑한 프로미스 객체를 반환
// ... 함수가 반환한 프로미스는 오프라인 등의 네트워크 장애나 CORS 에러에 의해 요청이 완료되지 못한 경우에만 reject 한다
// ... 따라서 status 상태 코드로 에러를 처리 해야 함
let a = fetch("http://localhost:3000/api/data", {
  method: "POST",
  headers: { "content-Type": "application/json" },
  body: JSON.stringify({ id: 12341234 }),
})
  .then(console.log)
  .then((x) => console.log("fetch x : ", x))
  .catch((e) => console.log("fetch error : ", e));

// async/await - 비동기 코드를 동기 코드처럼
// ... async 키워드는 반드시 async 함수 내부에서 사용해야 한다
// ... async 함수가 return resolve() 하지 않더라도 return res 하면 resolve() 가 반환된다
// ... await 키워드는 프로미스가 settled 상태가 될때까지 대기하다가 settled 상태가 되면 프로미스가 resolve 한 처리결과를 반환
// res.json 하면 바디만 남는다
// async 함수 내에서 catch 미사용시 에러를 reject 하는 프로미스를 반환
let asyncFunction = async () => {
  let res = await fetch("http://localhost:3000/api/data");
  return {
    status: res.status,
    headers: res.headers,
    body: res.json(),
  };
};
asyncFunction().then((x) => {
  console.log("xxx : ", x);
});

// try-catch - 애러가 발생해도 코드가 계속해서 실행되도록
// Error - 일반적인 애러 객체
// SyntaxError - 자바스크립트 문법에 맞지 않는 문을 해석시 발생하는 에러 객체
// ReferenceError - 참조할 수 없는 식별자를 참조시
// TypeError - 피연산자 또는 인수의 데이터 타입이 유효하지 않을 때 발생하는 에러 객체
// RangeError - 숫자값의 허용 범위를 벗어났을 때 발생하는 에러객체
// URIError - encodeURI 또는 decodeURI 함수에 부적절한 인수를 전달시 발생하는 에러객체
// EvalError - eval 함수에서 발생하는 에러 객체
// throw - 애러 생성자 함수는 일반 생성자 함수와는 다르게 에러를 던져야 catch 코드 블록이 실행
// ... 던진 에러를 캐치하지 않으면 호출자 방향으로 전파된다
try {
  throw Error();
} catch (e) {
  console.log(e);
} finally {
  console.log("end...");
}

// 모듈 - 애플리케이션을 구성하는 개별적 요소로서 재사용 가능한 코드 조각
// ... 모듈이 성립되려면 자신만의 파일스코프(모듈스코프)를 가져야 한다
// ... 자신만의 파일 스코프를 가지는 모듈 자산은 기본적으로 비공개 상태이고 애플리케이션과 분리되어 존재
// ... 자바스크립트를 여러개의 파일로 분리하여 script 태그로 로드해도 분리된 로드파일은 하나의 전역을 공유
// ES6 모듈 -  -scritp 태그에 type="module" 어트리뷰트를 추가해서 로드된 파일은 모듈로서 동작, 파일 확장자는 .mjs 사용을 권장
// ... 모듈 스코프 내에서 선언한 변수는 해당 모듈 내에서만 접근 가능

// export - 모듈은 공개가 필요한 자산에 한정하여 명시적으로 선택적 공개
// ... export 키워드는 선언문 앞에 사용하며 변수,함수,클래스 등 모든 식별자에 적용 가능
// export const name = 'qwer';
// export function fun1(){return null;}
// 또는
// export {name, fun1};
// 또는
// export default name = 'qwer'; // default 키워드 사용한 경우 var,let,const 사용 불가, default 사용시 한 모듈당 하나만 사용가능

// import - 모듈 사용자는 모듈이 공개한 자산 중 일부 또는 전체를 선택해 자신의 스코프 내로 불러들여 재사용
// import {name, fun1} from './module.mjss/';
// 또는
// import * as lib from './module1.mjs';
// 또는
// import {name as Name, fun1 as m1} from './module1.mjs';
