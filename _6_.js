import {JSDOM} from 'jsdom';

// DOM - html 문서의 계층적 구조와 정보를 표현하고 이를 제어할 수 있는 API인 프로퍼티와 메서드를 제공하는 트리 자료구조
// ... 노드 객체로 구성된 트리 자료 구조
// <div class="c1">hello</div> - <시작테그 어티리뷰트이름="어티리뷰트값">콘텐츠</종료테그>
// 트리자료구조 - 부모노드와 자식노드로 구성된 노드간 계층적 자료구조, 최상위 노드인 루트노드는 부모가 없고 0개이상의 자식노드를 가지고, 자식없는 노드를 리프노드라 한다
// html문서로부터 DOM을 생성하는 과정 - document -> html -> head(meta,link..) , body(ul,script...) -> li, id='el1' -> 'text'...
// 문서노드 - DOM 트리의 최상위 루트 노드인 document 객체, document 객체는 전역객체의 프로퍼티에 바인딩되어 있다, window.document로 참조가능
// 요소노드 - html 요소를 가리키는 객체, html요소 간의 중첩으로 부자 관계를 가지고 정보를 구조화
// 어트리뷰트 노드 - 어트리뷰트가 지정된 html 요소의 요소 노드와 연결되어 있다, 부모가 없음으로 요소노드의 형재가 아님
// 텍스트노드 - 자식 노드를 가질 수 없는 리프노드, 텍스트 노드에 접근하려면 부모 노드인 요소 노드에 접근 해야 함

// DOM을 구성하는 노드 객체는 표준 빌트인 객체가 아닌 브라우저 환경에서 추가 제공하는 호스트 객체, 노드 객체도 자바스크립트 객체임으로 프로토타입에 의한 상속 구조를 갖는다
// ... Object -> EventTarget -> Node -> Document(HTMLDocument), Element(다수의 HTMLHtmlElement...), Attr, CharacterData(Text,Coment)
// ... 모든 노드 객체는 Object, EventTarget, Node 인터페이스를 상속받는다

// 라이브러리로 가상의 돔 환경 생성
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
// global 객체에 window와 document를 설정
global.window = dom.window;
global.document = dom.window.document;

// HTML 요소 생성
const ele1 = document.createElement('input');
ele1.type = 'text';
ele1.value = '삽입할 텍스트';
document.body.appendChild(ele1);

// 생성한 html 요소 확인
console.log(document.body.innerHTML); // <input type="text">
console.log(document.body.outerHTML); //<body><input type="text"></body>

// 요소 확인
console.log(ele1.outerHTML); // <input type="text">
console.log(ele1.value); // 삽입할 텍스트

// 클래스 상속 체인 확인시 Object.getPrototypeOf 로 확인
// 인스턴스 상속 확인은 __proto__ 로 확인
// ele1 -> HTMLInputElement → HTMLElement → Element → Node → EventTarget -> Object
console.log(
    ele1.__proto__ === window.HTMLInputElement.prototype, // true
    Object.getPrototypeOf(window.HTMLInputElement) === window.HTMLElement, // true
    Object.getPrototypeOf(window.HTMLElement) === window.Element, // true
    Object.getPrototypeOf(window.Element) === window.Node, // true
    Object.getPrototypeOf(window.Node) === window.EventTarget, // true
    window.EventTarget.constructor === window.Function, // true
    window.EventTarget.prototype.__proto__ === window.Object.prototype, // true
    ele1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__ === window.Object.prototype // true - input 요소의 프로토타입 체인
);

// Object - 객체
// EvnetTarget - 이벤트를 발생시키는 객체
// Node - 트리 자료구조의 노드 객체
// Element - 브라우저가 렌더링할 수 있는 웹 문서의 요소를 표현하는 객체
// HTMLElement - 웹 문서의 요소 중에서 HTML 요소를 표현하는 객체
// HTMLInputElement - HTML 요소 중 input 요소를 표현하는 객체
// ... input 요소는 객체를 상속받아 상속받는 객체가 제공하는 인터페이스로 EventTarget.addEventListener 등의 기능을 사용
// ... 노드 타입에 따라 필요한 기능을 제공하는 프로퍼티와 메서드의 집합인 DOM API로 HTML의 구조나 내용 또는 스타일을 동적으로 조작 가능

