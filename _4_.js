// 일반함수  - constructor O, prototype O, super X, arguments O
// 메서드   - constructor X, prototype X, super O, arguments O
// 화살표함수 - constructor X, prototype X, super X, arguments X
// ... 메서드는 [[HobmObjec]] 내부슬롯 통해 super 키워드 사용 가능
const base = {
    name: 'base',
    m1() {
        console.log(this.name);
    }
}
const sub = {
    __proto__: base,
    m1() {
        return super.m1();
    }
}
sub.m1();

// 화살표함수 - 기존 함수 정의 방식의 간략화된 정의 방식, 내부 동작도 간략화, 화살표 함수의 this는 호출 위치에 따라 가리키는 위치가 달라진다
// ... 중괄호 생략시 함수 내부 몸체 내부의 문이 표현식인 문이여야 한다, 여러개의 문은 중괄호로 감싸야 한다
// ... 고차함수의 인수로 전달시 유용
// ... 인스턴스 생성 불가, 프로토타입 프로퍼티 없고 프로토타입 생성 불가, 중복 매개변수 이름 선언시 엄격모드 아니더라도 에러발생
// ... this,arguments, super, new.target 바인딩 없음
let a1 = x => x * 10;
let a2 = (x, y) => {
    return x * y
};
let a3 = (x, y) => {
    let n = x + y;
    return n;
}
let a4 = (x => {
    console.log('a4');
})(); // a4 - 즉시실행
[1, 2, 3].map(v => console.log(v));


// 두 함수는 자기 자신이 선언되었을 시의 스코프를 기억함으로 변수 접근시 동일하게 동작
{
    let v1 = 'v1';
    let f1 = function () {
        console.log(v1);
    }
    let f2 = () => {
        console.log(v1);
    }
    f1(); // v1
    f2(); // v1
    {
        let v1 = 'qwer'; // 해당 변수는 두 함수에게 무시된다(두 함수 모두 자신의 스코프를 기억하기 때문)
        f1(); // v1
        f2(); // v1
    }
}

// @@@@@ 일반함수의 this는 함수 호출 방식에 따라 동적으로 결정
// @@@@@ 화살표함수의 this는 자신의 선언된 위치의 상위의 this로 this가 바인딩
// @@@@@ bind 통해 직접 바인딩 해주는것은 함수 표현식에서만 가능
function a5() {
    this.name = 'a5';

    this.m1 = function m1() {
        console.log('m1 : ', this.name);
    };
    this.m2 = () => {
        console.log('m2 : ', this.name);
    };

    let m3 = function () {
        console.log('m3 : ', this.name);
    }.bind(this);

    let m4 = () => {
        console.log('m4 : ', this.name);
    };
    m3(); // a5
    m4(); // a5
}

let a6 = new a5();
a6.m1(); // a5
a6.m2(); // a5

// 익명 함수에 객체를 바인딩하여 내부에서 화살표 함수를 선언해 사용하는 로직을 즉시 실행
(function () {
    let f1 = () => console.log(this.x);
    let f2 = function () {
        console.log(this.x)
    }.bind(this);
    f1(); // qwer
    f2(); // qwer
}).bind({x: 'qwer'})();


let ob1 = {
    name: 'ob1',
    f1: function () {
        console.log(this.name);
    },
    f2: () => console.log(this.name),
    f3() {
        console.log(this.name);
    }
}
ob1.f1(); // ob1, ob1을 통해 호출하였음으로 ob1의 this를 가리킨다
// ob1.f2(); - 화살표 함수는 상위 스코프를 기억하며 객체 리터럴은 스코프를 생성하지 않음으로 화살표 함수의 this가 가리킬 대상이 없다
ob1.f3(); // ob1, ES6의 매서드 형태


// constructor 내부에 this.info1과 this.f3를 한 것과 같다
// 화살표 함수의 상위 스코프는 클래스 외부이나,
// ... 클래스 필드에 화살표 함수 할당시 construcor 내부의 this 바인딩과 같아 화살표함수에서의 this가 클래스를 가리키게 됨
class c1 {
    info1 = 'c1';
    f1 = () => console.log(this.info1);
    f2 = function () {
        console.log(this.info1);
    };

    f3() {
        console.log(this.info1);
    }
}

let c1_ob1 = new c1();
c1_ob1.f1(); // c1
c1_ob1.f2(); // c1
c1_ob1.f3(); // c1


