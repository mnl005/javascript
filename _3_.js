// 자바스크립트는 명령형, 함수형, 프로토타입 기반 객체지향 프로그래밍을 지원하는 멀티 패러다임 언어
// 원시 타입 제외한 나머지 값들(함수,배열,정규 표현식)은 객체
// 객체지향 프로그래밍 - 현실의 실체의 속성을 간추려 추상화하는 행위를 프로그래밍에 적용하는 것
// 객체 - 속성을 통해 여러 값을 하나의 단위로 구성한 복잡적인 자료구조
// 상속 - 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것
// 프로그래밍 시 객체의 구성 - 객체의 상태와 동작을 프로퍼티와 메서드로 표현하고 다른 객체로부터 상속받아 다른 객체와의 관계성을 가질 수 있다
// 자바스크립트는 상속을 프로토타입으로 구현

// 생성자 함수로 객체의 관계를 구현
// 인스턴스 생성시 프로퍼티중 이름과 나이는 중복생성 되는게 맞지만, 메서드는 중복생성 될 필요가 없다
function Person1(name, age) {
    this.name = name;
    this.age = age;
    this.info = function () {
        console.log('name : ', this.name, ' age : ', this.age);
    }
};
// 생성자 함수의 프로토타입에 메서드를 생성한 경우
// 해당 생성자로 생성한 모든 인스턴스는 해당 생성자의 prototype의 모든 프로퍼티와 메서드를 상속받는다
// Person1 생성자 함수의 프로토타입의 속성인 메서드 info_proto는 인스턴스를 여러개 생성해도 중복 생성되지 않는다
Person1.prototype.info_proto = function () {
    console.log('name : ', this.name, ' age : ', this.age);
}
let p1 = new Person1('lee', 30);
let p2 = new Person1('kim', 23);
p2.info_proto();
console.log(p1.hasOwnProperty('info')); // true, 인스턴스에 생성된 메서드
console.log(p1.hasOwnProperty('info_proto')); // false, 생성자 함수로부터 공유받은 메서드
console.log(Person1.prototype.hasOwnProperty('info_proto')); // true, info_proto는 Person1의 프로토타입에서 비롯됨


// 모든 객체는 하나의 프로토타입을 가지며, 모든 프로토타입은 생성자 함수와 연결되어 있다
// 내부 슬롯은 프로퍼티가 아니다
// [[prototype]] 에 직접 접근 불가하나, proto 접근자 프로퍼티로 자신의 내부슬롯 [[prototype]] 에 간접적으로 접근 가능
// __proto__는 객체가 직접 소유한 프로퍼티가 아니고 Object.prototype의 프로퍼티이다,
// ... 따라서 모든 객체는 상속을 통해 Object.prototype.__proto__ 접근자 프로퍼티를 사용 가능
let obj1 = {name: 'lee'}; // 객체 리터럴로 생성된 객체
console.log(obj1); // obj1 객체의 프로퍼티 확인
console.log(obj1.__proto__); // obj1 객체의 프로토타입을 확인
console.log(obj1.constructor === Object); // true, obj1을 만든 객체는 Object이다
console.log(obj1.__proto__ === Object.prototype); // true, 자신을 생성한 객체의 프로토타입에 proto__로 접근 가능함을 확인
console.log(obj1.constructor.prototype === Object.prototype); // true, obj1을만든 객체의 프로토타입은 Object의 프로토타입이다

// [[prototype]] 내부 슬롯 값에 간접 접근하는 이유는 상호 참조에 의해 프로토타입 체인의 생성을 방지하기 위함
// 프로토타입 체인은 단방향 링크드 리스트로 구현됨, 프로토타입 체인의 순환참조를 방지하여 체인의 종점이 존재
let obj2 = {};
let obj3 = {};
obj2.__proto__ = obj3;
// obj3.__proto__ = obj2; // 에러발생, 프로토타입에 접근시 proto 접근자로 접근하게 하여 상호 참조를 방지

// 모든 객체가 __proto__ 로 접근 가능한 것은 아님
let obj4 = Object.create(null);
let obj5 = {x: 'obj5'};
console.log(obj4.__proto__); // undefined, Object.__proto__를 상속받지 못함
obj4.__proto__ = obj5 // obj4의 프로토타입이 교체
console.log(obj4.__proto__ === obj5); // true, obj5의 프로토타입을 obj4가 물려받은걸 확인


// 함수 객체는 prototype을 직접 소유
// 함수의 prototype - 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다
// ... non-constructor 인 화살표 함수와 ES6 메서드 축약표현으로 정의한 메서드는 prototype를 소유하지 않고 프로토타입도 생성하지 않는다
// __proto__ - 모든 객체가 소유, 값은 프로토타입의 참조, 모든 객체가 사용, 객체가 자신의 프로퍼티에 접근 또는 교체위해 사용
// prototype - constructor이 소유, 값은 프로토타입의 참조, 생성자 함수가 사용, 생성자 함수가 자신이 생성할 인스턴스의 프로토타입을 할당하기 위해 사용

let fun2 = function () {
};
let fobj = new fun2();
console.log(fun2.hasOwnProperty('prototype')); // true, 함수 객체가 prototype를 직접 소유함을 확인
console.log(fobj.hasOwnProperty('prototype')); // false, 일반 객체는 prototype를 직접 소유하지 않음을 확인
console.log(fobj.__proto__=== fun2.prototype); // true, fobj의 프로토타입은 fun2로부터 물려받음을 확인
console.log(fobj.constructor === fun2); // true, fobj를 생성한 생성자 함수는 fun2임을 확인
console.log(fun2.prototype.constructor === fun2); // true, fun2의 프로토타입을 생성한 생성자 함수는 fun2이다
console.log(fobj.constructor.prototype === fun2.prototype); // true, fobj을 생성한 생성자 함수의 프로토타입이 fun2의 프로토타입임을 확인


// Object,Function 생성자 함수로 객체 생성시의 생성자 비교
let ooo = new Object();
let fff = new Function('a', 'return a*10');
let zzz = new fff();
console.log(ooo.constructor === Object); // true, ooo 객체를 만든건 Object 생성자 함수이다
console.log(fff.constructor === Function); // ture, fff 함수를 만든건 Function 생성자 함수이다
console.log(zzz.constructor === fff); // true, zzz 객체를 만든건 fff 생성자 함수이다
console.log(zzz.constructor === Object); // false, zzz를 생성한건 Object 생성자 함수가 아님
console.log(zzz.constructor === Function); // false, zzz를 생성한건 Function 생성자 함수가 아님

// new 연산자 없이 리터럴 표현으로 객체를 생성할 경우도 프로토타입이 존재
// 생성자 함수에 의해 생성된 객체는 아니지만 프로토 타입이 존재한다
// Object.prototype
let qqq = {};
let rrr = [1, 2, 3];
let ffo = function (a) {
    return a;
};
let exp = /is/ig;
console.log(qqq.constructor === Object); // true
console.log(qqq.__proto__ === Object.prototype); // true, qqq 가 Object의 프로토타입을 물려 받은 것을 확인
console.log(rrr.constructor === Array); // true
console.log(ffo.constructor === Function); // true
console.log(exp.constructor === RegExp); // true


// 추상연산 - 객체 생성시 생성자 함수의 인수를 전달하지 않거나 undefined 또는 null을 인수로 전달시 내부적으로 추상연산을 호출
// ... Object.prototype을 프로토타입으로 갖는 빈 객체를 생성
let obj6 = new Object();
console.log(obj6.__proto__ === Object.prototype); // true

// obj7 {}, new.target이 undefined나 Object가 아닌 경우, 인스턴스 -> obj7.prototype -> Object.prototype 순으로 프로토타입 체인이 형성
class obj7 extends Object {
};
let obj8 = new obj7;
console.log(obj8); // obj7{}
console.log(obj7.constructor === Object); // false
console.log(obj7.constructor === Function); // true
console.log(obj8.__proto__ === obj7.prototype); // true

// Number 객체 생성
let obj9 = new Object(123);
console.log(obj9); // [Number: 123]
console.log(obj9.constructor === Object); // false
console.log(obj9.constructor === Number); // true
// String 객체 생성
let obj10 = new Object('qwe');
console.log(obj10); // [String: 'qwe]
console.log(obj10.constructor === Object); // false
console.log(obj10.constructor === String) // true
// 함수의 생성자
function fff2() {
};
console.log(fff2.constructor === Function); // true