// ** DOM 상속구조 **
// Object
// └── EventTarget
//     ├── Node
//     │   ├── Document (document 객체)
// │   │   ├── HTMLDocument
//     │   │   ├── XMLDocument
//     │   │   ├── SVGDocument
//     │   │   └── DocumentFragment
//     │   │       ├── ShadowRoot
//     │   │       └── TemplateContent
//     │   ├── DocumentType
//     │   ├── Text
//     │   ├── Comment
//     │   ├── CDATASection
//     │   ├── ProcessingInstruction
//     │   └── Element
//     │       ├── HTMLElement
//     │       │   ├── HTMLHeadElement
//     │       │   ├── HTMLTitleElement
//     │       │   ├── HTMLMetaElement
//     │       │   ├── HTMLLinkElement
//     │       │   ├── HTMLScriptElement
//     │       │   ├── HTMLStyleElement
//     │       │   ├── HTMLBodyElement
//     │       │   ├── HTMLDivElement
//     │       │   ├── HTMLSpanElement
//     │       │   ├── HTMLInputElement
//     │       │   ├── HTMLFormElement
//     │       │   ├── HTMLTableElement
//     │       │   ├── HTMLTableRowElement
//     │       │   ├── HTMLTableCellElement
//     │       │   ├── HTMLImageElement
//     │       │   ├── HTMLAudioElement
//     │       │   ├── HTMLVideoElement
//     │       │   ├── HTMLAnchorElement
//     │       │   ├── HTMLParagraphElement
//     │       │   ├── HTMLSelectElement
//     │       │   ├── HTMLOptionElement
//     │       │   ├── HTMLTextAreaElement
//     │       │   ├── HTMLButtonElement
//     │       │   ├── HTMLLabelElement
//     │       │   ├── HTMLUListElement
//     │       │   ├── HTMLOListElement
//     │       │   ├── HTMLLIElement
//     │       │   ├── HTMLCanvasElement
//     │       │   ├── HTMLIFrameElement
//     │       │   └── HTMLUnknownElement
//     │       ├── SVGElement
//     │       │   ├── SVGSVGElement
//     │       │   ├── SVGRectElement
//     │       │   ├── SVGCircleElement
//     │       │   ├── SVGLineElement
//     │       │   ├── SVGPathElement
//     │       │   └── SVGTextElement
//     │       ├── MathMLElement
//     │       └── XMLElement
//     ├── Attr
//     ├── CharacterData
//     │   ├── Text
//     │   ├── Comment
//     │   └── CDATASection
//     ├── ProcessingInstruction
//     ├── ShadowRoot
//     └── Window

// ** 각 인터페이스의 속성과 메서드 **
// Object 인터페이스
// - toString: 객체를 문자열로 변환
// - hasOwnProperty: 객체에 특정 속성이 직접 정의되어 있는지 확인
// 설명: 모든 JavaScript 객체가 공통적으로 가지는 속성과 메서드

// EventTarget 인터페이스
// - addEventListener: 이벤트 리스너를 추가
// - removeEventListener: 이벤트 리스너를 제거
// 설명: DOM 노드와 관련된 이벤트 처리를 담당

// Node 인터페이스
// - childNodes: 모든 자식 노드(텍스트, 주석, 요소 포함)를 반환
// - parentNode: 부모 노드를 반환
// - nodeType: 노드의 유형(1: 요소, 3: 텍스트 등)을 반환
// 설명: DOM의 모든 노드가 공통적으로 가지는 속성과 메서드

// Element 인터페이스
// - children: 요소 노드만 포함하는 HTMLCollection을 반환
// - getAttribute: 요소의 속성 값을 가져옴
// - setAttribute: 요소에 속성을 추가하거나 변경
// 설명: 요소 노드에서 사용할 수 있는 속성과 메서드

// HTMLElement 인터페이스
// - style: 요소의 인라인 스타일을 제어
// - innerHTML: 요소의 내부 HTML을 반환하거나 설정
// - outerHTML: 요소 자체를 포함한 HTML을 반환하거나 설정
// 설명: HTML 요소에서 사용할 수 있는 속성과 메서드

// HTMLDivElement 인터페이스
// - innerText: 요소 내의 텍스트 내용을 반환하거나 설정
// 설명: `<div>` 요소에서만 사용할 수 있는 속성과 메서드

