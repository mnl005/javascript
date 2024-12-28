
// @@ 변수 할당시 메모리 구조 @@
// 변수에 원시값 할당시 - 변수 -> 스택메모리주소 -> 원시값
// 변수에 객체 할당시 - 변수 -> 스택메모리주소 -> 참조값(힙주소) -> 객체값
// 원시값도 예외적으로 힙영역에 저장되는 경우 있으나 값 자체는 여전히 불변
// 원시값은 불변이냐, ++v1; 하면 기존 메모리 공간에 저장된 값을 덮어쓸 가능성이 높고
// ... v1 = 1; 하면 해당 변수에 새로운 메모리 공간이 매핑될 가능성이 높다
// ... 자바스크립트 엔진의 최적화 정도에 따라 메모리 동작이 달라질 수 있다
// 원시값 저장시 메모리 구조 표현 - 변수에 원시값이 저장된 스택 메모리 주소가 매핑된다
// 객체 저장시 메모리 구조 표현 - 변수에 객체가 저장된 힙 메모리 주소를 참조하는 참조값이 저장된 스택 메모리 주소가 매핑된다


// 객체지향 프로그래밍 - 객체의 집합으로 프로그램을 표현하려는것
// 객체 - 자바스크립트에서 원시 값 제외한 나머지 값(함수,배열,정규표현식) 등은 모두 객체
// 메서드 - 객체의 프로퍼티 값으로 지정된 함수
// 원시 타입 - 단 하나의 값, 변경 불가한 값
// 객체 타입 - 다양한 타입의 값을 하나의 단위로 구성한 복잡한 자료구조, 변경 가능한 값
// 객체 구성 - 0개 이상의 프로퍼티로 구성, 프로퍼티는 키와 값의 쌍
// ... 자바스크립트의 모든 값은 객체의 프로퍼티로 구성 가능
// 자바스크립트는 프로토타입 기반 객체 지향 언어 - 객체리터럴, Object생성자함수, 생성자함수, Object.create메서드, 클래스 로 객체 생성
// ... 객체 리터럴은 중괄호 내에 0개 이상의 프로퍼티를 정의하고, 변수 할당 시점에 객체가 생성
// 객체 리터럴의 중괄호는 코드블록이 아닌 값으로 평가되는 표현식임으로 세미콜론 붙인다
// 객체의 프로퍼티의 키 사용시 식별자 네이밍 규칙 준수 하면 따옴표 안 붙여도 된다
// 프로퍼티 키로 예약어 사용 비권장
// 객체에 존재 않는 프로퍼티 접근시 에러가 아닌 undefined 반환
// 인스턴스 - 클래스에 의해 생성되어 메모리에 저장된 실체

// 객체 리터럴로 빈 객체 생성
let obj1 = {};

// 객체 생성
let obj2 = {
    k1: 1,
    'k-1': 2, // 식별자 네이밍 규칙 미준수로 따옴표 없이 정의한다면 오류 발생
    0: 4, // 프로퍼티 키에 문자열과 심벌값 이외의 값 사용시 암묵적 타입변환 발생
    fun1: function () { // 값으로 평가 가능한 함수는 객체의 프로퍼티 값으로 사용 가능(객체에 묶인 메서드)
        console.log('obj2.k1',this.k1);
    },
    fun2() { // function 키워드 생략한 축약표현
        console.log('obj2.k1',this.k1);
    }
}
obj2['k2'] = 3; // 프로퍼티 동적 생성
obj2['k1'] = 5; // 프로퍼티 값 갱신
delete obj2['_undefined_']; // 프로퍼티 삭제(존재 않는 프로퍼티 삭제 시도해도 오류 미발생)

console.log(obj2[0], obj2['0']) // 대괄호 표기법으로 접근, 둘다 접근 가능
obj2.fun1();// 마침표 표기법으로 접근
obj2.fun2();// 마침표 표기법으로 접근
console.log('obj2 : ', obj2);

// 프로퍼티 축약표현 - 프로퍼티 키와 프로퍼티 값을 저장한 변수가 동일한 이름 사용하는 경우 프로퍼티키 생략 가능
let v1 = 1, v2 = 2;
let obj3 = {v1, v2};
console.log(obj3);

// 프로퍼티 키 동적 생성
let obj4 = {};
let i = 0;
obj4['v' + ++i] = i;
obj4[`v${++i}`] = i;
console.log(obj4);