// c3의 f1은 f1의 상위 스코프인 c3의 constructor의 super과 this를 상속받기 때문에 에러 미발생
class c2 {
    constructor() {
        this.info = 'c2ifoinfoinfo';
    }

    f1() {
        console.log(this.info);
    }
}

class c3 extends c2 {
    constructor(){
        super();
        this.f2 = super.f1;
    }
    f1 = () => {
        super.f1();
    }
}

let c3_ob = new c3();
console.log('----');
c3_ob.f1();
c3_ob.f2();


// Rest 파라미터 - 함수에 전달된 인수들의 목록을 배열로 전달받는다
let fun1 = function (x, y, ...arr) { // 반대순서는 애러
    console.log(arguments); // [Arguments] { '0': 1, '1': 2, '2': 3, '3': 4, '4': 5, '5': 6 }
    console.log(x, y, arr); // 1 2 [ 3, 4, 5, 6 ]
}
fun1(1, 2, 3, 4, 5, 6);

// 매개변수 기본값 - 인수 체크와 초기화를 간소화
let fun2 = (x = 1, y = 2) => {
    console.log(x, y);
}
fun2(); // 1 2
fun2(undefined, null); // 1 null
fun2(null, null); // null null

// 요소 - 배열이 가진 값
// 배열의 인덱스 - 배열의 요소의 위치
// 자바스크립트의 배열 - 배열은 객체 타입, 배열 내부의 값이 타입이 달라도 된다, 요소가 차지하는 메모리 공간이 다르다, 배열 요소가 연속적으로 이어지지 않은 희소 배열
// ... 배열의 요소 편집시 성능이 유리, 조회는 비효율
// ... delete 통해 삭제해도 길이가 유지
// ... length를 현재 길이보다 작게 할당시 길이가 줄지만, 반대의 경우는 변동없음
// ... 배열에 같은 타입의 요소를 연속적으로 위치시키는 것을 권장
// ... 존재하지 않는 요소 접근시 애러발생
// ... 현재 length 프로퍼티보다 큰 값으로 인덱스에 접근해 요소 추가시 희소배열이 된다
let arr1 = ['str', 1, true, null, undefined, NaN, Infinity, [], {}, function () {
}];
delete arr1[0];
console.log(arr1);
console.log(arr1.length);
console.log(new Array(10)); // 길이가 10을 가지는 배열 생성
console.log(new Array(1, 2, 3));
console.log(Array.of(10)); // 요소로 10을 가진 배열 생성
console.log(Array.from({length: 2, 0: '0', 1: '1'})); // 길이가 2인 '0','1'을 요소로 가진 유사 배열 객체 생성

// 배열 확인 - Array.isArray() 의 인수를 []로 주지 않으면 false

// 인덱스 검색
console.log(['a', 'b', 'c', 'd', 'e'].indexOf('b', 2)); // b의 인덱스를 2번 인덱스부터 검색, 값이 없다면 -1반환
console.log(['a', 'b', 'c', 'd', 'e'].includes('b')); // b가 포함되어 있다면 true

// *** 원본 배열 변경 메서드 ***
let arr2 = [];
arr2.push(1, 2, 3, 4, 5); // 배열 길이 반환
arr2.pop(); // 제거한 요소 반환
arr2.unshift(0, -1, -2, -3); // 배열 길이 반환
arr2.shift(); // 제거한 요소 반환
arr2.splice(1, 2, 444, 555); // 1인덱스부터 2개를 제거하고 값을 대체
arr2.splice(0, 1); // 0인덱스의 값을 제거
console.log([1, 2, 3].join('-')); // 1-2-3 문자열 반환
console.log([1, 2, 3].reverse()); // 거꾸로
console.log([1, 2, 3].fill(0)); // 모든 요소를 0으로, 두번째 인수는 시작인덱스, 새번째 인수는 채우기 멈춤 인덱스
console.log([1, 2, [3, [4]]].flat(1)); // 인수는 평탄화할 깊이
console.log('arr2 : ', arr2);