// Document 인터페이스
// - getElementById: ID 속성 값과 일치하는 첫 번째 요소를 반환
// - getElementsByClassName: 지정된 클래스 이름과 일치하는 모든 요소를 반환
// - getElementsByTagName: 지정된 태그 이름과 일치하는 모든 요소를 반환
// - querySelector: CSS 선택자와 일치하는 첫 번째 요소를 반환
// - querySelectorAll: CSS 선택자와 일치하는 모든 요소를 반환
// - createElement: 지정된 태그 이름을 가진 새로운 요소를 생성
// - createTextNode: 텍스트 노드를 생성
// - documentElement: 문서의 루트 요소(`<html>`)를 반환
// - body: 문서의 `<body>` 요소를 반환
// - head: 문서의 `<head>` 요소를 반환
// - title: 문서의 제목을 가져오거나 설정
// - URL: 현재 문서의 URL을 반환
// - cookie: 문서의 쿠키를 읽거나 설정
// - referrer: 문서를 요청한 referrer URL을 반환
// 설명: DOM 트리의 최상위 객체로, 문서 전체에 접근하고 조작하는 데 사용되는 속성과 메서드


// HTMLCollection - getElementByTageName 메서드가 반환하는 객체, 구조와 속성 변경 실시간 반영
// NodeList - querySelectorAll 메서드가 반환하는 객체, 구조 변경 불가, 속성 변경 실시간 반영
// body에 요소 추가 후 조작
// 유사배열 객체이면서 이터러블인 NodeList는 forEach 지원하나 map은 지원 안 됨으로 스프레드 문법 이용
document.body.innerHTML += '<input type="text" value="value1" id="d1">';
document.body.innerHTML += '<ul>ttt<li id="li1" class="c1"></li><li id="li2" class="c1"></li><li id="li3" class="c1">qwer</li></ul>';
let ele2 = document.getElementById('d1');
ele2.style.color = 'red';
console.log(
    document.getElementById('d1').outerHTML, // <input type="text" value="value1" id="d1" style="color: red;">
    '\n',
    window.d1 === document.getElementById('d1'), // true - html요소에 id 부여시 id 값과 동일한 전역 변수가 암묵적으로 선언(재할당 불가)
    '\n',
    [...document.getElementsByTagName('li')].map(e => e.outerHTML), // li태그인 요소를 배열로 반환
    '\n',
    [...document.getElementsByTagName('*')].map(e => e.outerHTML), // 모든 요소를 배열로 반환
    '\n',
    [...document.getElementsByClassName('c1')].map(e => e.outerHTML), // 클래스가 c1인 요소를 배열로 반환
    '\n',
    [...document.querySelectorAll('ul > .c1')].map(e => {
        e.style.color = 'red';
        return e.outerHTML;
    }), // 쿼리셀렉터
    '\n',
    [...document.getElementsByTagName('li')].map(e => e.outerHTML), // NodeList의 구조변경은 안되나 속성변경은 가능
);

// css 선택자를 이용한 요소 노드 선택
// * - 전체 선택자, 모든 요소 선택
// p - 태그 선택자, 모든 p태그 요소를 선택
// #id1 - 아이디 선택자, 아이디 값이 id1인 요소 선택
// .c1 - 클래스 선택자, 클래스가 c1인 요소 모두 선택
// input[type=text] - 어트리뷰터 선택자, input 요소중 타입 속성이 text인 요소 모두 선택
// div p - 후손 선택자, div 요소의 후손중 모든 p 요소 선택
// div > p - 자식 선택자, div 요소의 자식중 모든 p 요소를 선택
// p + ul - 인접 형제 선택자, p 요소의 형제중 p 요소 바로 뒤에 위치하는 ul 요소를 선택
// p ~ ul - 일반 형제 선택자, p 요소의 형제중 p 요소 바로 뒤에 위치하는 모든 ul 요소 선택
// a:hover - 가상 클래스 선택자, hover 상태인 a 요소를 모두 선택
// a::before - 가상 요소 선택자, p 요소의 콘텐츠의 앞에 위치하는 공간을 선택