// 원시값 변수에 할당시 변수에는 원시값이 저장된 메모리 주소가 매핑
// 객체값 변수에 할당시 객체가 저장된 메모리 주소의 참조값이 저장된 메모리 주소가 매핑
// 변수 - 값저장 위한 메모리 공간 자체
// 상수 - 재할당 금지된 변수
// 원시값 - 읽기 전용이며 변경 불가 값
// 객체(참조) 타입값 - 변경 가능한 값
// ... 변수에 원시값 재할당시 새로운 메모리 공간 확보되며, 기존 메모리 공간과 값은 유지되다 가비지 콜렉터에 의해 제거됨
// ... 변수에 원시값 할당시 실제값이 저장, 객체 타입 값 저장시 객체 참조 값이 저장
// ... 변수에 객체 할당시 원본의 참조값이 복사되어 전달
// ... ECMAScript 사양에 문자열타입(2바이트) 숫자타입(8바이트) 이외의 원시타입은 크기가 명확히 규정되어 있지 않음
// === 연산자는 원시값 비교시 타입과 값을 동시에 비교하고, 객체 비교시 참조값(주소) 를 비교한다

// 유사배열객체 - 문자열을 배열처럼 인덱스로 접근 가능
// 문자열은 원시값임으로 변경 불가
let str1 = 'qwer';
console.log(str1.length);
console.log(str1[0]);

// 원시값 복사 - 복사시 원시값이 저장된 메모리 주소로 값을 참조하여 저장된 원시값을 새로운 매모리 공간에 저장 후 새로운 매모리 공간의 주소와 변수가 매핑
// 두 변수는 다른 매모리 주소가 매핑
let num1 = 10;
let num2 = num1; // num2는 10이라는 원시값이 저장된 새로운 매모리 주소와 매핑
console.log(num1 === num2); // true, 하지만 두 변수에 매핑된 메모리 주소는 다르다

// 객체 복사 - 여러 식별자의 객체 공유 가능
let obj5 = {};
let obj6 = {};
let obj7 = obj6;
console.log(obj5 === obj6); // false,
console.log(obj5 === obj7); // false
console.log(obj6 === obj7); // true, 두 변수에 매핑된 콜스택의 메모리 주소는 다르나 콜스택에 저장된 참조값이 같다

// 객체 공유
let obj9 = {x: {y: 1}};
let obj10 = obj9; //둘은 같은 객체를 공유
obj10.x = 10; // 연결이 끊키지 않는다
console.log(obj9 === obj10); // true
console.log(obj9.x === obj10.x); // true

// 얕은 복사 - 객체 중첩시 한 단계만 복사
let obj11 = {x: {y: 1}};
let obj12 = {...obj11};
console.log(obj11 === obj12); // false, 주소가 다르다
console.log(obj11.x === obj12.x); // true, 주소가 같다
obj12.x = 2; // 연결이 끊킨다
console.log(obj11.x === obj12.x); // false, 참조가 변경됨

// 깊은 복사 - 객체 중첩시 모든 중접된 객체 복사
let obj13 = {x: {y: 1}};
let obj14 = JSON.parse(JSON.stringify(obj11));
console.log(obj13 === obj14); // false
console.log(obj13.x === obj14.x); // false
obj14.x.y = 2;
console.log(obj13.x.y); // 1
console.log(obj14.x.y); // 2


// 함수 - 일련의 과정을 문으로 구현하고 코드블록으로 감싸 하나의 실행단위로 정의한 것
// 매개변수 - 함수 내부로 입력을 전달받는 변수
// 입력 - 인수
// 출력 - 반환값
// 사용이유 - 코드재사용으로 유지보수의 편의성 높인다

// 함수는 객체 타입의 값으로 변수에 할당 가능
// 함수이름은 식별자로 네이밍 규칙 준수
// 이름있는 기명함수와 이름없는 무명함수
// 함수몸체 - 함수 호출시 일괄 실행할 코드블록
// 함수 호출시 매개변수는 undefined로 초기화되어 함수 내부에서 변수와 동일하게 사용
// 함수 호출시 매개변수와 인수의 갯수를 체크하지 않는다, 초과된 인수는 무시
// 모든 인수는 arguments로 보관
// 적절한 인수가 전달되었는지 확인하거나 단축 평가로 기본값을 할당할 필요가 있음
// 매개변수 기본값 사용가능

