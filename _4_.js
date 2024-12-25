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
    f1: function() {
        console.log(this.name);
    },
    f2: () => console.log(this.name),
    f3(){
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
    f2 = function(){
        console.log(this.info1);
    };
    f3(){
        console.log(this.info1);
    }
}
let c1_ob1 = new c1();
c1_ob1.f1(); // c1
c1_ob1.f2(); // c1
c1_ob1.f3(); // c1

console.log('------------------------------------------------');
// c3의 f1은 f1의 상위 스코프인 c3의 constructor의 super과 this를 상속받기 때문에 에러 미발생
class c2 {
    constructor(){
        this.info = 'c2';
    }
    f1(){
        console.log(this.info);
    }
}
class c3 extends c2{
    f1 = () => {
        super.f1();
    }
}
let c3_ob = new c3();
c3_ob.f1();

// Rest 파라미터 - 함수에 전달된 인수들의 목록을 배열로 전달받는다






