// Node.prototype
// - 탐색 결과: NodeList 반환 (Static NodeList)
// - 포함 노드: 모든 노드 (텍스트 노드, 주석 노드, 요소 노드 포함)
// - 사용 예시: childNodes, parentNode, nextSibling, previousSibling
// - 주요 특징: DOM 트리를 낮은 수준에서 세밀하게 제어 가능
// - 업데이트 여부: 정적(Static)으로 반환되며, DOM 변경사항이 실시간으로 반영되지 않음, 속성 변경은 실시간으로 반영
// - 사용 목적: 텍스트 노드, 주석 노드, 요소 노드 등 모든 노드를 다루고 싶을 때

// Element.prototype
// - 탐색 결과: HTMLCollection 반환 (Live Collection)
// - 포함 노드: 요소 노드만 포함 (텍스트 노드, 주석 노드 제외)
// - 사용 예시: children, getElementsByClassName, getElementsByTagName
// - 주요 특징: HTML 요소에 효율적으로 접근 가능
// - 업데이트 여부: 라이브(Live)로 반환되며, DOM 변경사항이 실시간으로 반영됨
// - 사용 목적: 요소 노드만 필요하고 DOM 변경사항이 즉시 반영되어야 할 때


// querySelectorAll로 접근시 노드 리스트가 반환되나 querySelector로 접근시 Element가 반환됨
console.log(
    document.body.querySelector('ul').childNodes.length,// 4
    document.body.querySelector('ul').children.length, // 3
    document.body.querySelector('ul').hasChildNodes(), // true
    document.body.querySelector('ul').lastChild
);

// 부모 노드 탐색
console.log(
    document.body.querySelector('li').parentElement, // HTMLUListElement...
);

// 형제 노드 탐색
console.log(
    document.querySelector('body').previousSibling, // 이전 형제 노드
    document.querySelector('head').nextSibling, // 다음 형제 노드
    document.querySelector('body').previousSibling, // 이전 형제 노드
    document.querySelector('head').nextElementSibling, // 다음 형제 노드
);

// 노드 정보 취득
// ... nodeType는 요소노드일때 1, 텍스트노드일때 3, 문서노드일때 9 를 반환
// ... nodeName은 요소노드일때 태그이름반환, 텍스트노드일때 #text반환, 문서노드일때 #document를 반환
// ... nodeValue는 텍스트 노드의 텍스트를 반환
console.log(
    document.querySelector('body').nodeType, // 1
    document.querySelector('body').nodeName, // BODY
    document.body.querySelector('ul').firstChild.nodeValue, // ttt
);

// textContent - 선택된 요소 노드 내부의 모든 영역의 텍스트에 접근, innerText은 textContent 와 유사하나 느림으로 비권장
console.log(
    document.querySelector('body').textContent // ttttqwer
)

// innerHTML로 요소 추가시 기존 요소는 삭제
document.querySelector('ul').innerHTML = '<h1></h1>';
console.log(document.querySelector('ul').innerHTML);

// insertAdjacentHTML 로 요소 추가시 기존요소 제거하지 않고 새로운 요소를 삽입
document.querySelector('ul > h1').insertAdjacentHTML('beforebegin', '<div>1</div>'); // 선택 요소의 바로 앞에 형제로 삽입
document.querySelector('ul > h1').insertAdjacentHTML('afterbegin', '<div>2</div>'); // 선택 요소의 첫번째 자식으로 삽입
document.querySelector('ul > h1').insertAdjacentHTML('beforeend', '<div>3</div>'); // 선택 요소의 마지막 자식으로
document.querySelector('ul > h1').insertAdjacentHTML('afterend', '<div>4</div>'); // 선택 요소의 다음 형재로
console.log(document.querySelector('ul').outerHTML);
// <ul>
//     <div>1</div>
//     <h1>
//         <div>2</div>
//         <div>3</div>
//     </h1>
//     <div>4</div>
// </ul>

// 노드 생성
let ele4 = document.createElement('div'); // 요소 노드 생성
let tele1 = document.createTextNode('qwer') // 텍스트 노드 생성
let ele5 = document.createElement('ul') // 텍스트 노드 생성
ele4.appendChild(tele1); // 자식으로 추가
ele4.insertBefore(ele5, ele4.lastElementChild); // 자식중 마지막 자식의 앞에 추가
console.log(ele4.outerHTML);