// 함수 선언문 - fun1이라는 식별자가 자바스크립트 엔진에 의해 암묵적으로 생성후 함수 객체를 할당
// 함수 호이스팅 - 런타임 이전 함수 선언문이 실행되고 식별자가 객체로 초기화
function fun1(x) {
    console.log(x, 'fun1', arguments);
}
fun1(1, 2, 3, 4);

// 표현식이 아닌 문이지만 변수에 할당시 표현식인 문으로 해석된다
// 호출시 함수 이름이 아닌 식별자로 호출
let fun2 = function fun3(x = '_default_') {
    console.log(x, 'fun3');
};
fun2();

// 그룹 연산자 내에서 함수 리터럴 fun4는 함수 선언문이 아닌 함수 리터럴 표현식으로 해석된다
// 해당 함수를 호출할 식별자가 없음으로 호출 불가
(function fun4(x) {
    console.log(x, 'fun4')
});

// 함수 표현식 - 함수는 객체의 값으로 할당 가능한 일급 객체이다
// 익명함수 - 함수 표현식에서 함수 리터럴의 이름 생략 가능
// 값의 할당은 런타임 이후 실행되기 때문에 할당 이전 접근 불가
let fun5 = function (x) {
    console.log(x, 'fun5');
};

// Function 생성자 함수
// ... 클로저 생성하지 않는 등 함수선언문,함수표현식과 다르게 동작
let fun6 = new Function('x', 'console.log(x,"fun6")');
fun6(1);

// 화살표함수 - function 키워드 대신 익명 함수로 정의
// ... this 바인딩 방식 다르고, prototype 프로퍼티 없고, arguments 객체 생성 않는다
let fun7 = (x) => (y) => (z) => console.log('fun7', x, y, z);
fun7(1)(2)(3);

// 함수의 반환문 - 함수의 실행중단, 리턴값 미명시시 undefined 반환, 반환문 생략시 undenined 반환
// 리턴문 이후 줄바꿈이 있다면 자동으로 세미콜론이 삽입
let fun8 = () => {
    return
    throw Error() // 여기에 도달 안 함
};
console.log(fun8()); // undefined

// 원시값은 그대로지만 객체는 원본이 훼손된다
function fun9(num, obj) {
    num = 100;
    obj.name = 'lee';
}
let num3 = 0;
let str2 = {name: 'kim'};
fun9(num3, str2);
console.log(num3, str2); // 0, {name: "lee"}

// 함수 선언문이 끝나는 위치에 세미콜론이 자동삽입 됨으로 즉시 실행 함수는 그룹 연산자로 감싸야 한다
// ... 그룹 연산자의 피연산자는 값으로 평가 되며, 함수 선언문을 그룹 연산자로 묶을시 함수 표현식으로 변환된다
// 익명 즉시 실행 함수 1 - 정의 되자마자 실행
(function () {
    console.log('now')
}());
// 익명 즉시 실행 함수 2 - 기능적으로 위의 경우와 유사, 현대적 스타일
(function () {
    console.log('f1')
})();
// 기명 즉시 실행 함수
(function fun10() {
    console.log("fun10")
}());
!function () {
    console.log('f2')
}();
+function () {
    console.log('f3')
}();

// 재귀 함수 - 자기 자신을 호출하는 함수
// 탈출 조건 없다면 스택 오버플로 에러 발생
function fun11(x) {
    if (x <= 1) {
        return x;
    }
    return fun11(x - 1) * x;
}

console.log(fun11(3));

// 중첩함수 - 함수 내부에 정의된 함수
// 일반적인 경우 중첩함수는 함수 내부에서만 호출 가능
function fun12(y) {
    let i = y;

    function inner(x) {
        return x * 10;
    };
    return i + inner(10);
}

console.log(fun12(100));

// 콜백함수 - 공통수행될 특정행위의 일부분을 변경할 경우 사용(예를들어 반복이라는 행위의 일부분을 변경해야 하는 경우)
// ... 함수의 매개변수를 통해 다른 함수의 내부로 전달되는 함수
// ... 공통 로직을 정의하고 변경 로직은 추상화해 함수 외부에서 내부로 전달
// 고차함수 - 매개변수 통해 함수의 외부에서 콜백 함수를 전달받은 고차 함수
let inF1 = (x) => {
    return x * 10;
}; // 콜백함수
let inF2 = (x) => {
    return x * 5;
}; // 콜백함수
let repeat = (i1, f1) => (i2, f2) => { // 고차함수
    let result1 = 0;
    let result2 = 0;
    for (let i = 0; i <= i1; i++) {
        result1 += f1(i);
    }
    for (let i = 0; i <= i2; i++) {
        result2 -= f2(i);
    }
    console.log(result1, result2);
};
repeat(10, inF1)(20, inF2);