// 프로토타입은 생성자 함수가 생성되는 시점에 생성, 함수 호이스팅에 의해 런타임 이전에 생성된 프로토타입이 생성자 함수에 바인딩
// 프로토타입과 생성자 함수는 항상 쌍으로 존재
// 생성자 함수구분 - 빌트인 생성자 함수, 사용자 정의 생성자 함수
// 생성된 프로토타입은 constructor 프로퍼티만 갖는 객체이다
// ... 프로토타입은 객체이고 모든 객체는 프로토타입을 가짐으로 프로토타입 자신도 자신의 프로토타입을 갖는다
// ... 빌트인 생성자 함수가 아닌 사용자 정의 생성자 함수는 자신이 평가되어 함수 객체로 생성되는 시점에 프로토타입이 생성,
// ... 생성된 프로토타입의 프로토타입은 항상 Object.prototype
// 빌트인 생성자 함수도 빌트인 생성자 함수가 생성되는 시점에 프로토타입이 생성
// ... 모든 빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성
// ... 생성된 프로토타입은 빌트인 생성자 함수의 프로토타입 프로퍼티에 바인딩
function custom() {
    this.name = 'custom'
};
let cus = new custom();
cus.toString();
console.log(custom.prototype); // {}
console.log(cus.constructor === custom); // true
console.log(cus.constructor.prototype === custom.prototype); // true
console.log(cus.__proto__ === custom.prototype); // true

console.log(custom.constructor === Function); //true
console.log(custom.prototype.__proto__ === Object.prototype); // true
console.log(custom.constructor.prototype === Function.prototype); // true
console.log(custom.prototype.constructor === custom); // true
console.log(custom.__proto__ === Function.prototype); // true


// @@@@@@@@ 프로토타입 체인에 의한 상호참조관계는 자바스크립트에서 Funciton과 Object 빌트인 생성자 함수가 유일
// @@@@@@@@ Function과 Object는 독특하게 서로가 서로를 생성한다
// @@@@@@@@ Object를 제외한 다른 모든 빌트인 생성자 함수는 Function이 생성한다
// @@@@@@@@ 프로토타입체인의 끝은 항상 Object.prototype
// @@@@@@@@ 관계비교시 instanceof 는 한단계씩 위로 올라가며 비교함으로 중간의 객체의 프로토타입이 변경될 경우 결과가 달라진다
// @@@@@@@@ 관계비교시 ===는 현재 프로토타입 체인을 거슬러가지 않고 바로 비교하기 때문에 중간 객체의 프로토타입 변경이 결과에 영향주지 않는다
// 모든객체의 프로토타입은 Object.prototype에서 비롯된다
// 모든 함수객체의 생성자는 Function.constructor에서 비롯된다
console.log(Function.constructor === Function); // true
console.log(Object.constructor === Function); // true
console.log(String.constructor === Function); // true
console.log(Array.constructor === Function); // true
console.log(Object.__proto__ === Function.prototype); // true
console.log(String.__proto__ === Function.prototype); // true
console.log(Array.__proto__ === Function.prototype); // true

// 생성자 함수의 프로토타입을 생성한건 자기자신
console.log(Object.prototype.constructor === Object);  // true
console.log(Function.prototype.constructor === Function); // true
// 둘은 상호참조 관계임을 확인
console.log(Function instanceof Object); // true
console.log(Object instanceof Function); // true
// 둘의 관계 비교 1
console.log(Function.constructor === Function); // true
console.log(Object.constructor === Function); // true
// 둘의 관계 비교 2
console.log(Function.prototype instanceof Object); // true
console.log(Function.prototype.__proto__ === Object.prototype); // true
// 프로토타입 체인의 끝
console.log(Object.prototype instanceof Object); // false, false인 이유는 Object의 프로토타입은 체인의 끝이기 때문이다
console.log(Object.prototype.__proto__ === null); // true,

// Object,String, Number, Function, Array, RegExp, Date, Promise 등의 빌트인 생성자 함수도 생성 시점에 프로토 타입이 생성
// ... 모든 빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성
// ... 생성된 프로토타입은 빌트인 생성자 함수의 prototype 프로퍼티에 바인딩

// 전역 객체는 코드가 실행되기 이전 자바스크립트 엔진에 의해 생성되는 객체
// ... 브라우저에서 window, node.js 환경에서 global 객체를 의미
// 전역 객체는 표준 빌트인 객체(Object,String,Number,Function,Array) 들과 환경에 따른 호스트 객체(클라이언트웹,API,Node.js의 API),
// ... 그리고 var 키워드로 선언한 전역 변수와 전역 함수를 프로퍼티로 갖는다
// Math, Reflect,JSON을 제외한 표준 빌트인 객체는 모두 생성자 함수
// 객체 생성 이전 생성자 함수와 프로토타입은 이미 객체화되어 존재
// ... 생성자함수 또는 리터럴 표기법으로 객체 생성시 프로토타입은 생성된 객체의 내부 슬롯에 할당
// 객체생성방법 - 객체리터럴, Object생성자함수, 생성자함수, Object.create메서드, 클래스(ES6)
// ... 서로 다른 객체 생성의 공통점은 추상 연산에 의해 생성된다는 점이다
// ... 추상 연상은 생성할 객체의 프로토타입을 인수로 전달받고 생성할 객체에 추가할 프로퍼티 목록을 옵션으로 전달,
// ... 빈 객체를 생성 후 객체에 추가할 프로퍼티 목록이 인수로 전달될 경우 프로퍼티 객체에 추가, 인수로 전달받은 프로토타입을 자신이 생성한 객체의 내부슬롯으로 할당하고 생성한 객체를 반환
// ... 프로토타입은 추상 연산에 전달되는 인수에 의해 결정
// 자바스크립트 엔진은 객체 리터럴을 평가하여 객체를 생성시 추상 연산(OrdinaryObjectCreate)를 호출
// 객체 리터럴에 의해 생성되는 객체의 프로토타입은 Object.prototype이다
// 객체 리터럴에 의해 생성된 객체는 constructor 프로퍼티와 hasOwnerProperty 메서드 등을 소유하지 않으나 자신의 프로토타입인
// ... Object.prototype의 constructor 프로퍼티와 hasOwnerProperty 메서드를 자신의 자산인 것처럼 자유롭게 사용 가능
let eee = {x: 1};
console.log(eee.__proto__ === Object.prototype); // true
console.log(eee.constructor === Object); // true
console.log(eee.hasOwnProperty('x')); // true

// Object 생성자 함수에 의해 생성되는 객체의 프로토타입은 Object.prototype이다
let eee1 = new Object();
eee1.x = 1;
console.log(eee1.constructor === Object); // true
console.log(eee1.hasOwnProperty('x')); // true

// 객체 리터럴로 생성한 객체와 Object생성자 함수로 생성한 객체의 차이는 프로퍼티를 추가하는 방식이다
// 리터럴 방식은 객체 리터럴 내부에 프로퍼티를 추가
// Object 생성자 함수 방식은 일단 빈 객체를 생성한 후 프로퍼티를 추가


// 프로토타입 체인 - 객체의 프로퍼티에 접근시 해당 객체에 접근하려는 프로퍼티가 없다면 [[Prototype]] 의 내부 슬롯 참조를 따라
// ... 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다
// ... 객체지향 프로그래밍의 상속을 구현한 메커니즘
// 프로토타입의 최상위에 위치하는 객체는 항상 Object.prototype, 모든 객체는 Object.prototype를 상속받는다
// Object.prototype은 체인의 종점
// Object.prototype의 프로토타입, 즉 [[Prototype]] 내부 슬롯의 값은 null 이다
// 프로토타입의 체인의 종점인 Object.prototype에서 프로퍼티를 검색 못하는 경우 에러가 아닌 undefined를 반환
// 프로토타입 체인은 상속과 프로퍼티 검색을 위한 메커니즘
// 스코프 체인은 식별자 검색을 위한 메커니즘
// 스코프체인과 프로토타입 체인은 서로 연관없이 별도로 동작하는것이 아니라 서로 협력하여 식별자와 프로퍼티를 검색하는 데 사용
function Person(name) {
    this.name = name;
}