// 노드 이동
let ele6 = document.createElement('div');
ele6.innerHTML = `
<div>1</div>
<div>2</div>
<div>3</div>
<div>4</div>
`;
console.log(ele6.outerHTML);
let [chi1, chi2, chi3, chi4] = ele6.children;
ele6.appendChild(chi1);
console.log(ele6.outerHTML);

// 노드 복사 - 깊은 복사 해야 자손 노드가 포함된 사본이 생성됨
console.log(
    '\n',
    ele6.cloneNode(false).outerHTML,
    '\n',
    ele6.cloneNode(true).outerHTML,
);


// 노드 교체
console.log(ele6.outerHTML);
ele6.replaceChild(ele6.firstElementChild, ele6.lastElementChild); // ele6의 마지막 자식을 첫번째 자식으로 교체
console.log(ele6.outerHTML);

// 노드 삭제
ele6.removeChild(ele6.lastElementChild);
console.log(ele6.outerHTML);

// html 어트리뷰트 - html 요소의 태그에 들어있는 키와 값의 쌍으로 표현한 초기상태
// ... 초기 상태는 getAttribute와 setAttribute로 제어
// 글로벌 어트리뷰트 - id, class, style, title, lang, tabindex, draggable, hidden
// 이벤트 핸들러 어트리뷰트 - onclick, onchange, onfocus, onblur, oniput, onkeypress, onkeydown, onkeyup, onmouseover, onsubmit, onload
// ... 모든 어트리뷰트 노드의 참조는 유사 배열 객체이자 이터러블인 NameNodeMap 객체에 담겨 요소 노드의 attributes 프로퍼티에 저장
let ele7 = document.createElement('div');
ele7.setAttribute('value', 10); // 어트리뷰트 셋
console.log(
    ele7.getAttribute('value'), // 어트리뷰트 겟
    ele7.removeAttribute('value'), // 어트리뷰트 삭제
    ele7.hasAttribute('value'), // 어트리뷰트 있는지
);

// DOM 프로퍼티 - input 과 같은 요소는 value등을 프로퍼티로 가지고 있다
// ... 실시간 반영이 필요한경우 .value로 접근 (실시간 접근, 해당 속성을 원래 가지지 않는 요소는 해당 방식으로 접근 불가)
// ... 사용자 입력에 의한 상태 변화와 관계있는 DOM 프로퍼티만 최신 상태 값을 관리한다
// ... 이외의 사용자 입력에 의한 상태 변화와 관계없는 어트리뷰트와 DOM 프로퍼티는 항상 동일한 값으로 연동한다
let ele8 = document.createElement('input');
ele8.value = 10; // 실시간 값 설정
ele8.setAttribute('value', 20); // 초기값 설정
console.log(ele8.value); // 10 - 실시간 으로 접근함으로
console.log(ele8.getAttribute('value')); // 20 - 초기값에 접근함으로

// ** html 어트리뷰트와 DOM 프로퍼티의 비교 **
// html 어트리뷰트는 초기값을, DOM 프로퍼티는 현재 상태를 나타냄
// ... html 어트리뷰트의 값은 항상 문자열, DOM 프로퍼티의 값은 문자열이 아닐수도 있다
// id - 1대1 대응
// class 어트리뷰트 - className, classList 프로퍼티와 대응
// td의 colspan 어트리뷰트는 대응 프로퍼티 존재하지 않음
// textContext 프로퍼티는 대응하는 어트리뷰트 존재하지 않음
// 어트리뷰트 이름은 대소문자 구별 않지만 대응하는 프로퍼티 키는 카멜 케이스를 따른다

// data 어트리뷰트와 dataset 프로퍼티로 html 요소에 정의한 사용자 정의 어트리뷰트와 자바스크립트간 데이터 교환 가능
// dataset - html의 모든 data 어트리뷰트의 정보를 제공하는 DOMStringMap 객체를 반환
// ... DOMStringMap 객체는 data 어트리뷰트의 data- 접두사 다음에 붙인 임의의 카멜 케이스로 변환한 프로퍼티를 가진다
// ... data-*는 html 어트리뷰트
// ... dataset은 해당 data-* 어트리뷰트를 JavaScript에서 DOM 프로퍼티로 접근하기 위한 API
let ele9 = document.createElement('div');
ele9.dataset.d1 = 123;
ele9.dataset.d2 = 456;
console.log(ele9.dataset.d1);
console.log(ele9.outerHTML);

