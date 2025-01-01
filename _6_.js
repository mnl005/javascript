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





















