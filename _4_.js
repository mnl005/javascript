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
        this.info = 'c2';
    }

    f1() {
        console.log(this.info);
    }
}

class c3 extends c2 {
    f1 = () => {
        super.f1();
    }
}

let c3_ob = new c3();
c3_ob.f1();

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

console.log(['c', 'b', 'a'].sort()); // sort는 유니코드 순서로 정렬함으로, 정렬 순서를 정의하는 비교함수를 인수로 전달해야 한다
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
console.log( // every - 주어진 조건을 하나라도 만족시
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

console.log('------------------------------------------');
// Number 생성자 함수 - Number 인스턴스를 생성
console.log(new Number('10')); // 불리언과 숫자 문자열은 숫자열이 됨
console.log(Number.EPSILON); // 부동소수점에 의한 오차를 해결하기 위해 사용
console.log(Number.MAX_VALUE); // 자바스크립트에서 표현가능한 가장 큰 양수
console.log(Number.MAX_SAFE_INTEGER); // 자바스크립트에서 안전하게 표현 가능한 가장 큰 정수값
console.log(
    Number.isFinite(null), // false
    isFinite(null), // true - 암묵적 타입 변환
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


