// 스타일 조작
// ... 단위가 필요한 경우 단위 생략시 적용안됨
let ele10 = document.createElement('div');
ele10.style.color = 'red';
ele10.style.width = '100px';
ele10.style.width = '1000';
console.log(ele10.outerHTML);
console.log(window.getComputedStyle(ele10)); // ele10에 적용된 모든 css 스타일 확인
console.log(window.getComputedStyle(ele10).width);

// 클래스 조작
let ele11 = document.createElement('div');
ele11.className = 'ccc';
ele11.classList.add('a1');
ele11.classList.add('a2');
ele11.classList.remove('ccc');
ele11.classList.replace('a1', 'a3');
console.log(
    ele11.classList.item(0),
    ele11.classList.contains('a3'),
    ele11.classList.toggle('q1'), // 인수와 일치하는 클래스 있다면 제거하고, 없다면 추가
    ele11.classList.toggle('q2', false), // 인수와 일치하는 클래스를 제거(false시)
);
console.log(ele11.outerHTML);


// 이벤트 핸들러 - 이벤트 발생시 호출될 함수
// 이벤트 핸들러 등록 - 브라우저에게 이벤트 헨들러의 호출을 위임
// 이벤트 드리븐 프로그래밍 - 프로그램의 흐름을 이벤트 중심으로 제어하는것

// 🖱️ 마우스(Mouse) 이벤트
// click - 마우스 버튼 클릭 시 발생 (mousedown → mouseup → click)
// dblclick - 동일한 요소를 빠르게 두 번 클릭 시 발생
// mousedown - 마우스 버튼을 누를 때 발생
// mouseup - 마우스 버튼을 놓을 때 발생
// mousemove - 마우스를 움직일 때마다 발생
// mouseenter - 마우스가 요소 위로 들어갈 때 발생 (자식 요소로 이동 시 이벤트 발생 X)
// mouseleave - 마우스가 요소 밖으로 나갈 때 발생 (자식 요소로 이동 시 이벤트 발생 X)
// mouseover - 마우스가 요소 위로 들어갈 때 발생 (자식 요소로 이동해도 이벤트 발생)
// mouseout - 마우스가 요소 밖으로 나갈 때 발생 (자식 요소로 이동해도 이벤트 발생)
// contextmenu - 마우스 오른쪽 버튼 클릭 시 발생 (컨텍스트 메뉴 표시)

// 🧑‍💻 키보드(Keyboard) 이벤트
// keydown - 키를 누를 때 발생 (반복 입력 가능)
// keyup - 키를 놓을 때 발생
// keypress - 키를 누를 때 발생 (deprecated, 사용 지양)

// 📱 포커스(Focus) 이벤트
// focus - 요소가 포커스를 받을 때 발생
// blur - 요소의 포커스가 해제될 때 발생
// focusin - 요소 또는 하위 요소가 포커스를 받을 때 발생 (버블링 가능)
// focusout - 요소 또는 하위 요소의 포커스가 해제될 때 발생 (버블링 가능)

// 📦 폼(Form) 이벤트
// submit - 폼이 제출될 때 발생
// reset - 폼이 초기화될 때 발생
// change - 입력 요소의 값이 변경되고 포커스를 잃을 때 발생
// input - 입력 요소의 값이 변경될 때마다 발생 (실시간)

// 📊 윈도우(Window) 이벤트
// load - 리소스가 모두 로드되었을 때 발생
// unload - 페이지가 언로드될 때 발생 (deprecated)
// resize - 윈도우 크기가 변경될 때 발생
// scroll - 사용자가 스크롤할 때 발생
// beforeunload - 사용자가 페이지를 떠나기 직전에 발생

// 🌐 네트워크(Network) 이벤트
// online - 네트워크가 온라인 상태일 때 발생
// offline - 네트워크가 오프라인 상태일 때 발생

// 🎯 드래그(Drag & Drop) 이벤트
// drag - 요소가 드래그되는 동안 지속적으로 발생
// dragstart - 드래그가 시작될 때 발생
// dragend - 드래그가 종료될 때 발생
// dragenter - 드래그된 요소가 유효한 드롭 타겟에 들어갈 때 발생
// dragleave - 드래그된 요소가 드롭 타겟에서 벗어날 때 발생
// dragover - 드래그된 요소가 드롭 타겟 위에 있을 때 발생
// drop - 드래그된 요소가 드롭 타겟에 놓일 때 발생

