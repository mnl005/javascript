
// 자바스크립트는 명령형, 함수형, 프로토타입 기반 객체지향 프로그래밍을 지원하는 멀티 패러다임 언어
// 원시 타입 제외한 나머지 값들(함수,배열,정규 표현식)은 객체
// 객체지향 프로그래밍 - 현실의 실체의 속성을 간추려 추상화하는 행위를 프로그래밍에 적용하는 것
// 객체 - 속성을 통해 여러 값을 하나의 단위로 구성한 복잡적인 자료구조
// 상속 - 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것
// 프로그래밍 시 객체의 구성 - 객체의 상태와 동작을 프로퍼티와 메서드로 표현하고 다른 객체로부터 상속받아 다른 객체와의 관계성을 가질 수 있다
// 자바스크립트는 상속을 프로토타입으로 구현


// 생성자 함수로 객체의 관계를 구현
// 인스턴스 생성시 프로퍼티중 이름과 나이는 중복생성 되는게 맞지만, 메서드는 중복생성 될 필요가 없다
function Person1(name,age){
    this.name = name;
    this.age = age;
    this.info = function(){
        console.log('name : ',this.name,' age : ',this.age);
    }
};
// 생성자 함수의 프로토타입에 메서드를 생성한 경우
// 해당 생성자로 생성한 모든 인스턴스는 해당 생성자의 prototype의 모든 프로퍼티와 메서드를 상속받는다
// Person1 생성자 함수의 프로토타입의 속성인 메서드 info_proto는 인스턴스를 여러개 생성해도 중복 생성되지 않는다
Person1.prototype.info_proto = function (){
    console.log('name : ',this.name,' age : ',this.age);
}
let p1 = new Person1('lee',30);
let p2 = new Person1('kim',23);
p2.info_proto();
console.log(p1.hasOwnProperty('info')); // true, 인스턴스에 생성된 메서드
console.log(p1.hasOwnProperty('info_proto')); // false, 생성자 함수로부터 공유받은 메서드
console.log(Person1.prototype.hasOwnProperty('info_proto')); // true, info_proto는 Person1의 프로토타입에서 비롯됨



// 모든 객체는 하나의 프로토타입을 가지며, 모든 프로토타입은 생성자 함수와 연결되어 있다
// 내부 슬롯은 프로퍼티가 아니다
// [[prototype]] 에 직접 접근 불가하나, proto 접근자 프로퍼티로 자신의 내부슬롯 [[prototype]] 에 간접적으로 접근 가능
// proto__는 객체가 직접 소유한 프로퍼티가 아니고 Object.prototype의 프로퍼티이다,
// ... 따라서 모든 객체는 상속을 통해 Object.prototype.__proto__ 접근자 프로퍼티를 사용 가능
let obj1 = {name: 'lee'}; // 객체 리터럴로 생성된 객체
console.log(obj1); // obj1 객체의 프로퍼티 확인
console.log(obj1.__proto__); // obj1 객체의 프로토타입을 확인
console.log(Object.getOwnPropertyDescriptor(Object.prototype,'proto')); // proto 는 Object.prototype의 접근자 프로퍼티임을 확인
console.log(obj1.constructor === Object); // true, obj1을 만든 객체는 Object이다
console.log(obj1.__proto__ === Object.prototype); // true, 자신을 생성한 객체의 프로토타입에 proto__로 접근 가능함을 확인
console.log(obj1.constructor.prototype === Object.prototype); // true, obj1을만든 객체의 프로토타입은 Object의 프로토타입이다

// [[prototype]] 내부 슬롯 값에 간접 접근하는 이유는 상호 참조에 의해 프로토타입 체인의 생성을 방지하기 위함
// 프로토타입 체인은 단방향 링크드 리스트로 구현됨, 프로토타입 체인의 순환참조를 방지하여 체인의 종점이 존재
let obj2 = {};
let obj3 = {};
obj2.__proto__ = obj3;
// obj3.__proto__ = obj2; // 에러발생, 프로토타입에 접근시 proto 접근자로 접근하게 하여 상호 참조를 방지

// proto__접근자 프로퍼티를 직접 사용하는 건 권장되지 않는다
// 모든 객체가 __proto 로 접근 가능한 것은 아님
let obj4 = Object.create(null);
let obj5 = {x: 'obj5'};
console.log(obj4.__proto__); // undefined, Object.proto__를 상속받지 못함
console.log(Object.getPrototypeOf(obj4)); // null, obj4 객체의 프로토타입을 가져오려 했지만 null, obj.__proto__와 같다
Object.setPrototypeOf(obj4,obj5); // obj4.__proto__ = obj5 와 같다, obj4의 프로토타입이 교체
console.log(Object.getPrototypeOf(obj4)); // { x: 'obj5' },  obj5의 프로토타입을 obj4가 물려받은걸 확인


// 함수 객체는 prototype를 직접소유
// 함수 객체만 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다
// ... non-constructor 인 화살표 함수와 ES6 메서드 축약표현으로 정의한 메서드는 prototype를 소유하지 않고 프로토타입도 생성하지 않는다
// proto - 모든 객체가 소유, 값은 프로토타입의 참조, 모든 객체가 사용, 객체가 자신의 프로퍼티에 접근 또는 교체위해 사용
// prototype - constructor이 소유, 값은 프로토타입의 참조, 생성자 함수가 사용, 생성자 함수가 자신이 생성할 인스턴스의 프로토타입을 할당하기 위해 사용