console.log(['c', 'b', 'a'].sort()); // sort는 유니코드 순서로 정렬함으로, 숫자 정렬 순서를 정의하는 비교함수를 인수로 전달해야 한다
console.log([55, 4, 21, 43, 63, 42].sort((a, b) => a - b)); // a-b 했을때 양수,음수,0 3가지 결과로 정렬 수행하며 해당 결과는 오름차순
console.log( // 객체를 id 기준으로 오름차순 정렬
    [
        {id: 10, v1: 'q', v1: 'w'},
        {id: 2, v1: 'q', v1: 'w'},
        {id: 1, v1: 'q', v1: 'w'},
        {id: 3, v1: 'q', v1: 'w'},
        {id: 4, v1: 'q', v1: 'w'},
        {id: 2, v1: 'q', v1: 'w'}
    ].sort((a, b) => {
        return a['id'] - b['id']
    })
);
console.log( // 객체의  id가 문자열일때 오름차순 정렬
    [
        {id: 'q', v1: 'q', v1: 'w'},
        {id: 'rew', v1: 'q', v1: 'w'},
        {id: 'fwf', v1: 'q', v1: 'w'},
        {id: 'fqe', v1: 'q', v1: 'w'},
        {id: 'a', v1: 'q', v1: 'w'},
        {id: 'b', v1: 'q', v1: 'w'}
    ].sort((a, b) => {
        return (a['id'] > b['id']) ? 1 : ((a['id'] < b['id']) ? -1 : 0);
    })
);

[1, 2, 3].forEach((x,y,z) => {
    z[y] = x*10;
    console.log(x,y,z);
}); // 값,인덱스,배열

// *** 원본 배열을 변경하지 않는 메서드 ***
console.log([1, 2, 3].concat([4, 5]));
console.log([1, 2, 3].concat(4, 5)); // 결과는 위와 같다
console.log([1, 2, 3, 4].slice(0, 2)); // 0에서 2까지의 인덱스를 복사해 반환, 두번째 인수 생략시 첫번째 인덱스부터 끝까지 반환, 인수가 음수라면 거꾸로부터 복사, 인수생량시 복사본 그대로 반환(얕은복사)
console.log( // map - 배열의 각 요소와 1대1 매핑해 새로운 배열 반환
    [1,2,3,4,5,5,6]
        .map((x,y,z) => {
            return z[y] * 10;
        })
);
console.log( // filter - 조건이 true일때 요소 반환해 새로운 배열 생성
    [1,2,3,4,5]
        .filter(x => x > 2)
);
console.log(// reduce - x를 0으로 초기값 설정하고 각 요소를 더해 하나의 결과 출력
    [1,2,3,4,5]
        .reduce((x,y,z,q) => x + y,0),
    ['a','b','b','c','d','d','d']
        .reduce((x,y,z,q) => { // x는 결과, y는 요소, z는 요소의 인덱스, q는 인수로 받은 배열
            x[y] = (x[y] || 0) + 1;
            return x;
        },{})
);
console.log( // some - 조건을 하나라도 만족시 true 또는 false 반환
    [1,2,3,4,5]
        .some(x => x === 3)
);
console.log( // every - 모든 요소가 조건을 만족시
    [1,2,3,4,5]
        .every(x => x > 0)
);
console.log( // find - 조건을 만족하는 요소 하나만 반환
    [
        {id: 'q', v1: 'q', v1: 'w'},
        {id: 'rew', v1: 'q', v1: 'w'},
        {id: 'fwf', v1: 'q', v1: 'w'},
        {id: 'fqe', v1: 'q', v1: 'w'},
        {id: 'a', v1: 'q', v1: 'w'},
        {id: 'b', v1: 'q', v1: 'w'}
    ].find((a, b) => {
        return a['id'] === 'a';
    })
);

console.log( // findIndex - 조건을 만족하는 요소의 인덱스 반환
    [
        {id: 'q', v1: 'q', v1: 'w'},
        {id: 'rew', v1: 'q', v1: 'w'},
        {id: 'fwf', v1: 'q', v1: 'w'},
        {id: 'fqe', v1: 'q', v1: 'w'},
        {id: 'a', v1: 'q', v1: 'w'},
        {id: 'b', v1: 'q', v1: 'w'}
    ].findIndex((a, b) => {
        return a['id'] === 'a';
    })
)