// 📡 기타 이벤트
// change - 입력값이 변경될 때 발생
// select - 텍스트가 선택되었을 때 발생
// wheel - 마우스 휠을 사용할 때 발생
// error - 오류가 발생했을 때 발생
// animationstart - CSS 애니메이션이 시작될 때 발생
// animationend - CSS 애니메이션이 끝날 때 발생
// animationiteration - CSS 애니메이션이 반복될 때 발생
// transitionend - CSS 트랜지션이 끝날 때 발생

// 함수 호출문을 할당하는 방식
// ... 이벤트 핸들러의 어트리뷰트 값은 암묵적으로 생성될 이벤트 핸들러의 함수 몸체를 의미
let ele12 = document.createElement('div');
ele12.innerHTML = '<button onClick="fun1()"> click </button>';
// function onClick(event){
//     fun1();
// }

// 이벤트 핸들러 프로퍼티에 이벤트 핸들러를 바인딩하는 방식
let ele13 = document.createElement('div');
ele13.onclick = () => console.log('ele13 event');

// addEventListener 메서드로 이벤트 등록
// ... 해당 메서드는 하나 이상의 이벤트 핸들러를 등록 가능, 이벤트 핸들러는 등록 순서대로 동작
// ... 참조가 동일한 이벤트 핸들러 중복 등록시 하나의 핸들러만 등록된다
// ... 삭제시 등록할때와 동일한 인수를 전달하지 않으면 리스너 제거 안됨
// ... 무명 함수 등록시 해당 함수를 참조 할 수 없음으로 삭제 불가
// ... 이벤트 헨들러 프로퍼티 방식으로 등록된 이벤트는 removeEventListener 방식으로 제거 못함으로 ele14.onclick = null 로 제거
// ... 클릭 이벤트에 의해 생성된 이벤트 객체는 이벤트 핸들러의 첫번째 인수로 전달됨
let ele14 = document.createElement('div');
let listener1 = function (event) { // 이벤트 헨들러 어트리뷰트 방식으로 이벤트 객체 전달받기 위해서 첫번째 매개변수의 이름은 event 이어야 한다
    console.log('listener1');
}
ele14.addEventListener('click', listener1);
ele14.removeEventListener('click', listener1);
console.log(ele14.onclick); // null


// 모든 이벤트 객체는 Event를 기반으로 상속됨
// Event → UIEvent → MouseEvent, KeyboardEvent, FocusEvent, WheelEvent, TouchEvent 등
// Event - 모든 이벤트 객체의 기본 클래스
// ├── UIEvent - 사용자 인터페이스 관련 이벤트
// │    ├── MouseEvent - 마우스 이벤트 (click, mouseover 등)
// │    ├── KeyboardEvent - 키보드 이벤트 (keydown, keyup 등)
// │    ├── FocusEvent - 포커스 이벤트 (focus, blur 등)
// │    ├── WheelEvent - 마우스 휠 이벤트 (wheel 등)
// │    ├── TouchEvent - 터치 이벤트 (touchstart, touchend 등)
// │    ├── InputEvent - 입력 이벤트 (input 등)
// ├── ProgressEvent - 진행 상황 관련 이벤트 (load, progress 등)
// ├── DragEvent - 드래그 및 드롭 이벤트 (drag, drop 등)
// ├── ClipboardEvent - 클립보드 이벤트 (copy, paste 등)
// ├── AnimationEvent - CSS 애니메이션 이벤트 (animationstart, animationend 등)
// ├── TransitionEvent - CSS 트랜지션 이벤트 (transitionend 등)
// ├── PointerEvent - 포인터 장치 이벤트 (pointerdown, pointermove 등)
// ├── CompositionEvent - IME 입력 이벤트 (compositionstart, compositionend 등)

// 이벤트 객체 생성
// ... 해당 이벤트 객체는 브라우저 환경에서 이벤트 핸들러가 등록되어 있다면 이벤트 발생시 자동으로 생성되고, 이벤트 핸들러에 인수로서 전달된다
// ... 이벤트 종류마다 다른 이벤트 객체가 생성된다
const event = new window.Event('customEvent');
const uiEvent = new window.UIEvent('uiEvent', {view: window});
const mouseEvent = new window.MouseEvent('click');
const keyboardEvent = new window.KeyboardEvent('keydown');

