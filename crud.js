class DB {
    // 세션 초기화
    static session_reset() {
        sessionStorage.clear();
    }

    // 검색결과 임시저장
    static search_value = [];

    // num값 자동증가
    static #num_set() {

        // 세션에서 num 불러오기
        let num = sessionStorage.getItem('num');

        // num이 아직 세션에 저장되지 않았다면 1로 저장후 1리턴
        if (num === null) {
            sessionStorage.setItem('num', 1);
            return 1;
        }

        // 이미 있다면 1 증가된 num을 세션에 저장하고 증가된 값을 리턴
        else {
            num = Number(num);
            sessionStorage.setItem('num', ++num);
            return num;
        }

    };

    // 게시글 구조 생성 함수 - num이 유효하지 않은 값이면 새로운 게시글 작성으로 판단
    static #board(num, title, who, content) {
        // 날짜 생성
        let today = new Date();
        let year = today.getFullYear();
        let month = ('0' + (today.getMonth() + 1)).slice(-2);
        let day = ('0' + today.getDate()).slice(-2);
        let hours = ('0' + today.getHours()).slice(-2);
        let minutes = ('0' + today.getMinutes()).slice(-2);
        let time = `${year}-${month}-${day} ${hours}:${minutes}`;

        // 필드 미 입력시 에러
        if (!title || !who || !content) {
            throw new Error('모든 필드를 입력해야 합니다.');
        }

        // 모든 num, date 제외한 모든 필드는 문자열로 저장
        return (typeof num !== 'number' || num === null) ?
            {
                num: this.#num_set(),
                title:String(title),
                who:String(who),
                content:String(content),
                date: time
            }
            :
            {
                num: num,
                title:String(title),
                who:String(who),
                content:String(content),
                date: '!' + time
            };
    };

    // board 세션 에 데이터 추가
    static #save(board) {

        // data가 배열인지 확인
        if (!Array.isArray(board)) board = [];

        // 갱신된 데이터 세션에 반영
        console.log('save-data',board);
        sessionStorage.setItem('board', JSON.stringify(board));
    };

    // board 세션의 모든 데이터 불러오기
    static #read() {

        // 데이터 불러오기, null값일 경우 빈배열 반환
        let data = JSON.parse(sessionStorage.getItem('board')) || [];

        // 리턴
        console.log('read-data',data);
        return data;

    }


    // create
    static create(title, who, content) {

        // 세션의 데이터 불러오기
        let data = this.#read();

        // 새롭게 작성된 게시글
        let new_board = this.#board(null, title, who, content);

        // 기존 데이터에 생성내용 반영
        data.push(new_board);

        // 반영된 데이터 세션에 갱신
        this.#save(data);

    };

    // select - 전체조회
    static select() {
        // 세션의 데이터 불러오기
        return this.#read();
    };

    // update
    static update(num, title, who, content) {

        // 세션의 데이터 불러오기
        let data = this.#read();

        // num에 해당하는 데이터의 인덱스
        let index = data.findIndex(x => x.num === Number(num));

        // 잘못된 인덱스에 접근시
        if(index === -1) {
            console.warn(`유효하지 않은 인덱스에 update 접근 (num: ${num})`);
            return;
        };

        // 업데이트 내용을 반영한 게시글 객체
        let new_board = this.#board(num, title, who, content);

        // 기존 데이터에 생성내용 반영
        data.splice(index, 1, new_board);

        // 반영된 데이터 세션에 갱신
        this.#save(data);
    };

    // delete
    static delete(num) {

        // 세션의 데이터 불러오기
        let data = this.#read();

        // num에 해당하는 데이터의 인덱스
        let index = data.findIndex(x => x.num === Number(num));

        // 잘못된 인덱스에 접근시
        if(index === -1) {
            console.warn(`유효하지 않은 인덱스에 delete 접근 (num: ${num})`);
            return;
        };

        // 기존 데이터에 삭제 내용을 반영
        data.splice(index, 1);

        // 반영된 데이터 세션에 갱신
        this.#save(data);

    };

    // search
    static search(type, value) {

        // 기존 데이터 불러오기
        let data = this.#read();

        // 검색값이 유효하지 않다면 검색 결과 비우고 전체 데이터 리턴
        if (!value || !value.trim()){
            this.search_value = [];
            return data;
        }

        switch (type) {

            // num을 기준으로 정확한 검색 후 검색값 저장
            case 0:
                return this.search_value = data.filter(x => x.num === Number(value));

            // title을 기준으로 검색 후 검색값 저장
            case 1:
                return this.search_value = data.filter(x => x.title.toLowerCase().includes(value.toLowerCase()));

            // content를 기준으로 검색 후 검색값 저장
            case 2:
                return this.search_value = data.filter(x => x.content.toLowerCase().includes(value.toLowerCase()));

            // who를 기준으로 정확한 검색 후 검색값 저장
            case 3:
                return this.search_value = data.filter(x => x.who === value);

            default:
                return data;

        }
    };

    // sort
    static sort(col1, col2) {

        // 기존 데이터 불러오기
        let data = this.#read();

        // 검색결과가 존재한다면 검색 결과로 정렬 수행
        if (this.search_value.length > 0) {
            data = this.search_value;
        }

        switch (col1) {

            // num을 기준으로
            case 0:
                return (col2 === 0) ?
                    data.sort((a, b) => a.num - b.num)
                    : data.sort((a, b) => b.num - a.num);

            // 제목을 기준으로 정렬
            case 1:
                return (col2 === 0)
                    ? data.sort((a, b) => a.title.localeCompare(b.title))
                    : data.sort((a, b) => b.title.localeCompare(a.title));

            // 작성자를 기준으로
            case 2:
                return (col2 === 0)
                    ? data.sort((a, b) => a.who.localeCompare(b.who))
                    : data.sort((a, b) => b.who.localeCompare(a.who));

            // 날짜를 기준으로
            case 3:
                return (col2 === 0)
                    ? data.sort((a, b) => new Date(a.date) - new Date(b.date))
                    : data.sort((a, b) => new Date(b.date) - new Date(a.date));

            default:
                return data;
        }

    };
}


window.DB = DB;

// DB.create('title1','who1','content1');
// DB.create('title2','who2','content2');
// DB.create('title3','who3','content3');
// DB.create('title4','who4','content4');
// DB.create('title5','who5','content5');
//
// console.log('db.select',DB.select());
//
// DB.update(1,1111,2222,3333);
// DB.update(2,4444,5555,6666);
// DB.update(3,7777,8888,9999);
//
// console.log('db.select',DB.select());
//
// DB.delete(4);
//
// console.log('db.select',DB.select());