// 순수함수 - 외부 상태에 의존 않고, 외부 상태 변경 않는 부수효과 없는 함수
// ... 동일 인수 전달시 결과값이 같다
// ... 인수를 변경 하지 않으며, 외부 상태를 변경하지 않는다
let fun15 = (x) => {
    return ++x
};
console.log(fun15(10));

// 비순수함수 - 부수 효과가 있는 함수
// ... 외부 상태에 의존하거나 외부 상태를 변경하는 함수
let bool1 = false;
let fun16 = (x) => {
    bool1 = x ? false : true;
    console.log('toggle : ', bool1);
};
fun16(bool1);
fun16(bool1);
fun16(bool1);

// 스코프 - 유효범위, 식별자를 검색할 때 사용되는 규칙
// 모든 식별자는 선언 위치 따라 유효 범위가 결정
// 식별자는 값을 구분해야 함으로 유일해야 한다, 하나의 값은 유일한 식별자에 연결 되어야 한다
// 프로그래밍 언어는 스코프를 통해 변수 이름의 충돌을 방지한다
// 스코프는 네임스페이스 - 같은 이름의 식별자를 서로 다른 스코프 범위에서 사용 가능
// 전역스코프 - 코드의 가장 바깥 영역, 전역 변수가 선언되는 영역, 모든 영역에서 참조가능
// 지역스코프 - 함수 몸체 내부 등, 지역 변수가 선언되는 영역, 지역변수는 자기자신 스코프와 하위스코프에서 유효
// /// 블록 스코프도 넓은 의미에서 지역 스코프에 속하지만, 정확하게는 "블록 스코프"로 구분
// 스코프 체인 - 스코프가 계층적으로 연결된 구조
// ... 변수 참조시 자기 자신 스코프부터 상위 스코프로 이동하며 식별자를 검색
// ... 검색 우선 순위는 선언된 위치로 결정(자기 자신 스코프 -> 상위 스코프)
// 렉시컬 스코프 - 참조 위치가 아닌 선언 위치로 상위 스코프가 결정
// var 스코프 - 같은 스코프 내에서 중복 사용이 가능, 함수 레벨 스코프
// let, const 스코프 - 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언 불가, 블록 레벨 스코프
// 함수 스코프 - 함수가 정의된 위치에 따라 상위 스코프 결정

// var의 스코프 - var로 선언된 변수의 스코프는 함수 레벨 스코프를 가짐
// ... var로 선언된 변수는 함수 블록 이외의 코드블록에서 선언시 전역 변수로서 선언된다
var vv1 = true;
if (true) {
    var vv2 = true;
    if (true) {
        var vv3 = true;

    }
}
var vv4 = false;
function fun18() {
    var vv4 = true;
    console.log(vv4); // 함수 내부의 변수 참조
}

console.log(vv1, vv2, vv3);
// console.log(vv4); // 참조 에러 발생
fun18(); // true
console.log('vv4',vv4); // false, 함수 외부의 변수 참조

// 함수 스코프 - 함수의 변수 상위 스코프는 함수 정의시 정적으로 결정
var vv5 = 'global';
function f1() {
    var vv5 = 'in function';
    f2();
}
function f2() {
    console.log(vv5);
}

f1(); // global

// 지역변수 생명주기 - 함수의 생명주기와 일치, 함수 종료시 소멸
// 변수는 자신이 등록된 스코프가 소멸될 때까지 유효
// 할당된 메모리 공간은 참조가 이뤄지지 않을때 해제
// ... 스코프도 참조 당하지 않을 때 소멸

