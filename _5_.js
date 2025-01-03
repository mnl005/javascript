console.log('이터러블------------------------------------------------------------');
// 이터러블 프로토콜 - for...of 문으로 순회 가능하고, 스프레드 문법과 배열 디스트럭처링 할당의 대상으로 사용 가능
// 이터레이터 프로토콜 - Symbol.iterator 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다
// 이터러블 - 이터러블 프로토콜을 준수한 객체
// .. 이터레이션 프로토콜은 데이터 소비자와 데이터 공급자를 연결하는 인터페이스 역할
// 배열, 문자열, 맵, 셋 은 이터러블
console.log(Symbol.iterator in []); // true
console.log(Symbol.iterator in {}); // false

// 이터러블의 Symbol.iterator 메서드가 변환한 이터레이터는 next 메서드를 갖는다
// next 메서드 호출시 이터러블을 순차적으로 한 단계씩 순회하며 순회 결과를 나타내는 이터레이터 리절트 객체를 반환
let arr1 = [1, 2, 3];
let iterator1 = arr1[Symbol.iterator]();
console.log('next' in iterator1); // true
console.log(iterator1.next()); //{ value: 1, done: false }
console.log(iterator1.next()); //{ value: 2, done: false }
console.log(iterator1.next()); //{ value: 3, done: false }
console.log(iterator1.next()); // { value: undefined, done: true } - 요소, 순회완료여부

// for...in 문은 객체의 프로퍼티 키가 심벌인 경우와 열거 가능한 경우 순회
for (const item in { '0': 1, '1': 2 }) {
    console.log(item);
}

// for...of 문은 내부적으로 이터레이터의 next 메서드 호출해서 이터러블 순회
for (const item of [1, 2, 3]) {
    console.log(item);
}

// 유사배열객체 - 배열처럼 인덱스로 프로퍼티 값에 접근 가능하고, length 프로퍼티를 갖는 객체
// ... 이터러블이 아닌 일반 객체 임으로 for...of 문으로 순회 불가
let ob1 = {
    0: 1,
    1: 2,
    2: 3,
    length: 3,
}
for (let i = 0; i < ob1.length; i++) {
    console.log(ob1[i]);
}


console.log('스프레드------------------------------------------------------------');
// 스프레드 문법 - 하나로 뭉쳐 있는 여러 값들의 집합을 펼쳐서 개별적인 값들의 목록으로 만든다
// ... 스프레드 문법 사용 가능 대상은 이터러블에 한정
// ... 스프레드 문법의 결과는 값이 아님으로, 스프레드 문법의 결과는 변수에 할당 불가
let arr2 = [1, 2, 3];
let arr3 = [...arr2]; // 배열 복사
console.log(
    arr2 === arr3, // false
    '\n',
    Math.max(...arr2), // 응용
    '\n',
    [...arr2, ...arr2], // concat 대체
    '\n',
    arr2.splice(3, 3, ...arr2), // splice 응용
);

// 객체 리터럴의 스프레드 문법 사용, 여러 객체 병합시 뒤에오는 프로퍼티가 더 높은 우선순위
// 얕은복사
let ob3 = { x: 1, y: 2 };
let ob4 = { ...ob3 };
console.log(ob3 === ob4); // false


console.log('디스트럭처 할당------------------------------------------------------------');
// 디스트럭처 할당 - 구조화된 배열과 같은 이터러블 또는 객체를 비구조화.구조파괴 하여 1개 이상의 변수에 개별적으로 할당하는 것

// 배열 디스트럭처링 예시 - ES5 - 구조화된 배열을 디스트럭처링하여 1개 이상의 변수에 할당
// ... 배열 디스트럭처링 할당의 대상은 이터러블 이어야 함, 할당 기준은 배열의 인덱스
let arr4 = [1, 2, 3];
let value1 = arr4[0];

// 배열 디스트럭처링 예시 - ES6
// ... 인수의 갯수가 불일치해도 에러 미발생
// 기본값보다 할당값이 더 높은 우선순위 가진다
let [v1 = 11, v2, v3, v4] = arr4;
console.log(v1, v2, v3, v4); // 1,2,3