// Number 생성자 함수 - Number 인스턴스를 생성
console.log(new Number('10')); // 불리언과 숫자 문자열은 숫자열이 됨
console.log(Number.EPSILON); // 부동소수점에 의한 오차를 해결하기 위해 사용
console.log(Number.MAX_VALUE); // 자바스크립트에서 표현가능한 가장 큰 양수
console.log(Number.MAX_SAFE_INTEGER); // 자바스크립트에서 안전하게 표현 가능한 가장 큰 정수값
console.log('---------------------------------');
console.log(
    Number.isFinite(null),isFinite(null), // false true - Number.isFinite는 암묵적 타입 변환 안 함
    '\n',
    Number.isInteger(0), // true
    Number.isInteger(null), // false
    Number.isInteger(undefined), // false
    '\n',
    Number.isNaN(NaN), // true
    isNaN(undefined), // true - 암묵적 타입 변환
    Number.isNaN(undefined), // false
    '\n',
    Number.isSafeInteger(0), // true
    Number.isSafeInteger(99**99), // false
    '\n',
    Number.isNaN(undefined), // false
    isNaN(undefined), // true
    '\n',
    (103.4).toExponential(), // 1.03e+2 - 숫자를 지수 표기법으로 문자열로
    '\n',
    (123.456).toFixed(), // 123 - 숫자를 반올림해 문자열로
    '\n',
    (123.456).toPrecision(4), // 123.5 - 4자리 유효, 나머지 반올림 후 문자열로
    '\n',
    (10).toString(16) // a - 16진수 문자열로
);

// Math - 정적 프로퍼티와 메서드만 제공
console.log(
    Math.PI, // 3.141592653589793
    '\n',
    Math.abs(-1), //  1 1 0 0 0 - 숫자를 절대값으로
    '\n',
    Math.round(1.1234), // 소수점 이하 반올림
    '\n',
    Math.ceil(1.6), // 소수점 이하 올림
    '\n',
    Math.floor(1.5), // 소수점 이하 내림
    '\n',
    Math.sqrt(9), // 인수의 제곱근
    '\n',
    Math.random(), // 0에서 1 사이의 난수
    '\n',
    Math.pow(2,3), // 2의 3제곱
    '\n',
    Math.max(1,2,3), // 인수중 가장 큰 수 하나, 인수 미 전달시 Infinity
    '\n',
    Math.min(1,2,3), // 인수중 가장 작은 수, 인수 미 전달시 Infinity
);


// Date - 자바스크립트의 코드가 실행된 시계에 의해 결정
console.log(
    new Date(), // 2024-12-26T06:56:13.438Z
    '\n',
    Date(), //  Thu Dec 26 2024 15:56:13 GMT+0900 (대한민국 표준시)
    '\n',
    new Date(999999999), // 인수는 밀리초(1970-1-1 00:00:00 기준)
    '\n',
    new Date('2020/3/25/10:00:00:00'), //  2020-03-25T01:00:00.000Z
    '\n',
    Date.now(), // 1735196331721 - UTC 기점으로 현재까지의 밀리초
    '\n',
    Date.parse('1970/01/02/09:00:00:00'), // 시간을 밀리초로
    '\n',
    Date.UTC(1970,0,3),
    '\n',
    new Date('2020/06/23').getMonth(), // 달 반환
    '\n',
    new Date('2020/06/23/12:30:10:150').getMilliseconds(), // 150 - 시간 반환
);


// RegExp - 정규 표현식, 패턴 매칭 기능
// i - 대소문자 구별 않고 패턴 검색
// g - 대상 문자열 내에서 패턴과 일치하는 문자를 전역 검색
// m - 문자열의 행이 바뀌더라도 패턴 검색을 계속한다
console.log(
    (/^\d{3}-\d{4}-\d{4}$/).test('010-1234-1234'), // 해당 패턴이 맞다면 true
    '\n',
    (/is/i).test(' is Is isisisi'), // is 패턴을 대소문자구분안하고(i) 검색해 값이 있다면 true
    '\n',
    (/is/).exec(' is Is isisisi'), // [ 'is', index: 1, input: ' is Is isisisi', groups: undefined ]
    '\n',
    ' is Is isisisi'.match(/is/g), //  [ 'is', 'is', 'is', 'is' ]
    '\n',
    'qwe qwerr fewf wew'.match(/.../g), //  [ 'qwe', ' qw', 'err', ' fe', 'wf ', 'wew' ]
    '\n',
    'q qqe qwe ewq qq'.match(/q{1,2}/g), // q가 최소한번 최대2번 반복하는 문자열
    '\n',
    'q qqe qwe ewq qq'.match(/q{2}/g), // q가 두번 반복하는 문자열 검색
    '\n',
    'q qqe qwe ewq qq'.match(/q{2,}/g), // q가 최소 2번 이상 반복되는 문자열 검색
    '\n',
    'q qqe qwe ewq qq'.match(/q+/g), // q가 최소 1번 이상 반복되는 문자열 검색
    '\n',
    'q qqe qwe ewq qq'.match(/qw?e/g), // w가 0번 이상 반복되고 e가 이어지는
    '\n',
    'q qqe qwe ewq qq'.match(/q|e/g), // q 또는 e 문자열 전역검색
    '\n',
    'q qqe qwe ewq qq'.match(/q+|e+/g), // q 또는 e가 반복되는 문자열 전역검색
    '\n',
    'q qqe qwe ewq qq'.match(/[qe]+/g), // q 또는 e 가 한번이상 반복되는 문자열 전역검색
    '\n',
    'q qqe qwe ewq qq'.match(/[a-z]+/g), // a~z 사이의 값이 한번 이상 반복되는
    '\n',
    '0,12,ㅈㅂㄷㄱ,asd'.match(/[\d,]+/g), // 0 ~ 9 또는 , 이 한번 이상 반복되는
    '\n',
    '0,12,ㅈㅂㄷㄱ,asd'.match(/[\D,]+/g), // 문자 또는 , 이 한번 이상 반복되는
    '\n',
    '0,12,ㅈㅂㄷㄱ,asd'.match(/[\w,]+/g), // 알파벳,숫자,언더스코어, , 가 한번 이상 반복되는
    '\n',
    '0,12,ㅈㅂㄷㄱ,asd'.match(/[\W,]+/g), // 알파벳,숫자,언더스코어가 아닌 문자 또는 , 가 한번이상 반복되는
    '\n',
    '0,12,ㅈㅂㄷㄱ,asd'.match(/[^0-9]+/g), // 숫자를 제외한 문자열 전역 검색
    '\n',
    (/^https/g).test('https://qwefqw.com'), // https 로 시작하면 true
    '\n',
    (/https$/g).test('https://qwefqw.comhttps'), // https 로 끝나면 true
    '\n',
);