// 전역 변수 생명주기
// 명시적 호출 없이 바로 실행됨으로 더이상 실행할 문이 없을때 종료된다
// 전역 변수의 생명 주기와 전역 객체의 생명 주기가 일치
// 브라우저 환경에서 전역객체는 window 임으로 var 키워드로 선언한 변수는 전역객체 window의 프로퍼티
// 전역변수 문제 - 모든코드가 접근가능하다, 긴 생명주기로 메모리소스 소비 크다,
// ... 변수 검색시 검색 속도가 느리다, 서로 다른 파일에 존제하는 전역 변수가 같은 스코프 내에 존재할 수 있다
// 전역변수 문제 해결 - 즉시실행함수 내부에서 지역변수로 사용,
// ... 전역 네임스페이스에 사용할 변수를 프로퍼티로 추가, 모듈패턴
// ES6 모듈 - 파일의 독자적인 모듈 스코프를 제공해 var로 선언된 변수가 전역변수가 아니며 window 객체의 프로퍼티가 아니게 된다

// var 키워드 - 변수중복선언 허용, 함수레벨스코프, 변수호이스팅(선언단계와 초기화단계가동시에)
// (선언 + 초기화) -> 할당
// var로 선언된 변수는 런타임 이전에 undefined 으로 초기화
// ... 이는 함수 내부의 변수에도 적용되며 호이스팅도 적용됨
// ... 호이스팅은 스코프 단위로 동작함을 확인
// 브라우저 환경에서 var로 선언시 window 객체의 프로퍼티가 되며,
// ... window의 프로퍼티로 변수에 접근 가능하고 window. 을 생략해도 접근 가능
var vv6 = 'vv66666';
var vv6 = 'vv6';

function f3() {
    console.log(vv6);
    var vv6 = 'in_vv6';
}

f3();// undefined
console.log(vv6);// vv6

// let 키워드 - 변수중복선언 불가, 블록레벨스코프, 변수호이스팅(선언단계와 초기화단계가 분리)
// (선언 + TDZ) -> 초기화 -> 할당
// 브라우저 환경에서 let 키워드로 전역 변수 선언시 window.변수 형태로 접근 불가
let vv7 = 'vv77';
{
    // console.log(vv7); // 호이스팅에 의해 전역 변수가 아닌 같은 블록 내부의 변수에 접근을 시도하나 변수가 TDZ에 있어 에러
    let vv6 = null; // 블록 외부에 선언시 중복 선언됨으로 에러
    let vv7;
    console.log(vv7); // 접근가능, undifined
}

// const 키워드 - 상수 선언을 위해 주로 사용, 반드시 선언과 동시에 초기화, 재할당 금지
// ... 원시값 할당시 원시값은 변경 불가하고, const는 재할당이 금지됨으로 상수처럼 사용가능
// ... 상수로써 키워드 사용시 스네이크 케이스로 표현
// ... 객체 할당시 값 변경 가능
const VALUE_V1 = 'vv88';
{
    // const vv9; // 에러, 선언과 동시에 초기화 필요
    // console.log(VALUE_V1); // 에러, let 과 마찬가지로 호이스팅이 블록 단위로 발생
    const VALUE_V1 = 10;
    console.log(VALUE_V1); // 10
    // VALUE_V1 = null; // 에러, 재할당 불가
    // console.log(++VALUE_V1); // 에러
}
// 값 변경 - 재할당은 금지되나 객체는 불변값이 아님으로 객체의 프로퍼티 수정 가능
const OBJ_1 = {v: 0};
OBJ_1.v = 1;
console.log(OBJ_1);

// 데이터 프로퍼티의 4가지 속성 - [[Value]],[[Writable]],[[Enumerable]],[[Configurable]] - 프로퍼티에접근시반환되는값,변경가능여부,열거가능여부,재정의가능여부
// ... 키와 값으로 구성된 일반적인 프로퍼티, 객체에 값을 저장할때 사용
// 접근자 프로퍼티의 2가지 함수와 2가지 속성 - [[Get]],[[Set]],[[Enumerable]],[[Configurable]] - 다른 데이터 프로퍼티의 값을 읽거나 저장시 사용하는 접근자 함수와 속성 2개

// 객체 변경 방지 - 프로퍼티의 변경 강도를 달리한다,
// ... 중첩 객체에 적용 안됨으로 모든 프로퍼티를 재귀적으로 호출하여 적용할 필요가 있다
// Object.preventExtensions - 프로퍼티의 추가X,삭제O,읽기O,쓰기O,재정의O
// Ojbect.seel - 프로퍼티의 추가X,삭제X,읽기O,쓰기O,재정의X
// Object.freeze - 프로퍼티의 추가X,삭제X,읽기O,쓰기X,재정의X