// 객체 디스트럭처링 예시 - ES5
let ob5 = { x: 1, y: 2 };
let ov1 = ob5.x;
let ov2 = ob5.y;

// 객체 디스트럭처링 예시 - ES6
// ... 우변에 객체로 평가 될 수 있는 표현식등 미할당시 에러 발생
let ob6 = { ov3: 1, ov4: 2 };
let { ov3, ov4 } = ob6;
let { q1, q2 } = { q1: 123, q2: 456 };
let { ov3: q3, ov4: q4 } = ob6; // q3와 q4에 ov3와 ov4의 값을 할당
console.log(ov3, ov4, q1, q2, q3, q4); // 1 2 123 456 1 2
let { ov5 = 'qwer', ov6 } = { ov6: '1234' }; // ov5에 기본값 할당
console.log(ov5, ov6); // qwer 1234

// 문자열에서 특정 속성만 추출 - String 래퍼 객체로부터 length 속성을 추출
let strr = 'qwer';
let { length } = strr;
console.log(length); // 4

let arr6 = [
    { ids: 1, text: 'qwer' },
    { ids: 2, text: 'qwer' },
    { ids: 3, text: 'qwer' },
];
let [, { ids }] = arr6; // arr6의 요소중 두번째 요소의 ids 속성을 추출
console.log(ids); // 2

// Rest 프로퍼티
let { xx, ...rest1 } = { xx: 1, yy: 2, zz: 3 };
console.log(xx, rest1); // 1 { yy: 2, zz: 3 }


console.log('Set --------------------------------------------------------------------------------------');
// Set - 중복되지 않는 유일한 값의 집합
// ... 요소의 순서에 의미가 없다, 인덱스로 요소에 접근 불가, 사이즈 프로퍼티로 사이즈 변경 불가
// ... Set 객체는 객체나 배열과 같은 모든 값을 요소로 지정 가능
console.log(
    new Set(), // Set(0) {}
    '\n',
    new Set([1, 2, 3, 3, 4]), // Set(4) { 1, 2, 3, 4 }
    '\n',
    (new Set([1, 2, 3, 4])).size, // 4
    '\n',
);
let set1 = new Set([2, 3, 4, 5]);
set1.add(1).add(NaN).add(NaN).add(-0).add(0); // Set는 NaN을 서로 다르다고 평가
console.log(
    set1,
    '\n',
    set1.has(NaN), // true
    '\n',
    set1.delete(NaN), // true - 삭제 성공시 성공여부 리턴
    '\n',
    set1.clear(), // set 초기화
    '\n',
    set1, // Set(0) {}
);

// Set 요소 순회
let set2 = new Set([1, 2, 3, 4, 5]);
set2.forEach((v1, v2, set2) => console.log(v1, v2, set2)); // Set는 인덱스가 없음으로 v2는 v1과 같다

// Set은 이터러블이며 for...of 문으로 순회 가능하고 스프레드 문법과 디스트럭처링의 대상이 될 수 있다
for (const i of set2) {
    console.log(i);
}
console.log([...set2]);

// Set을 집합처럼 응용
let set3 = new Set([1, 2, 3, 4]);
let set4 = new Set([3, 4, 5, 6]);
console.log(
    [...set3].filter(v => set4.has(v)), // [3,4] Set의 교집합
    '\n',
    new Set([...set3, ...set4]), //  Set(6) { 1, 2, 3, 4, 5, 6 } - Set의 합집합
    '\n',
    [...set3].filter(v => !set4.has(v)), //  [ 1, 2 ] - Set의 차집합
    '\n',
    [...set3].every(v => set4.has(v)), // false - set3는 set4의 부분집합이 아니다
);

// Map 객체는 키와 값의 쌍으로 이루어진 컬랙션
// ... 객체를 포함한 모든 값을 키로 사용 가능, 이터러블, map.size로 요소 갯수 확인
// ... 키가 중복될 경우 덮어 써진다
// ... size 속성으로 Map 객체의 요소 개수 변경 불가
// ... 객체도 키로 사용 가능
let map = new Map([['k1', 'v1'], ['k2', 'v2']]);
console.log(map); // Map(2) { 'k1' => 'v1', 'k2' => 'v2' }
console.log(map.size); // 2 - 요소의 갯수 확인
map.set(0, 'qwer').set({ x: 1 }, 'rewq'); // 요소추가 - 키값에 객체도 가능
console.log(map.get('k1')); // 요소 취득 - 키가 유효하지 않으면 undefined 전달
console.log(map.has('k1')); // true - 요소 존재 여부 확인
map.clear(); // 요소 일괄 삭제