// String - new 연산자와 함께 호출시 String 인스턴스 생성 가능
console.log(
    new String(),
    '\n',
    new String('lee'),
    '\n',
    ('qwer')[0], // 배열처럼 특정 인덱스의 문자에 접근 가능, 단 값의 변경은 불가
    '\n',
    ('qwer').length,
    '\n',
    ('qwerqwer').indexOf('q'), // 0 - 인수로 전달반은 문자의 인덱스 반환, 없다면 -1 리턴
    '\n',
    ('qwer123').search(/123/), // 4 - 인수로 전달받은 정규식에 해당하는 문자의 인덱스 반환, 없다면 -1 리턴
    '\n',
    ('qwer123').includes('qwe'), // 있으면 true, 없으면 false
    '\n',
    ('qwer123').startsWith('qwe'), // 인수로 받은 문자열로 시작하면 true
    '\n',
    ('qwer123').charAt(0), // 해당 인덱스의 문자열 반환, 인덱스 벗어나면 빈 문자열 반환
    '\n',
    ('qwer123').substring(0,3), // 0-3 인덱스의 문자열 반환
    '\n',
    ('qwer123').slice(-4), // 뒤에서 4자리 잘라내어 반환
    '\n',
    ('qwer123').toUpperCase(), // 대문자로
    '\n',
    (' qwer123 ').trim(), // 앞뒤 공백 제거
    '\n',
    ('qwer123').repeat(3), // 문자열 3번 반복해 새로운 문자열 반환
    '\n',
    ('qwer123').replace('qwer','111'), // qewr을 111로, 여럿 존재시 첫번째 문자열만 치환
    '\n',
    ('q w er 123').split(' '), // 빈 문자열로 문자열을 구분해 배열로 반환
    '\n',
    ('q w er 123').split(' '), // 빈 문자열로 문자열을 구분해 배열로 반환
    '\n',
);

// Symbol - 다른값과 중복되지 않는 유일무이한 값, 이름의 충돌 위험이 없는 유일한 프로퍼티 키 만들기 위해 사용
// 값에 대한 설명이 같더라도 심벌은 유일무이한 값이다
// 심벌 값은 암묵적으로 문자열이나 숫자 타입으로 변환되지 않는다
// ... 단, 불리언 타입으로 암묵적으로 변환
// 심벌 값을 프로퍼티 키로 사용시 외부 노출이 불필요한 프로퍼티를 은닉 가능
// 인수로 전달받은 문자열을 키로 사용하여 키와 심벌 값의 쌍들이 저장되어 있는 전역 심벌 레지스트리에서 해당 키와 일치하는 심벌 값을 검색
let sym = Symbol.for('qqq');
console.log(Symbol.keyFor(sym)); // qqq
console.log(
    Symbol('qqq'),
    '\n',
    Symbol('eee') === Symbol('eee'), // false
    '\n',
    Symbol.for('eee') === Symbol.for('eee'),  // true -
);