// 객체 확장 금지 - 프로퍼티 추가만 불가, 정의에 의한 추가도 불가, 삭제 가능
const OBJ_2 = {v: 'OBJ_2'};
Object.preventExtensions(OBJ_2);
console.log(Object.isExtensible(OBJ_2)); // false
delete OBJ_2.v; // 가능
console.log(OBJ_2); // {}

// 객체 밀봉 - 읽기와 쓰기만 가능
const OBJ_3 = {v: 'OBJ_3'};
Object.seal(OBJ_3);
console.log(Object.isSealed(OBJ_3)); // true
console.log(OBJ_3);

// 객체 동결 - 읽기만 가능
const OBJ_4 = {v: 'OBJ_4'};
Object.freeze(OBJ_4);
console.log(Object.isFrozen(OBJ_4)); // true
console.log(OBJ_4);

// 생성자 함수 - new 연산자와 함께 호출해 인스턴스를 생성하는 함수
// Object 생성자 함수 - new 연산자 호출시 빈 객체가 생성되어 반환
let obj15 = new Object();
obj15.v = 'obj15';
obj15.f = function () {
    console.log(this.v)
};
obj15.f();

// 객체 리터럴로 객체 생성
// 프로퍼티는 다를 수 있으나 매서드가 같을 수 있어 비효율 발생 (코드가 중복된다)
let obj16 = {
    name: 'obj16',
    name() {
        console.log(this.name);
    }
};
let obj17 = {
    name: 'obj17',
    name() {
        console.log(this.name);
    }
};


// 생성자 함수로 객체 생성 - 동일한 프로퍼티 구조의 인스턴스 생성 위한 탬플릿, 생성 인스턴스 초기화
// 동일 구조의 객체를 new 키워드를 사용해 인스턴스 생성 가능
// 함수를 생성자 함수로서 호출 - new 연산자와 함께 호출하여 객체를 생성한다
// ... new 연산자와 함께 사용 않는 함수는 일반 함수로 동작
// 인스턴스 생성과정
// 1. 암묵적으로 빈 객체가 생성(인스턴스)되어 this에 바인딩 (런타임이전)
// 2. this에 바인딩된 인스턴스 초기화
// 3. 생성자 함수 내부의 처리가 끝나면 완성된 인스턴스가 바인딩된 this를 암묵적으로 반환
// new 키워드 없이 함수 사용시 일반 함수로 동작하며 함수 내부의 this는 전역 객체를 가리킨다

// ftest1 - 객체 리터럴 반환, 프로토타입 상속 없음, instanceof 검사시 false
// ftest2 - this에 속성 할당 후 인스턴스 반환, 프로토타입 상속, instanceof 검사시 true, 암묵적 this 반환, 생성자 함수로써 사용됨
function ftest1(x,y){
    return {x,y};
}
function ftest2(x,y){
    this.x = x;
    this.y = y;
}
console.log(new ftest1(1,2), new ftest2(1,2));
debugger;
function Person(name,age){
    this.name = name || 'default_name';
    this.age = age || 10;
    this.info = function(){
        console.log('name : ',this.name, ' \n age : ', this.age);
    }
    // return {}; // 반환값이 객체면 해당 객체를 반환, 반환값이 원시값이면 무시되고 this가 반환
}
let p1 = new Person(); // 인스턴스가 생성되며 Person 생성자 함수는 암묵적으로 this를 반환
let p2 = new Person('lee',30);
p1.info();
p2.info();

// 함수는 객체, 프로퍼티 소유가능, 메서드 소유가능, 객체와 달리 호출가능
// ... 함수는 일반 객체의 내부슬롯과 내부 메서드를 포함, 함수 객체만을 위한 내부슬롯과 내부 메서드도 포함
function P1(){};
P1.v = 10;
P1.f = function(){
    console.log(this.v);
}
P1(); // 일반적 함수로서 호출 [[Call]] 내부 메서드 호출
new P1(); // 생성자 함수로서 호출 [[Construct]] 내부 매서드 호출

// constructor 함수 - 함수선언문,함수표현식,클래스
// 함수 정의 방식에 따라 생성자 함수인지 구별
function p3(){};
let p4 = function(){};
let p5 = {
    p: function(){}
}
console.log(new p3());
console.log(new p4());
console.log(new p5.p());