// 요소 순회 - 첫번째 인수는 요소값, 두번째 인수는 요소키, 세번째 인수는 순회 중인 Map 객체 자체
let map1 = new Map([['k1', 'v1'], ['k2', 'v2'], ['k3', 'v3']]);
map1.forEach((v, k, map1) => console.log(v, k, map1));

// Map 객체는 이터러블임으로 for...of 문으로 순회 가능, 스프레드 문법 가능, 배열 디스트럭처링 할당 가능
for (const i of map1) { // for...of 순회
    console.log(i);
}
console.log([...map1]); // 스프레드 문법 적용
let [as1, as2] = map1; // 배열 디스턱처링 할당
console.log(as1, as2);



console.log('브라우저 렌더링 -----------------------------------------------------------------------');
// 파싱 - 프로그래밍 언어의 문법에 맞게 작성된 텍스트 문서를 읽어 들여 실행하기 위해 텍스트 문서의 문자열을 토큰으로 분해하고,
// ... 토큰에 문법적 의미와 구조를 반영하여 트리 구조의 자료구조인 파스트리를 생성하는 일련의 과정
// ... 파싱 완료 후 파스 트리를 기반으로 중간 언어인 바이트코드를 생성하고 실행
// 랜더링 - HTML,CSS,자바스크립트로 작성된 문서를 파싱하여 브라우저에 시각적으로 출력하는 것
// DOM - HTML 문서를 파싱한 결과
// 렌더 트리 - DOM과 CSSDOM의 결합, 렌더 트리는 css 속성이 display:none인 브라우저 화면에 렌더링되지 않는 노드는 포함 안된다
// (html -> dom tree) + (css -> cssdom truee) -> 렌더트리 -> 레이아웃 -> 페인트
// 레이아웃 계산과 패인팅이 재차 실행되는 경우 - 자바스크립트에 의한 노드 추가 또는 삭제, 브라우저 창의 리사이징에 의한 뷰포트 크기변경
// ... html 요소의 레이아웃이 변경될 경우
// ... 레이아웃 계산과 페인팅을 다시 실행하는 리렌더링은 비용이 많이 들며 성능에 악영향을 준다
// DOM API 사용시 이미 생성된 DOM을 동적으로 조작 가능
// 자바스크립트 파싱과 실행은 브라우저 렌더링 엔진이 아닌 자바스크립트 엔진이 처리
// 자바스크립트 엔진은 자바스크립트 코드를 파싱해 저수준 언어로 변환 후 실행
// 모든 자바스크립트 엔진은 ECMAScript 사양을 준수



// ** 파싱 과정 ** - 바이트 -> 문자 -> 토큰 -> 노드 -> DOM
// 1. 브라우저는 렌더링에 필요한 리소스를 요청하고 서버로부터 응답을 받는다
// 2. 브라우저의 렌더링 엔진은 서버로부터 응답된 HTML과 CSS를 파싱하여 DOM과 CSSDOM을 생성하고 이를 결합하여 렌더 트리 생성
// 3. 브라우저의 자바스크립트 엔진은 서버로부터 자바스크립트를 파싱하여 AST를 생성하고 바이트코드로 변환하여 실행,
// ... 이때 자바스크립트는 DOM API를 통해 DOM이나 CSSDOM을 변경할 수 있다. 변경된 DOM과 CSSDOM은 다시 렌더 트리로 결합된다
// 4. 렌더 트리를 기반으로 HTML 요소의 레이아웃을 계산하고 브라우저 화면에 HTML 요소를 페인팅