Person.prototype.med1 = function () {
    console.log('med1');
}
let person1 = new Person('name1');
console.log('------------------------------------------------------------------------------------');
console.log(person1.constructor === Person); // true
console.log(person1.__proto__ === Person.prototype); // true
console.log(Person.constructor === Function); // true
console.log(Person.__proto__ === Function.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true

// 오버라이딩 - 상위 클래스가 가진 메서드를 해위 클래스가 재정의해서 사용
// 프로퍼티 섀도잉 - 상속 관계에 의해 프로퍼티가 가려지는 현상
// 하위 객체를 통해 상위 객체의 프로토타입의 프로퍼티를 삭제와 변경은 불가
let t1 = function (name) {
    this.name = name;
}
t1.prototype.m1 = function () {
    console.log('t1.prototype.m1 name : ', this.name);
}
let t1_1 = new t1('t1_1');
// t1의 프로토타입 메서드는 프로퍼티 섀도잉 됨
// t1_1의 인스턴스 메서드는 오버라이딩 됨
t1_1.m1 = function () {
    console.log('t1_1.over', this.name);
}
t1_1.m1(); // 오버라이딩된 메서드가 작동
delete t1_1.m1;
t1_1.m1(); // 프로토타입 메서드가 작동

// 생성자 함수의 프로토타입의 교체 - 생성할 인스턴스의 프로토타입을 교체하는 것
let t2 = function (name) {
    this.name = name;
}
t2.prototype = {
    m1() {
        console.log('t2.m1', this.name);
    }
}
let t2_1 = new t2('t2_1');
// 생성자 함수는 constructor을 가지지만 프로토타입의 교체로 constructor이 사라짐
console.log(t2_1.constructor === t2); // false
console.log(t2_1.constructor === Object); // true
// constructor를 복구 후 관계 복구
t2.prototype = {
    constructor: t2,
    m1() {
        console.log('t2.m1', this.name);
    }
}
t2_1.__proto__ = t2.prototype;
console.log(t2_1.constructor === t2); // true
console.log(t2_1.constructor === Object); // false


// instanceof - 프로토타입 체인의 연결을 순차적으로 평가,
// 생성자 함수로부터 생성된 인스턴스의 .__proto__는 생성 시점에 결정
// ... 중간에 체인이 끊켜도 인스턴스의 프로토타입 체인은 변동되지 않으나, 인스턴스가 참조하는 프로토타입 변경시 연결관계가 변경됨
let t3 = function () {};
let t3_1 = function () {};
let t3_1_1 = function () {};
t3_1.prototype = Object.create(t3.prototype); // 연결!
t3_1.prototype.constructor = t3_1;
t3_1_1.prototype = Object.create(t3_1.prototype); // 연결!
t3_1_1.prototype.constructor = t3_1_1;
let t3_1_1_instance = new t3_1_1();
console.log(t3_1_1_instance instanceof t3); // true
t3_1.prototype = null; // 연결파괴
console.log(t3_1_1_instance instanceof t3); // true, 변동 안됨
t3_1_1_instance.__proto__ = null;
console.log(t3_1_1_instance instanceof t3); // false, 변동됨



// 직접상속 - Object.create()에 의한
// ... Object.create()의 첫번째 매개변수는 생성할 객체의 프로토타입으로 지정할 객체를 전달
// ... Object.create()의 두번째 매개변수는 생성할 객체의 프로퍼티 키와 디스크립터 객체로 이뤄진 객체를 전달(생략가능)
let t4 = Object.create(null);
console.log(t4.__proto__ === Object.prototype); // false

// t4 = {} 와 같음
t4 = Object.create(Object.prototype);
console.log(t4.__proto__ === Object.prototype); // true

// t4 = {x:1} 과 동일
t4 = Object.create(Object.prototype, {
    x: {value: 1234, writable: true, enumerable: true, configurable: true}
});
console.log(t4.__proto__ === Object.prototype); // true

// 임의의 객체를 상속받기
let custom_t4 = {x: 1, y: 2};
t4 = Object.create(custom_t4);
console.log(t4.__proto__ === custom_t4); // true;

// 생성자 함수로부터 상속받기
// t4 = new fun_custom('t4'); 와 같다
let fun_custom = function (name) {
    this.name = name;
};
t4 = Object.create(fun_custom.prototype);
t4.name = 't4';
console.log(t4.__proto__ === fun_custom.prototype); // true

// 직접상속 - __proto__에 의한
let t5 = {x: 1};
let t5_1 = {
    y: 10,
    __proto__: t5
};
console.log(t5_1.__proto__ === t5); // true

// 정적 프로퍼티와 메소드 - 생성자 함수로 인스턴스 생성하지 않아도 참조 및 호출 가능한 프로퍼티 및 메서드
// 정적 프로퍼티 및 메소드는 생성자 함수가 생성한 인스턴스로 참조 및 호출 불가
let t6 = function () {
};
let t6_1 = new t6();
t6.prototype.m1 = () => console.log('m1');
t6.m2 = () => console.log('m2');
t6.prototype.m1();
t6.m2();
t6_1.m1();
// t6_1.m2(); // 호출불가

// in 연산자 - 프로퍼티 존재 확인
let t7 = {
    x: 1,
    y: 2,
    z: 3,
    r: 4,
}
console.log('x' in t7); // true
console.log('xx' in t7); // false

// 프로퍼티 열거 - for...in
// ... [[Enumerable]] 값이 true인 객체의 프로토타입상에 존재하는 모든 프로퍼티를 열거, 키가 심볼인경우는 제외
let t7_1 = {
    xx: 111,
    yy: 222,
    __proto__: t7
};
for (let k in t7_1) {
    console.log('key : ', k, ' value : ', t7_1[k]);
}
for (let k in t7_1) { // 자신의 키만 열거
    if (!t7_1.hasOwnProperty(k)) continue;
    console.log('key : ', k, ' value : ', t7_1[k]);
}
// 배열도 객체임으로 상속받은 값을 열거할수 있음으로 forEach메서드 사용 권장
let t8 = [1, 2, 3];
t8.x = 11;
t8.forEach((v) => { // 요소가 아닌 프로퍼티는 제외된다
    console.log(v);
})

// Object.keys/values/entries - 열거 가능한 객체 자신의 프로퍼티 키/값/키와값의쌍 을 배열로 반환
console.log(Object.keys(t7_1));
console.log(Object.values(t7_1));
console.log(Object.entries((t7_1)));


// 암묵적 전역 - let,var,const 없이 변수 선언시 전역 변수처럼 선언됨
// strict mode - 엄격모드, 오류 발생 가능성 높거나 엔진 최적화에 문제 일으킬 코드에 대해 명시적 에러를 발생
// ... 전역 또는 함수단위로 엄격모드 사용하는걸 피해야 한다
// 엄격모드에서 암묵적전역, delete연산자로 변수.함수.매개변수삭제, 매개변수이름중복, width문 사용시 에러
// 엄격모드에서 일반함수로 사용된 함수에서 this는 undefined, 생성자함수로 사용된 this는 함수자신을 가리킨다
// 엄격모드에서 함수 내부에서 함수 내부로 전달된 인수 변경시 argument 객체에 반영 안됨

// 표준 빌트인 객체 - ECMAScript에 정의된 객체, 실행 환경과 상관없이 전역 객체의 프로퍼티로 제공되고, 별도의 선언없이 사용가능
// 호스트 객체 - ECMAScript에 정의 안됨, Dom.Bom,Canvas,XMLHttpRequest,fetch,requestAnimationFram,SVG,Web Storage,Web Component, Web Worker 등의 클라이언트 사이드 웹 api를 호스트 객체로 제공
// 사용자 정의 객체 - 사용자가 직접 정의한 객체

// Math, Reflect, JSON 제외한 모든 표준 빌트인 객체는 인스턴스 생성 가능한 생성자 함수
// 생성자 함수 객체인 표준 빌트인 함수 객체는 프로토타입메서드,정적 메서드 제공
// 생성자 함수 객체가 아닌 표준 빌트인 객체는 정적 메서드만 제공
// 표준 빌트인 객체로 생성한 인스턴스의 프로토타입은 생성자 함수의 프로토타입이다
// ... 따라서 생성된 인스턴스에서 생성자 함수에게 상속받은 정적 메서드를 사용가능
console.log(new String('lee'));
console.log(new Number(123));
console.log(new Boolean(true));
console.log(new Function('x', 'return x * 10'));
console.log(new Array(1, 2, 3));
console.log(new RegExp('lee'));
console.log(new Date());
let str111 = new String('leee');
console.log(str111.__proto__ === String.prototype); // true
console.log(str111.at(0)); // String로부터 상속받은 정적 메서드를 사용

// 래퍼객체 - 원시값에 마침표로 접근시 생성되는 임시객체
let str112 = 'qwer'; // 원시값
// 접근 순간 String 생성자 함수의 인스턴스가 생성되고 문자열은 래퍼 객체의 [[StringData]] 내부 슬롯에 할당
// ... 해당 과정 완료 후, [[StringData]] 내부 슬롯에 할당된 원시값으로 원래 상태 되돌리고 래퍼 객체는 가비지 컬랙션의 대상이 된다
console.log(str112.toUpperCase());
console.log(str112); // qwer, 원래 값으로 회귀

// 전역객체 - 코드 실행 이전 자바스크립트 엔진에 의해 가장 먼저 생성되는 객체, 최상위 객체, window는 브라우저 환경, global은 node.js환경
// 전역객체는 표준 빌트인 객체와 환경에 따른 호스트객체, var 키워드로 선언한 전역 변수와 전역 함수를 프로퍼티로 갖는다
// 전역 객체의 프로퍼티 참조시 window 또는 global을 생략 가능
// 브라우저 환경의 window는 자바스크립트 코드가 분리되어 있어도 하나의 전역을 공유
console.log(global);
console.log(global.parseInt === parseInt); // true

// 빌트인 전역 프로퍼티 - 전역 객체의 프로퍼티
console.log(global.Infinity === Infinity); // true
console.log(global.NaN); // NaN
console.log(global.undefined === undefined); // true

// 빌트인 전역 함수 - 애플리케이션 전역에서 호출 가능한 빌트인 함수, 전역 객체의 메서드
// eval - 표현식이 아닌 문으로 구성된 문자열을 런타임에 실행, 사용시 함수와 객체는 괄호로 둘러싼다
// 여러 문으로 분리되어 있을경우 모든 문을 실행하고 마지막 결과값만 반환
// ... 엄격모드가 아닐시 기존의 스코프를 동적으로 변경한다
let eval1 = eval('console.log(1);console.log(2222);3;');
let eval2 = eval('({a:1})');
let eval3 = eval('(()=>console.log(144411))');
console.log(eval1);
console.log(eval2);
eval3();

// isFinite - 인수를 숫자로 변환 후 유한수이면 true
console.log(isFinite(1)); // true
console.log(isFinite('1')); // true
console.log(isFinite(null)); // true
console.log(isFinite('qwer')); // false
console.log(isFinite(0 / 0)); // false, NaN임으로
console.log(isFinite(1 / 0)); // false, Infinity 임으로



// isNaN - 숫자로 타입 변환 후 NaN인지 검사
console.log(isNaN(0 / 0)); // true
console.log(isNaN(undefined)); // true
console.log(isNaN('qwer')); // true
console.log(isNaN({})); // true
console.log(isNaN(new Date())); // false
console.log(isNaN('')); // false
console.log(isNaN(null)); // false
console.log(isNaN(true)); // false

// parseFloat - 문자열 인수를 부동 소수점 숫자로 반환
console.log(parseFloat('1.000000000000001')); // 됨
console.log(parseFloat(' 2.00 3 qwer ')); // 2
console.log(parseFloat('qwer 1234')); // NaN

// parseInt - 문자열 인수를 정수로 해석
console.log(parseInt('10')); // 4
console.log(parseInt('10qwer', 2)); // 2
console.log(parseInt('10qwer', 8)); // 8
console.log(parseInt('f', 16)); // 16
console.log(parseInt('0xf')); // 15 , 16진수는 가능하나 2진수리터럴과 8진수 리터럴은 진수를 반드시 추가해줘야 함

console.log("asdfasdfasdfasdfasdfadsfdsa");
// .toString() - 숫자를 문자열로
console.log((10).toString(2));
console.log((10).toString(8));
console.log((10).toString(10));
console.log((10).toString(16));

// URI - 인터넷의 자원을 나타내는 유일한 주소(URL,URN 을 포함)
// URL - ? 까지 (path까지)
// URN - // 부터 (호스트부터)
// URL 구성 - 프로토콜:// 호스트:포트/경로?쿼리#Fragment
// encodeURI - 완전한 URI를 문자열로 전달받아 이스케이프 처리를 위해 인코딩
// 인코딩 - URI 문자들을 이스케이프 처리
// 이스케이프 처리 - 아스키 문자 셋으로 변환하는 것, UTF-8 한글 표현은 1문자당 3바이트, 알파벳.숫자.-_.*~*'()문자는 이스케이프 처리에서 제외
// URI 문법 표준에서 URL은 아스키 문자 셋으로만 구성
const uri = 'https://custom.com?name=한글&age=qwer&fff';
const enc = encodeURI(uri);
const dec = decodeURI(uri);
console.log(enc);
console.log(dec);

const uriComp = 'custom.com?name=한글&age=qwer&fff';
let uriComp_enc = encodeURIComponent(uriComp);
let uriComp_dec = decodeURIComponent(uriComp_enc);
console.log(uriComp_enc, uriComp_dec);

// 암묵적 전역 - 선언하지 않은 식별자에 값을 할당시 선언된 전역 변수처럼 동작하는 경우
// ... 전역 객체의 프로퍼티로 추가되고 delete 로 삭제 가능

// this - 자기자신이 속산 객체 또는 자기자신이 생성할 인스턴스를 가리키는 자기참조변수
// ... this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메소드를 참조가능
// ... this가 가리키는 값인 this 바인딩은 함수 호출에 의해 동적으로 결정
// this 바인딩 - 식별자와 값을 연결하는 과정, this와 this가 가리킬 객체를 바인딩, 상황에 따라 가리키는 대상이 다르다
// 엄격모드의 this는 일반 함수 내부에서 undefined가 바인딩
// 일반함수의 this는 함수를 호출한 객체에 의해 결정
// 화살표함수의 this는 정의한 위치의 상위스코프에 의해 결정

// 화살표 함수와 일반 함수의 this 바인딩 차이
let fun_this = function () {
    this.value1 = 0;
    this.in = {
        value1: 1,
        fun1: function () {
            console.log(this.value1); // 일반함수의 this는 호출된 객체를 참조
        },
        fun2: () => {
            console.log(this.value1); // 화살표 함수의 this는 자신이 선언된 위치의 상위 스코프를 가리킴
        }
    }
};
let ins1 = new fun_this();
ins1.in.fun1(); // 1
ins1.in.fun2(); // 0

// this 바인딩은 함수 호출 시점에 결정
let q1 = function () {
    console.log(this);
}
q1(); // undefined - 일반 함수로서 사용, 엄격모드 아닐때 전역객체인 window 또는 global을 가리킨다
new q1(); // q1 { } - 생성자 함수로서 사용
let q1_ob1 = {q1: q1};
q1_ob1.q1(); // { q1: [Function: q1] }- 메서드 호출로 사용
let q2 = {name: 'q2'};
q1.call(q2); // { name: 'q2' } - 간접 호출
q1.apply(q2); // { name: 'q2' } - 간접 호출
q1.bind(q2)(); // { name: 'q2' }  - 간접 호출

// 객체의 메서드는 객체의 속성으로 존재하는 함수, 다른 객체의 프로퍼티에 할당 가능, 일반 변수에 할당하여 일반 변수로서 사용 가능
// ES6의 메서드 축약 표현은 this 바인딩 방식에 영향주지 않는다
// 화살표 함수는 this 바인딩시 상위 스코프의 this를 따른다

let q4 = {
    name: 'q4',
    info1: function () {
        console.log(this.name);
    },
    info2() {
        console.log(this.name);
    },
    info3: () => {
        console.log(this);
    }
}
let q5 = {
    name: 'q5'
}
q4.info1(); // q4
q4.info2(); // q4
q4.info3(); // undefined
q5.info1 = q4.info1;
q5.info2 = q4.info2;
q5.info3 = q4.info3;
q5.info1(); // q5
q5.info2(); // q5
q5.info3(); // undefined

// 프로토타입 내부의 this와 생성자 함수 내부의 인스턴스 프로퍼티의 this도 호출 시점에 this가 바인딩
let q6 = function (name) {
    this.name = name;
    this.info2 = function () {
        console.log(this.name);
    };
    this.info3 = function () {
        console.log(this.__proto__.name);
    };
}
q6.prototype.info1 = function () {
    console.log(this.name);
}
q6.prototype.name = 'qwer'; // 인스턴스에 동일한 이름의 속성이 존재하면 같은 이름의 프로토타입 프로퍼티는 무시된다
let q6_ins1 = new q6('q6_ins1');
let q6_ins2 = new q6('q6_ins2');
q6_ins1.info1(); // q6_ins1
q6_ins2.info1(); // q6_ins2
q6_ins1.info2(); // q6_ins1
q6_ins2.info2(); // q6_ins2
q6_ins1.info3(); // qwer - __proto__ 접근자로 접근 가능
q6_ins2.info3(); // qwer - __proto__ 접근자로 접근 가능


// Function.prototype.call과 Function.prototype.apply의 기능은 함수를 호출하는것, 다른점은 인수를 전달하는 방식
// Function.prototype.bind 는 첫번째 인수로 전달한 값으로 this 바인딩이 교체된 함수를 새로 생성해 반환
let q7 = function () {
    let arr = Array.prototype.slice.call(arguments);
    console.log('arr : ', arr);
    console.log('this.info : ', this.info);
}
let q7_a1 = {info: 'q7_a1'};
q7.apply(q7_a1, [1, 2, 3]); // apply는 인수를 배열로 전달
q7.call(q7_a1, 1, 2, 3) // call은 인수를 쉼표로 구분한 리스트로 전달
q7.bind(q7_a1, 1, 2, 3)(); // 함수를 호출하지 않음으로 명시적으로 호출해야 한다

// bind의 활용 - 메서드의 this와 메서드 내부의 중첩 함수 또는 콜백 함수의 this가 불일치하는 문제를 해결
let q8 = {
    info: 'q8',
    m1(m2) {
        (m2.bind(this))();
    }
}
// q8의 m1 함수의 인수로 함수를 전달하고, 함수를 전달받은 m1의 내부에서 전달받은 함수에 this를 q8로 고정시켜 즉시 실행
q8.m1(function () {
    console.log(this.info);
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('----------------------------------------------------------------------');
// 전역 코드 - 전역에 존재하는 소스코드, 전역에 정의된 함수와 클래스 등의 내부코드는 포함 안됨
// ... 전역 변수 관리 위한 최상위 스코프인 전역 스코프를 생성,
// ... var 키워드로 선언된 전역 변수와 함수 선언문으로 정의된 전역 함수를 전역 객체의 프로퍼티와 메서드로 바인딩하고 참조하기 위해 전역 객체와 연결
// ... 전역 코드 평가시 전역 실행 컨택스트가 생성

// 함수 코드 - 함수 내부에 존재하는 소스코드, 함수 내부에 중첩된 함수와 클래스 등의 내부 코드는 포함 안됨
// ... 지역 스코프를 생성하고 지역변수.매개변수.arguments 객체를 관리
// ... 생성한 지역 스코프를 전역 스코프에서 시작하는 스코프 체인의 일원으로 연결
// ... 함수 코드 평가시 함수 실행 컨택스트가 생성

// eval 코드 - 빌트인 전역 함수인 eval 함수에 인수로 전달되어 실행되는 소스코드
// ... 엄격모드에서 독자적인 스코프를 생성,
// ... eval코드 평가시 eval실행 컨텍스트가 생성

// 모듈 코드 - 모듈 내부에 존재하는 소스코드, 모듈 내부의 함수와 클래스 등의 내부코드는 포함 안됨
// ... 모듈별 독립적 스코프 생성
// ... 모듈 코드 평가시 모듈 실행 컨택스트가 생성

// 소스코드 평가 - 실행컨택스트 생성, 변수.함수 등의 선언문 먼저 실행, 생성된 변수나 함수 식별자를 키로 실행 컨텍스트가 관리하는 스코프에 등록
// 소스코드 실행 - 평가 이후, 선언문 제외한 소스코드가 순차적 실행(런타임시작), 소스코드 실행시 변수나 함수의 참조를 실행 컨택스트가 관리하는 스코프에서 검색해 취득
// ... 변수 값의 병경 등의 소스코드 실행 결과는 다시 실행 컨택스트가 관리하는 스코프에 등록
// 과정 - 소스코드평가(선언문) -> 소스코드실행(선언문 이외의문) <- <<반복>> -> 실행컨택스트
// var x = 1; - 소스코드 평가 과정에서 var x를 실행 하면 변수 식별자 x는 실행 컨택스트가 관리하는 스코프에 등록되고 undefined로 초기화
// ... -> 소스코드 실행 과정에서 x=1;을 실행시 실행 컨택스트가 관리하는 스코프에 x 변수가 등록되어 있는지 확인
// ... -> 등록되어 있다면 값을 할당하고 할당한 결과를 실행 컨택스트에 반환

// 1. 전역코드 평가 - 전역코드 실행 전 평가하는 과정, 선언문만 실행, 생성된 전역 변수와 전역 함수가 실행 컨택스트가 관리하는 전역 스코프에 등록
// ... var 키워드로 선언된 전역 변수와 함수 선언문으로 정의된 전역 함수는 전역 객체의 프로퍼티와 메서드가 된다

// 2. 전역코드 실행 - 전역코드 평가 이후, 전역코드가 순차적으로 실행, 전역 변수에 값이 할당, 함수가 호출
// ... 함수 호출시 실행되던 전역 코드의 실행을 일시 중단하고 코드 실행 순서를 변경해 함수 내부로 진입

// 3. 함수코드 평가 - 함수 호출에 의해 함수 내부로 진입,
// ... 함수코드 평가시 매개변수와 지역 변수 선언문이 먼저 실행되어 생성된 매개변수와 지역 변수가 실행 컨택스트가 관리하는 지역 스코프에 등록
// ... 함수 내부에서 지역 변수처럼 사용되는 arguments객체가 생성되어 지역 스코프에 등록되고 this 바인딩도 결정

// 4. 함수코드 실행 - 함수코드 평가 이후, 함수코드가 순차적으로 실행, 매개변수와 지역변수에 값이 할당,
// ... console.log 메서드가 내부에 존재시 식별자인 console을 스코프 체인 통해 검색 한다면 함수 코드의 지역 스코프는 상위 스코프인 전역 스코프와 연결되어야 하지만
// ... console 식별자는 스코프 체인에 등록되어있지 않고 전역 객체의 프로퍼티로 존재하여 전역 객체의 프로퍼티가 전역 변수처럼 전역 스코프를 통해 검색 가능
// ... log프로퍼티를 console 객체의 프로토타입 체인을 통해 검색하고 console.log 메서드에 인수로 전달된 표현식이 평가
// ... 전달된 인수를 평가하는 과정에서 스코프 체인을 통해 검색,
// ... console.log메서드 실행 종료 후 함수코드 실행 종료 후 이전으로 되돌아가 다시 전역코드 실행

// 1~4 - 코드가 실행되려면 스코프.식별자.코드실행 순서 등의 관리가 필요
// 실행 컨택스트 - 소스 코드를 실행하는데 필요한 환경을 제공하고 코드의 실행 결과를 실제로 관리하는 영역
// ... 식별자(변수.함수.클래스 등)를 등록하고 관리하는 스코프와 실행 순서 관리를 구현한 내부 매커니즘, 모든 코드는 실행 컨택스트 스택으로 관리
// ... 실행 컨택스트는 스택 자료구조로 관리
// ... 실행 컨텍스트 스택의 최상위에 존재하는 실행 컨텍스트는 언제나 현재 실행중인 코드의 실행 컨텍스트
// ... 최상위 실행 컨택스트 - 실행중인 실행 컨텍스트

// 1. 전역 실행 컨텍스트가 생성됨
// 스택: [Global Execution Context]
// 2. 즉시 실행 함수 (IIFE) 실행 컨텍스트가 생성됨
// 스택: [Global, IIFE Execution Context]
// 3. f3() 함수 실행 컨텍스트 생성
// 스택: [Global, IIFE, f3 Execution Context]
// 출력: f3
// 4. f2() 함수 실행 컨텍스트 생성
// 스택: [Global, IIFE, f3, f2 Execution Context]
// 출력: f2
// 5. f1() 함수 실행 컨텍스트 생성
// 스택: [Global, IIFE, f3, f2, f1 Execution Context]
// 출력: f1
// 6. f1() 실행 종료 → 스택에서 제거
// 스택: [Global, IIFE, f3, f2]
// 7. f2() 실행 종료 → 스택에서 제거
// 스택: [Global, IIFE, f3]
// 8. f3() 실행 종료 → 스택에서 제거
// 스택: [Global, IIFE]
// 9. 즉시 실행 함수(IIFE) 실행 종료 → 스택에서 제거
// 스택: [Global]
// 10. 전역 실행 컨텍스트 종료 → 스택 비움
// 스택: []
(() => {
    function f1() {
        console.log('f1')
    };

    function f2() {
        console.log('f2');
        f1();
    };

    function f3() {
        console.log('f3');
        f2();
    };
    f3();
})();

// 렉시컬 환경 - 식별자와 식별자에 바인된 값, 상위 스코프에 대한 참조를 기록하는 자료구조로 실행 컨텍스트를 구성하는 컴포넌트
// ... 스코프와 식별자를 관리
// ... 키와 값을 가진 객체 형태의 스코프를 생성해 식별자로 키를 등록하고 식별자에 바인딩된 값을 관리
// 렉시컬 환경의 환경 레코드 - 스코프에 포함된 식별자를 등록하고 등록된 식별자 바인딩된 값을 관리하는 저장소, 환경 레코드는 소스코드 타입따라 관리하는 내용이 다르다
// 레시컬 환경의 외부 렉시컬 환경에 대한 참조 - 외부 렉시컬 환경에 대한 참조는 상위 스코프를 가리킨다, 외부 렉시컬 환경에 대한 참조를 통해 단방향 링크드 리스트인 스코프 체인을 구현

// 전역 객체도 프로토타입의 일원이다
console.log(global.__proto__.__proto__.constructor); // Function
console.log(global.__proto__.__proto__); // Object

// ** 전역 코드 평가 과정 **
// 1. 전역 실행 컨택스트 생성
// ... 빈 전역 실행 컨택스트를 생성해 실행 컨택스트에 푸시, 이때의 전역 실행 컨텍스트는 실행 컨텍스트 스택의 최상위인 실행중인 컨텍스트가 된다

// 2. 전역 렉시컬 환경 생성
// ... 전역 렉시컬 환경을 생성해 전역 실행 컨텍스트에 바인딩
// ... 렉시컬 환경은 환경 레코드와 렉시컬 환경에 대한 참조로 구성

// 2_1. 전역 환경 레코드 생성
// ... 전역 렉시컬 환경을 구성하는 전역 환경 레코드는 전역스코프.빌트인전역프로퍼티.빌트인전역함수.표준빌트인객체 를 제공

// 2_1_1. 객체 환경 레코드 생성
// ... var 키워드로 선언한 전역 변수와 함수 선언문으로 정의한 함수는 전역 환경 레코드의 객체 환경 레코에 연결된 BindingObject 통해 전역 객체의 프로퍼티와 메서드가 된다
// ... 전역 객체를 가리키는 식별자(window) 없이 전역 객체의 프로퍼티를 참조 가능
// ... 이때의 변수 호이스팅은 변수가 undefined로 초기화
// ... 이때의 함수 호이스팅은 함수 이름과 동일한 이름의 식별자를 전역 객체에 키로 등록하고 생성된 함수 객체를 즉시할당

// 2_1_2. 선언적 환경 레코드 생성
// ... let,const 키워드로 선언한 전역 변수가 여기서 관리,
// ... 전역 객체의 프로퍼티로 참조 불가하고 const로 선언된 키워드는 선언단계와 초기화 단계가 불리되어 진행
// ... 런타임에 실행 흐름이 변수 선언문에 도달하기 전까지 일시적 사각지대(TDZ)에 빠지게 되어 접근 불가

// 2_2. this 바인딩
// ... 전역 환경 레코드의 [[GlobalThisValue]] 내부 슬롯에 this가 바인딩
// ... 일반적으로 전역 코드의 this는 전역 객체를 가리킨다
// ... 전역 코드에서 this 참조시 전역 환경 레코드의 [[GlobalThisValue]] 내부 슬롯에 바인딩 되어있는 객체가 반환
// ... this 바인딩은 전역 환경 레코드와 함수 환경 레코드에만 존재하고 객체 환경 레코드와 선언적 환경 레코드에 존재하지 않는다

// 2_3. 외부 렉시컬 환경에 대한 참조 결정
// ... 현재 평가 중인 소스코드를 포함하는 외부 소스코드의 렉시컬 환경인 상위 스코프를 가리킨다
// ... 단방향 링크드 리스트인 스코프 체인을 구현
// ... 전역 렉시컬 환경이 스코프 체인의 종점에 존재

// ** 전역 코드 실행 과정 **
// ... 전역 코드가 순차적으로 실행
// ... 식별자 결정 - 식별자 검색시 실행중인 실행 컨텍스트에서 식별자를 검색하기 시작, 다른 스코프에 동일한 이름의 식별자가 존재 가능함으로 결정해야 한다
// ... 전역 코드 내부의 실행 컨텍스트에서 식별자를 검색 못할때 상위 스코프로 이동하며 순차적으로 검색
// ... 상위 스코프로 이동시 스코프 체인의 종점인 전역 렉시컬 환경에서도 찾지 못할때 참조 에러 발생

// ** 함수 코드 평가 **
// ... 함수 호출시 전역 코드 실행 중단 후 함수 내부로 코드의 제어권이 이동하고 함수코드를 평가 시작

// 1. 함수 실행 컨텍스트 생성
// ... 함수 실행 컨텍스트 생성 후 함수 렉시컬 환경이 완성된 다음 실행 컨텍스트에 푸시
// ... 함수 실행 컨텍스트는 실행 컨텍스트의 최상위인 실행 중인 컨텍스트가 된다

// 2. 함수 렉시컬 환경 생성
// ... 함수 렉시컬 환경 생성 후 함수 실행 컨텍스트에 바인딩
// ... 함수 렉시컬 환경도 환경 레코드와 외부 렉시컬 환경에 대한 참조로 구성

// 2_1. 함수 환경 레코드 생성
// ... 매개변수, arguments 객체, 함수 내부에서 선언한 지역 변수와 중첩 함수를 등록하고 관리

// 2_2. this 바인딩
// ... 함수 환경 레코드의 [[ThisValue]] 내부 슬롯에 this가 바인딩, 바인딩될 객체는 함수 호출 방식 따라 결정

// 2_3. 외부 렉시컬 환경에 대한 참조 결정
// ... 함수 정의가 평가된 시점에 실행중인 실행 컨텍스트의 렉시컬 환경의 참조가 할당
// ... 함수가 전역코드에 선언되었다면 전역코드 평가 시점에 평가되어 함수의 외부 렉시컬 환경에 대한 참조에는 전역 렉시컬 환경의 참조가 할당
// ... 함수는 정의된 위치로 상위 스코프가 결정
// ... 함수 정의를 평가해 함수 객체 생성시 함수의 상위 스코프를 함수 객체의 [[Environment]]에 저장하여 함수 객체의 렉시컬 환경 참조를 구성

// ** 함수 코드 실행 **
// ... 런타임시 함수 내부의 소스코드가 순차적으로 실행
// ... 함수 내부의 식별자가 있다면 식별자 결정을 위해 실행 컨텍스트의 렉시컬 환경에서 식별자를 검색
// ... 만약 식별자를 못 찾았다면 외부 렉시컬 환경에 대한 참조가 가리키는 렉시컬 환경으로 이동해 식별자를 검색

// ** 함수 코드 실행 종료 **
// ... 함수 내부에 더 실행할 코드가 없을때 함수 코드의 실행이 종료되며 실행되던 함수는 실행컨텍스트 스텍에서 팝되어 제거,
// ... 함수 실행 컨텍스트가 제거되어도 함수 렉시컬 환경까지 즉시 소멸되지 않는다
// ... 객체를 포함한 모든 값은 더이상 참조되지 않을 때 가비지 콜렉터에 의해 메모리 공간의 확보가 해제되어 소멸
// ... 함수 실행 컨텍스트 해제 이후 다시 전역 실행 컨텍스트가 실행주인 컨텍스트가 된다
// ... 더이상 실행할 전역 코드가 없다면 전역 코드의 실행이 종료되고
// ... 전역 실행 컨텍스트도 실행 컨텍스트 스택에서 팝되어 실행행 컨텍스트 스택은 텅 빈당

// 블록 레벨 스코프 - 코드 블록이 실행되면 블록 레벨 스코프가 생성, 코드 블록이 반복 될때마다 새로운 렉시컬 환경이 생성 (let,const), var는 함수레벨스코프

// 클로저 - 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다
// 렉시컬 스코프 - 자바스크립트 엔진은 함수를 어디서 호출했는지가 아닌 함수를 어디서 정의했는지에 따라 상위 스코프를 결정하고 이를 렉시컬 스코프(정적스코프) 라 한다
// ... 함수는 내부 슬롯[[Environment]]에 자신이 정의된 환경인 상위 스코프의 참조를 저장, 저장된 상위 스코프의 참조는 현재 실행 중인 실행 컨텍스트의 렉시컬 환경을 가리킨다
// ... 전역에 정의된 함수 선언문은 전역코드가 평가되는 시점에 평가되어 함수 객체가 생성되며 함수 객체의 내부슬롯에 실행중인 컨텍스트의 렉시컬 환경인 전역 렉시컬 환경의 참조가 저장
// ... 함수 내부에 정의된 함수 표현식은 외부 함수 코드가 실행되는 시점에 평가되어 함수 객체를 생성되며 함수 객체의 내부슬롯에 실행중인 실행 컨텍스트의 렉시컬 환경인 외부 함수 렉시컬 환경의 참조가 저장

// lex로부터 리턴된 익명 함수가 자신의 렉시컬 환경을 기억하여 lex 함수 내부의 식별자 x에 대해 참조
// 만약 lex 함수 내부에 x가 없었다면 상위 스코프에서 식별자를 찾아 10이 출력된다
// 생명주기 종료된 외부함수의 변수에 접근하는 내부 함수를 클로저라 한다, 자유변수에 묶여있는 함수를 클로저라고도 한다
// 상위 스코프의 어떤 식별자도 참조하지 않는 함수는 최적화 대상이며 상위 스코프를 기억하지 않음으로 클로저가 아니다
// 중첩 함수가 상위 스코프보다 생명주기가 짧아도 클로저가 아님
// 이게 가능한 이유는 내부 함수가 자신의 상위 스코프를 기억하고, 외부함수는 종료시 실행 컨텍스트에서 제거되나 외부함수의 렉시컬 환경이 소멸되지는 않기 때문
// ... 내부함수가 외부함수의 렉시컬 환경을 참조함으로 가비지 컬렉터가 참조되는 메모리 공간을 해제하지 않는다
// 자유변수 - 클로저에 의해 참조되는 상위 스코프의 변수
function lex() {
    let xxx = 0;
    return function () {
        console.log(xxx);
    }
}

let xxx = 10;
let save_lex = lex();
save_lex(); // 0

// 클로저의 활용 - 변수를 은닉하여 의도지 않은 변경을 방지
let lex2 = (function () {
    let hidden = 0;
    return function () {
        console.log(++hidden);
        return hidden;
    }
})();
lex2(); // 1
lex2(); // 2
lex2(); // 3

// 생성자 함수의 클로저
let lex3 = (function () {
    let hidden = 0;

    function lex3() {
    };
    lex3.prototype.plus = function () {
        ++hidden;
        console.log(hidden);
    };
    lex3.prototype.minus = function () {
        --hidden;
        console.log(hidden);
    };
    return lex3;
}());
let lex3_ins = new lex3();
lex3_ins.plus(); // 1
lex3_ins.plus(); // 2
lex3_ins.plus(); // 3
console.log('------------------');
// 함수형 프로그래밍의 클로저
// lex4로부터 함수가 반환될 때마다 새로운 렉시컬 환경이 생성
function lex4(aux) {
    let num = 1;
    return function () {
        num = aux(num);
        console.log(num);
        return num;
    };
}

const lex4_1 = lex4((x) => {
    return ++x;
});
const lex4_2 = lex4((x) => {
    return x *= 10;
});
lex4_1(); // 2
lex4_1(); // 3
lex4_1(); //4
lex4_2(); // 10
lex4_2(); // 100
lex4_2(); // 1000

// 같은 렉시컬 환경을 공유
let lex5 = (function () {
    let num = 1;
    return function (aux) {
        num = aux(num);
        console.log(num);
        return num;
    };
})();
lex5((x) => {
    return x *= -10;
}); // -10
lex5((x) => {
    return x *= -10;
}); // 100
lex5((x) => {
    return x *= -10;
}); // -1000

// 캡슐화 - 객체의 상태를 나타네는 프로퍼티와 프로퍼티를 참조하고 조작하는 메서드를 묶은것
// 은닉화 - 외부 공개 필요없는 구현의 일부를 감추어 접근을 방지해 정보를 보호하고 개체간 결합도를 낮춘다
// 자바스크립트는 정보은닉을 완전하게 지원하지 않는다
let lex6 = (function () {
    let _info1 = 'lex6';

    function lex6(info1) {
        _info1 = info1;
    };
    lex6.prototype.get = function () {
        console.log('_info : ', _info1);
    }
    return lex6;
}());
let lex6_1 = new lex6('lex6_1');
let lex6_2 = new lex6('lex6_2');
lex6_1.get(); // lex6_2, 변경된 정보가 출력

// 클로저 활용
// let 키워드로 선언한 변수 사용시 for 문의 반복 실행마다 새로운 렉시컬 환경이 생성된다
let lex7 = [];
for (let i = 0; i < 10; i++) {
    lex7[i] = function () {
        console.log(`lex7[${i}] : `, i);
    };
}
console.log(lex7);
for (let i = 0; i < 10; i++) {
    lex7[i]();
}

// 클래스 - 기존 프로토타입 기반 패턴을 클래스 기반 패턴처럼 사용할 수 있도록 하며, 생성자 함수보다 엄격히 동작
// ... 클래스를 new 연산자 없이 호출시 에러
// ... 상속을 지원하는 extends 와 super 키워드를 제공
// ... 호이스팅이 발생하지 않는것처럼 동작
// ... 클래스 내의 모든 코드에는 암묵적으로 엄격모드가 지정
// ... 클래스의 생성자,프로토타입메서드,정적메서드 모두 열거되지 않는다
// ... 생성자 함수가 객체를 생성하는 방식과 비교되는 새로운 객체 생성 메커니즘

console.log('--------------------------------------------------------------------');
// 클래스는 함수로 평가되고, 함수 고유의 프로퍼티를 모두 가진다
// 클래스는 런타임 이전 평가되어 함수 객체 생성, 이때 생성된 함수 객체는 constructor이고 생성자 함수이다, 프로토타입도 생성
// 생성자 함수와는 다르게 정의 이전에 참조 불가, 호이스팅이 발생하나 let.const 키워드로 선언된 변수처럼 일시적 사각지대에 의해 정의 이전 접근 불가
// 클래스 몸체에 정의 가능한 메서드는 constructor생성자.프로토타입메서드.정적메서드 3가지
// 클래스에 정의한 constructor은 메서드로 해석되는게 아닌 클래스가 평가되어 생성한 함수 객체 코드의 일부가 된다
// ... 클래스 정의가 평가되면 constructor의 기술된 동작을 하는 함수 객체가 생성된다
// ... 프로토타입의 constructor과 클래스의 constructor은 직접적인 관련이 없다
// 클래스의 constructor은 클래스 내에 최대 한개만 존재 가능하고 생략 가능하며 생략시 암묵적으로 constructor이 정의
// ... constructor 생략한 클래스는 인스턴스 생성시 빈 constructor에 의해 빈 객체를 생성
// ... 클래스로 인스턴스 생성시 생성할 인스턴스의 프로퍼티 설정하려면 constructor 내부에서 this로 프로퍼티를 추가
// ... constructor은 반환문을 갖지 않아야 한다, 만약 반환문으로 명시적으로 객체를 리턴시 암묵적인 this 반환이 무시되고 반환값이 리턴된다
// ... 반환문으로 명시적으로 원시값 리턴시 원시값 반환이 무시되고 암묵적으로 this가 리턴
// 클래스 몸체에 정의한 메서드는 클래스로 생성한 인스턴스의 프로토타입에 존재하는 프로토타입의 메서드가 된다, 인스턴스는 프로토타입 메서드를 상속받아 사용 가능
// ... 클래스는 생성자 함수처럼 프로토타입 기반의 객체 생성 메커니즘이다
// 클래스의 정적 메서드는 클래스로 생성한 인스턴스의 프로토타입 체인상 존재하지 않기 때문에 인스턴스에서 클래스의 정적 메서드 사용 불가
// ... 정적 메서드와 프로토타입 메서드는 자신이 속해있는 프로토타입 체인이 다르다, 내부의 this 바인딩이 다름
// ... 정적 메서드는 클래스로 호출하고 프로토타입 메서드는 인스턴스로 호출
// ... 정적 메서드는 인스턴스 프로퍼티를 참조할 수 없지만 프로토타입 메서드는 인스턴스 프로퍼티를 참조 가능
// 클래스에서 정의한 메서드 특징 - function키워드 생략한 축약표현, 콤마필요없음, 엄격모드실행, 열거불가, 클래스의 내부 메서드는 non-constructor이다
// 인스턴스의 프로퍼티는 항상 public하다
// 접근자 프로퍼티 - 객체의 속성에 값을 직접 저장하지 않고 값을 가져오거나 설정할 때 실행되는 함수로 정의된 프로퍼티
// 클래스 필드는 간단한 값 초기화시 사용
// 클래스 필드에 함수 할당시 프로토타입 메서드가 아닌 인스턴스 메서드가 됨으로 권장되지 않는다
// 클래스 필드와 콘스트럭처의 차이는 콘스트럭처로 인스턴스 생성시 값 초기화가 가능하다는 점이다, 콘스트럭처로 클래스 필드를 초기화 하는것도 가능

// ** 인스턴스 생성과정 **
// 1. 인스턴스 생성과 this 바인딩
// ... new 연산자와 함께 클래스 호출시 constructor의 내부 코드가 실행되며 암묵적으로 빈 객체가 생성되고 이 빈 객체가 클래스가 생성한 인스턴스
// ... 클래스가 생성한 인스턴스의 프로토타입으로 클래스의 prototype 프로퍼티가 가리키는 객체가 생성
// ... 암묵적으로 생성된 빈 객체인 인스턴스는 this에 바인딩되어 constructor 내부의 this는 클래스가 생성한 인스턴스를 가리킴
// 2. 인스턴스 초기화
// ... constructor 내부의 코드가 실행되어 this에 바인딩되어있는 인스턴스를 초기화, this에 바인딩된 인스턴스에 프로퍼티 추가하고 constructor가 전달받은 초기값으로 인스턴스 프로퍼티 초기화
// ... constructor이 생략되었다면 해당 과정도 생략
// 3. 인스턴스 변환
// ... 클래스의 모든 처리가 끝나면 완성된 인스턴스와 바인딩된 this가 암묵적으로 반환

class c1 {
};
// 익명클래스
let c2 = class {
};
// 기명 클래스
let c3 = class cc {
}; // 기명함수 클래스 이름인 cc는 외부 코드에서 접근 불가
class c4 {
    // 인스턴스의 접근자로 접근 불가한 클래스 필드
    #info;
    // 인스턴스의 접근자로 접근 가능한 클래스 필드
    name;
    // 인스턴스에서 접근 가능한 클래스 필드의 메소드 - 프로토타입 메서드가 아니며 각 인스턴스에 추가됨, 주로 화살표 함수를 사용해 콜백함수로서 사용하여 화살표 함수만의 this 바인딩 방식을 활용
    m5 = function () {
        console.log('class 메소드');
    }

    mmmm = () => { // 해당 함수를 인스턴스.mmmm() 형태로 접근해 다른 함수의 매개변수로 전달시 전달 대상의 this.name을 출력하게 된다
        console.log(this.name);
    }

    // 인스턴스에서 접근 불가한 정적 메서드
    static static_m1() {
        console.log('static m2');
    }

    // 인스턴스에서 접근 불가한 정적 필드
    static st_field = 'st_field';


    constructor(info, name, ins) {
        // 클래스필드 초기화
        this.#info = info;
        // 클래스필드 초기화
        this.name = name;
        // 인스턴스 필드 초기화
        this.instance_field = ins;
    }

    // getter
    get get_info() {
        return this.#info; // 내부 변수 반환
    }

    // setter
    set set_info(info) {
        this.#info = info; // 내부 변수에 값 할당
    }

    // 프로토타입 메서드
    m1() {
        console.log(this.get_info); // getter를 통해 _info 접근
    }

    // 프로토타입 메서드
    m2(info) {
        this.set_info = info // setter을 통해 _info 접근
    }

    // 프로토타입 메서드
    m3() {
        console.log(this.name);
    }

    // 프로토타입 메서드
    m4() {
        console.log(this.instance_field);
    }


}

c4.static_m1(); // 스테틱 메서드 사용, 인스턴스 생성 없이 바로 사용 가능
console.log(c4.st_field); // 스태틱 필드 참조, 인스턴스 생성 없이 바로 사용 가능
console.log('c4.name', c4.name);// ???
// c4.m5(); // 접근불가
let c4_ins = new c4('c4_ins', 'eeeee', 'insssss'); // 인스턴스 생성, new 키워드 없다면 에러 발생
c4_ins.m1();
c4_ins.m2('qwer1234');
c4_ins.m1();
c4_ins.m3();
c4_ins.m4();
c4_ins.m5();
console.log(c4_ins.instance_field); // 직접 접근 가능
console.log(c4_ins.name); // 직접 접근 가능
// console.log(c4_ins.#info); // 직접 접근 불가


function ccc() {
};
console.log(ccc.prototype.constructor === ccc); // true
console.log(c4.prototype.constructor === c4); // true
console.log(c4_ins.__proto__ === c4.prototype); // true
console.log(c4_ins.constructor === c4); // true
console.log(c4.prototype.__proto__ === Object.prototype); // true
console.log(c4_ins.__proto__.__proto__ === Object.prototype); // true
console.log(c4.constructor.__proto__ === Function.prototype); // true

// 프로토타입 기반 상속 - 프로토타입 체인을 통해 다른 객체의 자산을 상속
// 클래스 상속 - 상속에 의한 클래스 확장은 기존 클래스를 상속받아 새로운 클래스를 확장하여 정의
// extends - 상속받을 클래스를 정의, 서브클래스-수퍼클래스, 파생클래스-베이스클래스, 자식클래스-부모클래스
// 클래스의 상속도 프로토타입을 통해 상속 관계를 구현
// ... 서로 인스턴스의 프로토타입 체인과 클래스간 프로토타입체인도 생성함으로 프로토타입메서드,정적메서드 모두 상속 가능
// extends 키워드로 생성자 함수를 상속받아 클래스 확장 가능
// extends 키워드 다음에 [[Constructor]] 내부 메서드를 갖는 함수 객체로 평가될 수 있는 모든 표현식을 사용 가능, 동적으로 상속받을 대상을 결정 하능
class c5 {
    constructor(info1,info2) { // constructor을 따로 정의하지 않아도 암묵적으로 constructor(){} 형테로 constructor이 정의된다
        this.info1 =info1;
        this.info2 = info2;
    }
    m1(){console.log(this.info1);}
    static static_m2(){console.log('static_m2');}
}
class c5_ex extends (true ? c5 : Object){ // 조건에 따라 동적으로 상속받을 클래스 결정
    // constructor(...args) { super{...args) } // 자식 클래스에 암묵적으로 해당 생성자가 정의된다, args는 new 연산자와 함께 클래스 호출시 전달한 인수의 리스트
    m2(){console.log(this.info2);}
}
c5_ex.static_m2(); // static_m2
let c5_ins1 = new c5_ex('1234','qwer');
c5_ins1.m1(); // 1234
c5_ins1.m2(); // qwer
console.log(c5_ins1.constructor === c5_ex); // true
console.log(c5_ins1.__proto__ === c5_ex.prototype); // true
console.log(c5_ins1 instanceof c5_ex); // true
console.log(c5_ins1 instanceof c5); // true

// super 키워드 - 함수처럼 호출 가능하고 this와 같이 식별자처럼 참조 가능한 특수한 키워드
// ... super 호출시 수퍼클래스의 constructor를 호출한다
// ... super을 참조하면 수퍼클래스의 메서드를 호출 가능
// 서브 클래스에서 constructor을 생략하지 않은 경우 반드시 super을 호출해야 한다
// ... super 호출 전 this로 상위 클래스의 인스턴스 프로퍼티 참조 불가
// ... super은 반드시 서브 클래스의 constructor 내부에서 호출해야 한다
// 서브클래스는 자신이 직접 인스턴스 생성하지 않고 수퍼클래스에게 인스턴스 생성을 위임한다
// ... 인스턴스는 수퍼클래스가 생성하나 new 연산자와 함께 호출하는건 서브클래스임으로 인스턴스는 new.target가 가리키는 서브클래스가 생성한 것으로 처리
// ... 따라서 생성된 인스턴스의 프로토타입은 서브클래스의 prototype 프로퍼티가 가리키는 객체다
// 서브클래스의 constructor에서 super 미호출시 인스턴스가 생성 안되며 this 바인딩도 불가
class c6 {
    constructor(a) {
        this.a = a;
        console.log('this : ',this); //c6_ex { a: 1 }
        console.log('new.target : ',new.target); //  [class c6_ex extends c6]
    }
    m1(){console.log('c6 m1');}
}
class c6_ex extends c6{
    constructor(a,b) {
        // this.a = 0; // 접근불가
        super(a); // 한칸  밑으로 내리면 에러발생
        this.b = b;
        console.log('c6_EX_THIS : ',this); // super가 반환한 인스턴스가 this에 바인딩, super 이전에 this에 접근불가
    }
    m1(){ // ES6의 축약표현으로 정의된 함수만이 [[HomeObject]] 를 가지며, 이걸 가지는 함수만이 super로 부모의 함수를 불러올 수 있다
        return super.m1(); // 부모클래스의 m1을 호출
    }
}
let c6_ins = new c6_ex(1,2);
console.log(c6_ins); // c6_ex { a: 1, b: 2 }
c6_ins.m1();
console.log(c6_ins instanceof c6_ex); // true
console.log(c6_ins instanceof c6); // true
console.log(c6_ins.__proto__ === c6_ex.prototype); // true
console.log(c6_ins.constructor === c6_ex); // true
console.log(c6_ins.__proto__ === c6.prototype); // false

// 표준 빌트인 생성자 함수 확장
class Arr_custom extends Array{
    static uniq(arr){
        console.log(arr.filter((x,y,z) => z.indexOf(x) === y));
    }
    static average(arr){
        console.log(arr.reduce((x,y) => x + y, 0) / arr.length);
    }
}
Arr_custom.uniq([1,2,3,1,2]); // 1,2,3
Arr_custom.average([0,100]); // 50



