// 요소 생성
let ele15 = document.createElement('div');
ele15.textContent = 'Click Me!';
document.body.appendChild(ele15);

// 이벤트 객체의 정보 확인
// 체크박스 요소의 정보 확인 - event.target.checked
// 마우스 정보 확인 - event.target.clientX
// 키보드 정보 확인 - evnet.target.value
ele15.addEventListener('click', (event) => {
    console.log({
        constructor: event.constructor.name, // 이벤트 객체의 생성자 이름 (MouseEvent)
        type: event.type, // 이벤트 타입 (click)
        bubbles: event.bubbles, // 이벤트 버블링 여부 (true가 디폴트)
        cancelable: event.cancelable, // 이벤트 취소 가능 여부 (true)
        composed: event.composed, // 섀도우 DOM을 통해 이벤트가 전파되는지 여부
        currentTarget: event.currentTarget, // 현재 이벤트 리스너가 붙은 요소
        defaultPrevented: event.defaultPrevented, // preventDefault()가 호출되었는지 여부
        eventPhase: event.eventPhase, // 이벤트 단계 (1: 캡처, 2: 타겟, 3: 버블링)
        isTrusted: event.isTrusted, // 사용자 입력에 의해 발생한 이벤트인지 여부
        target: event.target, // 이벤트가 발생한 요소
        timeStamp: event.timeStamp, // 이벤트가 발생한 시간 (ms 단위)
        //composedPath: event.composedPath(), // 이벤트 경로 반환
    });
});
// 이벤트 발생
ele15.click();

// 이벤트 전파 - DOM 트리상 존재하는 DOM 요소 노드에서 발생한 이벤트는 DOM 트리를 통해 전파된다
// 캡처링 단계(상위에서 하위로) -> 타깃단계(이벤트가 타겟에 도달) -> 버블링 단계(하위에서 상위로)
// window - document - html - body - ul - li ...
// 캡처는 디폴트가 false, 버블링은 디폴트가 true
// ... 이를 이용해 상위 요소가 다수의 하위 요소의 이벤트를 캡처하도록 이벤트를 위임시 각 하위 요소의 이벤트 등록하는 방식보다 성능상 유리
let ele16 = document.createElement('div');
ele16.innerHTML = '<div><button>click</button></div>';
// 캡처 단계 리스너 등록
ele16.addEventListener('click', (event) => {
    console.log(event.eventPhase); // 1
}, true); // 캡쳐 속성을 설정해야 캡처 가능
// 타겟 단계 리스너 등록
ele16.querySelector('button').addEventListener('click', (event) => {
    console.log(event.eventPhase); // 2
});
// 버블링 단계 리스너 등록
ele16.addEventListener('click', (event) => {
    console.log(event.eventPhase); // 3
});
ele16.querySelector('button').click();

// DOM 요소 기본 동작 중단
let ele17 = document.createElement('button');
ele17.addEventListener('click', event => {
    console.log('ele17');
    event.preventDefault(); // 기본 동작 중단
    event.stopPropagation(); // 이벤트 전파 방지
});
ele17.click();

// 이벤트 핸들러 프로퍼티 방식과, addEventListener 메서드 방식에서 일반함수로 핸들러 등록시 함수 내부의 this는 이벤트를 바인딩한 DOM 요소를 가리킨다
// ... 단 전달하는 함수가 화살표 함수일때 this는 상위 스코프의 this를 가리킨다

// 커스텀 이벤트 - 생성자 함수를 호출해 명시적으로 이벤트 생성하고 임이의 이벤트 타입을 부여하는 것
// 생성된 이벤트 객체는 bubbles 와 cancelable 프로퍼티 디폴트가 false
// dispatchEvent 사용이유 - 컴포넌트간 통신, 상태변경알림, 비즈니스 로직 알림
let ele18 = document.createElement('button');
ele18.addEventListener('custom1', event => {
    console.log('Event Type:', event.type); // 'custom1'
    console.log('Detail:', event.detail); // { message: 'Hello from custom event!' }
});
const customEvent1 = new window.CustomEvent('custom1', {
    detail: { message: 'Hello from custom event!' },
    bubbles: false,
    cancelable: false
});
ele18.dispatchEvent(customEvent1);



conso






