// 브라우저의 핵심 기능은 필요한 리소스를 서버에 요청하고 서버로부터 응답 받아 브라우저에 시각적으로 렌더링하는 것
// 브라우저의 전송창에 URL 입력하고 엔터키 누르면 URL의 호스트 이름이 DNS를 통해 IP주소로 변환되고 IP 주소를 갖는 서버에 요청을 전송
// ... 일반적으로 서버는 루트 요청에 대해 암묵적으로 index.html을 응답하도록 기본 설정 되어 있음
// ... index.html이 아닌 다른 정적 파일을 서버에 요청시, 다른 정적 파일을 응답
// ... 서버에 동적 데이터도 요청 가능
// ... 브라우저 개발자 도구의 Network 패널에서 응답과 요청 확인 가능
// ... 브라우저가 HTML 파싱하는 과정 중 외부 리소스를 로드하는 태그를 만나면 파싱 일시 중단하고 해당 리소스 파일을 서버로 요청한다
// URI = URL + 쿼리와 프레그먼트
// URL - 프로토콜://호스트명:포트번호/경로
// URN - 호스트:포트번호/경로?쿼리#프레그먼트

// HTTP - 웹에서 브라우저와 서버가 통신하기 위한 프로토콜(규약)
// HTTP 1.1 - 커넥션당 하나의 요청과 응답만 처리, 동시전송이 불가능해 요청할 리소스의 개수에 비례해 응답 시간이 증가
// HTTP 2.0 - 커넥션당 다중 요청과 응답 가능, 1.1과 배교해 50%정도 빠르다

// 자바스크립트 엔진의 동작 순서 - 자바스크립트 해석 -> AST(추상구문트리) -> 바이트코드(인터프리터가 실행 가능 한)
// 토크나이장 - 문자열인 자바스크립트 소스 코드를 어휘 분석해 문법적 의미를 갖는 코드의 최소 단위인 토큰으로 분해
// 파싱 - 토큰들의 집합을 구문분석하여 AST(추상구문트리)를 생성
// ... 추상구문트리는 문법적 의미와 구조를 반영한 트리 구조의 자료구조
// 바이트코드 생성과 실행 - AST가 바이트코드로 변환되면 인터프리터에 의해 실행
// ... V8 엔진은 자주 사용하는 코드를 터보팬이라는 컴파일러에 의해 최적화된 머신코드로 컴파일되어 성능을 최적화
// ... 코드의 사용 빈도가 적어지면 디옵티마이징 될 수 있다

// 리플로우,리페인트 - 변경된 DOM과 CSSDOM을 다시 렌더 트리로 결합하고 변경된 렌더 트리 기반으로 레이아웃 페인트 과정을 거쳐 브라우저의 화면에 다시 렌더링하는 것
// 리플로우 -  레이아웃을 다시 계산하는 것, 노드의 추가.삭제.크기변경.위치변경
// ... 레이아웃에 영향이 없을 경우 리페인트만 실행

// 자바스크립트 엔진은 html을 직렬적으로 파싱한다(동기적)
// ... 따라서 html내의 스크립트 태그 위치에 따라 html 파싱이 블로킹되어 돔생성 지연이 될 수 있다
// ... 자바스크립트로 body 내부의 돔 조작시 해당 자바스크립트 코드를 불러오는 스크립트 태그를 body 밑에 작성하는 것을 권장
// ... 이러한 문제를 해결하기 위해 스크립트 태그의 assync/defer 어트리뷰트가 존재(돔 생성 중단 문제 해결)

// async/defer - src 통해 외부 자바스크립트 파일을 로드하는 경우 사용가능
// async - html 파싱과 외부 자바스크립트 파일의 로드가 비동기적으로 동시에 진행
// ... 자바스크립트의 파싱과 실행은 파일 로드 이후 진행되며 이때 html 파싱이 중단
// ... 스크립트 태그에 async 지정시 실행 순서가 보장되지 않는다
// defer - async와 마찬가지로 html 파싱과 외부 자바스크립트 파일의 로드가 비동기적으로 동시에 진행
// ... 자바스크립트의 파싱과 실행은 html 파싱 완료 직후인 돔 생성이 완료된 직후 진행
// ... 돔생성이 완료된 이후 실행되어야 할 자바스크립트에 유용






