let fun2 = function(){};
let fobj = new fun2();
console.log(fun2.hasOwnProperty('prototype')); // true, 함수 객체가 prototype를 직접 소유함을 확인
console.log(fobj.hasOwnProperty('prototype')); // false, 일반 객체는 prototype를 직접 소유하지 않음을 확인
console.log(fun2.prototype === fobj.__proto__); // true, fobj의 프로토타입은 fun2로부터 물려받음을 확인
console.log(fobj.constructor === fun2); // true, fobj를 생성한 생성자 함수는 fun2임을 확인
console.log(fobj.constructor.prototype === fun2.prototype); // true, fobj을 생성한 생성자 함수의 프로토타입이 fun2의 프로토타입임을 확인
console.log(fun2.prototype.constructor === fun2); // true, fun2의 프로토타입을 생성한 객체는 fun2이다


// Object,Function 생성자 함수로 객체 생성시의 생성자 비교
let ooo = new Object();
let fff = new Function('a','return a*10');
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
let rrr = [1,2,3];
let ffo = function(a){return a;};
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
class obj7 extends Object {};
let obj8 = new obj7;
console.log(obj8); // obj7{}
console.log(obj7.constructor === Object); // false
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
function fff2(){};
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
function custom(){this.name = 'custom'};
let cus = new custom();
console.log(custom.prototype);
console.log(cus.constructor === custom); // true
console.log(cus.constructor.prototype === custom.prototype); // true
console.log(cus.__proto__ === custom.prototype); // true

console.log(custom.prototype.__proto__ === Object.prototype);
console.log(custom.constructor === Function); //true
console.log(custom.constructor.prototype === Function.prototype); // true
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
let eee = {x:1};
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
function Person(name){
    this.name = name;
}
Person.prototype.med1 = function(){
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
// 하위 객체를 통해 상위 객체의 프로토타입의 프로퍼티를 삭제.변경은 불가
let t1 = function(name){
    this.name = name;
}
t1.prototype.m1 = function(){
    console.log('t1.prototype.m1 name : ',this.name);
}
let t1_1 = new t1('t1_1');
// t1의 프로토타입 메서드는 프로퍼티 섀도잉 됨
// t1_1의 인스턴스 메서드는 오버라이딩 됨
t1_1.m1 = function (){
    console.log('t1_1.over',this.name);
}
t1_1.m1(); // 오버라이딩된 메서드가 작동
delete t1_1.m1;
t1_1.m1(); // 프로토타입 메서드가 작동

// 생성자 함수의 프로토타입의 교체 - 생성할 인스턴스의 프로토타입을 교체하는 것
let t2 = function(name){
    this.name = name;
}
t2.prototype = {
    m1(){console.log('t2.m1',this.name);}
}
let t2_1 = new t2('t2_1');
// 생성자 함수는 constructor을 가지지만 프로토타입의 교체로 constructor이 사라짐
console.log(t2_1.constructor === t2); // false
console.log(t2_1.constructor === Object); // true
// constructor를 복구 후 관계 복구
t2.prototype = {
    constructor: t2,
    m1(){console.log('t2.m1',this.name);}
}
t2_1.__proto__ = t2.prototype;
console.log(t2_1.constructor === t2); // true
console.log(t2_1.constructor === Object); // false

console.log('--------------');

// instanceof - 프로토타입 체인의 연결을 순차적으로 평가,
// 생성자 함수로부터 생성된 인스턴스의 .__proto__는 생성 시점에 결정
// ... 중간에 체인이 끊켜도 인스턴스의 프로토타입 체인은 변동되지 않으나, 인스턴스가 참조하는 프로토타입 변경시 연결관계가 변경됨
let t3 = function() {};
let t3_1 = function() {
};
t3_1.prototype = Object.create(t3.prototype);
t3_1.prototype.constructor = t3_1;
let t3_1_1 = function() {
};
t3_1_1.prototype = Object.create(t3_1.prototype);
t3_1_1.prototype.constructor = t3_1_1;
let t3_1_1_instance = new t3_1_1();
console.log(t3_1_1_instance.constructor === t3); // false
console.log(t3_1_1_instance instanceof t3); // true, 연결된 프로토타입 체인을 거슬러 올라가 순차적으로 평가
t3_1.prototype = {};
t3_1_1.prototype = {};
console.log(t3_1_1_instance instanceof t3); // true, 변동없음
t3_1_1_instance.__proto__ = {}; // 강제로 변경
console.log(t3_1_1_instance instanceof t3); // false, 변동됨

console.log('--------------------------');
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
    x: {value:1234, writable: true, enumerable: true, configurable: true}
});
console.log(t4.__proto__ === Object.prototype); // true

// 임의의 객체를 상속받기
let custom_t4 = {x:1,y:2};
t4 = Object.create(custom_t4);
console.log(t4.__proto__ === custom_t4); // true;

// 생성자 함수로부터 상속받기
// t4 = new fun_custom('t4'); 와 같다
let fun_custom = function(name){this.name = name;};
t4 = Object.create(fun_custom.prototype);
t4.name = 't4';
console.log(t4.__proto__ === fun_custom.prototype); // true