// non-constructor - 메서드,화살표 함수
// 메서드 - 객체의 프로퍼티로 정의된 함수, ES6에선 축약 표현만 메서드로 인정
let p6 = () => {};
let p7 = {
    x(){}
}
// new p6(); // 에러
// new p7.x(); // 에러

// new 연산자와 함께 함수 호출시 생성자 함수로 동작(non-constructor가 아닌 경우)
function p8(x,y) {
    return x + y;
}
console.log(new p8()); // 반환값이 무시되어 빈 객체가 생성되어 반환
function p9(x,y){
    return {x,y};
}
console.log(new p9(1,2)); // 함수가 생성한 객체가 반환

// new.target - 생성자 함수가 new 연산자 없이 호출되는 경우를 막는다
function p10(x,y){
    if(!new.target){
        return new p10(x,y);
    }
    if(!(this instanceof p10)){ // 스코프 세이프 생성자 패턴으로 new 연산자 없이 호출되는 경우르 막는다
        return new p10(x,y);
    }
    this.x = x || 0;
    this.y = y || 0;
    this.info = function(){
        console.log('info : ',x,y);
    }
}
console.log(p10());

// 빌트인 생성자 함수, Object와 Function 은 new 없이도 동일하게 작동
console.log(Object());
console.log(Function('x','return x'));
// String,Number, Boolean 생성자 함수는 new 연산자와 호출시 String,Number,Boolean 객체를 생성해 반환
// ... new 연산자 없이 호출시 문자열,숫자,불리언 반환
console.log(new Number('10'));
console.log(new Number('10'));
console.log(new Boolean('10'));
console.log(String('10'));
console.log(Number('10'));
console.log(Boolean('10'));

// 일급객체 - 객체와 동일 사용 가능 - 객체는 값임으로 일급객체는 값과 동일취급 가능
// ... 무명 리터럴로 런타임시 생성 가능
// ... 변수나 자료구조에 저장 가능
// ... 함수의 매개변수에 전달 가능
// ... 함수의 반환값으로 사용 가능
let pp1 = function () { return 1; };
let pp2 = function inn() { return 2; };
let pp3 = function (x) { return x(); };
let result = pp3(pp1);
let pp4 = { pp1, pp2, result };

// arguments - 함수의 arguments 프로퍼티 값은 arguments 객체이다
// 함수의 매개변수 갯수만큼 인수 전달 안 해도 오류 발생 없음
// 초과된 인수는 함수의 arguments 객체에 저장
// ... 매개변수 개수를 확정 못하는 가변 인자 함수를 구현시 유용
function pp5(){console.table(arguments);}
pp5(1,2,3,4,5,6,7,8);
// 가변인자함수 구현 예시, 인수 전달 수만큼 반복한다
function pp6(...x){
    x.forEach((v) => console.log(v));
    console.log('길이 : ',x.length);
    return x.filter((v) => v > 3).reduce((v,n) => v + n,0.1);
}
let pp7 = pp6(1,2,3,4,5,6,7,8);
console.log(pp7);

// 함수의 length 프로퍼티는 함수 정의시 선언한 매개변수의 갯수

// name 프로퍼티
let pp8 = function inpp8(){};
console.log(pp6.name); // ES6 에서 .name은 함수 객체를 가리키는 변수 이름을 값으로 갖는다
console.log(pp8.name);

// __proto__ 접근자 프로퍼티 - [[Prototype]] 내부 슬롯이 가리키는 프로토타입 객체에 접근하기 위한 접근자 프로퍼티
// ... 모든 객체는 [[Prototype]] 라는 내부 슬롯을 갖는다
// ... 내부 슬롯 직접 접근 불가
// 생성자 함수로서 사용가능한 함수는 prototype을 직접 소유
let oo1 = () => {};
let oo2 = {
    x(){}
}
function oo3(){};
console.log(oo1.hasOwnProperty('prototype')); // false
console.log(oo2.x.hasOwnProperty('prototype')) // false
console.log(oo2.hasOwnProperty('prototype')) // false
console.log(oo3.hasOwnProperty('prototype')) // true

// 리터럴 방식으로 생성한 객체는 프로토 타입 객체인 Object.prototype의 프로퍼티를 상속받는다
let ooo = {a:1};
console.log(ooo.__proto__ === Object.prototype); // true
console.log(ooo.hasOwnProperty('a')); // true
console.log(ooo.hasOwnProperty('__proto__')) // false
console.log(ooo.hasOwnProperty('prototype')) // false

















