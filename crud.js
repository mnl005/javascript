class TE1000 extends AView {
    constructor() {
        super()

        this.contiKey = '';
    }

    init(context, evtListener) {
        super.init(context, evtListener)

        this.createCkEditor(this.noticeContent.element);
    }

    onInitDone() {
        super.onInitDone()


        //TODO:edit here

    }

    // CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM

    onActiveDone(isFirst) {
        super.onActiveDone(isFirst)

    }

    // 뷰갱신
    grid_data_re() {

        // 그리드뷰 리셋
        this.data_grid.removeAll();
        let radio = this.radio_group.getSelectIndex() - 1;

        // 날짜
        let date1 = this.date1.childComp.date.year + this.date1.childComp.date.month + this.date1.childComp.date.day;
        let date2 = this.date2.childComp.date.year + this.date2.childComp.date.month + this.date2.childComp.date.day;
        console.log(radio, date1, date2);


        theApp.qm.sendProcessByName('TE1000', this.getContainerId(), null,
            function (queryData) { // InBlock 설정
                const inblock1 = queryData.getBlockData('InBlock1')[0];
                inblock1.notice_type = `${radio}`;
                inblock1.start_date = `${date1}`;
                inblock1.end_date = `${date2}`;
                console.log('공지사항 조회 in : ', inblock1);
            },
            function (queryData) { // OutBlock 처리
                const errorData = this.getLastError();
                if (errorData.errFlag == "E") {
                    console.log("Error Data:", errorData);
                    AToast.show('에러가 발생했습니다.');
                    return;
                }

                const outblock1 = queryData.getBlockData('OutBlock1');
                console.log('공지사항 조회 out : ', outblock1);
            });
    }

    // 빈값 검사
    value_check() {
        let title_check = this.title.getText();
        let notice_content = this.noticeContent.getData().replace(/<\/?[^>]+(>|$)/g, "");
        if (!title_check || !notice_content) {
            AToast.show('제목 또는 내용을 입력하세요');
            return false;
        }

    }


    // CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM CUSTOM

    // ?
    createCkEditor(target) {
        return ClassicEditor.create(target, {
            language: 'ko',
            extraPlugins: [customUploadAdapterPlugin],
        })
            .then(editor => {
                editor.editing.view.change(writer => writer.setStyle('height', '200px', editor.editing.view.document.getRoot()))
                this.noticeContent = editor;
            })
            .catch(console.error);

        function customUploadAdapterPlugin(editor) {
            editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                return new UploadAdapter(loader, `${config.SERVER_ADDRESS}:${config.SERVER_PORT}/upload`);
            };
        }
    }


    // 공지사항 조회 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    data_select(comp, info, e) {
        // 갱신
        this.grid_data_re();
    }

    //공지사항 추가 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    data_create(comp, info, e) {
        let this_obj = this;
        theApp.qm.sendProcessByName('TE1011', this.getContainerId(), null,
            function (queryData) {

                // 빈값 검사
                if (this.value_check()) {
                    const inblock1 = queryData.getBlockData('InBlock1')[0];
                    inblock1.notice_content = this_obj.noticeContent.getData().replace(/<\/?[^>]+(>|$)/g, "");
                    console.log('공지사항 추가 in : ', inblock1);
                }
                ;


            },
            function (queryData) { // OutBlock 처리
                const errorData = this.getLastError();
                if (errorData.errFlag == "E") {
                    console.log("Error Data:", errorData);
                    AToast.show('에러가 발생했습니다.');
                    return;
                }


            });

        // 갱신
        this.grid_data_re();
    }


    // 공지사항 선택조회 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    data_select_select(comp, info, e) {


        let this_obj = this;
        let index = info.find('td:first').text();
        theApp.qm.sendProcessByName('TE1010', this.getContainerId(), null,
            function (queryData) {
                // 보내기
                const inblock1 = queryData.getBlockData('InBlock1')[0];
                inblock1.notice_id = index;
                console.log('공지사항 선택조회 in : ', inblock1);

            },
            function (queryData) {
                const errorData = this.getLastError();
                if (errorData.errFlag == "E") {
                    console.log("Error Data:", errorData);
                    AToast.show('에러가 발생했습니다.');
                    return;
                }

                const outblock1 = queryData.getBlockData('OutBlock1');
                let content = outblock1[0].notice_content;
                this_obj.noticeContent.setData(content);

                console.log('공지사항 선택조회 out : ', outblock1);

            });

    }

    // 공지사항 수정 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    data_update(comp, info, e) {


        let this_obj = this;
        theApp.qm.sendProcessByName('TE1012', this.getContainerId(), null,
            function (queryData) {

                // 빈값 검사
                if (this.value_check()) {
                    // 보내기
                    const inblock1 = queryData.getBlockData('InBlock1')[0];
                    inblock1.notice_content = this_obj.noticeContent.getData().replace(/<\/?[^>]+(>|$)/g, "");
                    console.log('공지사항 수정 in : ', inblock1);
                }

            },
            function (queryData) { // OutBlock 처리
                const errorData = this.getLastError();
                if (errorData.errFlag == "E") {
                    console.log("Error Data:", errorData);
                    AToast.show('에러가 발생했습니다.');
                    return;
                }

                const outblock1 = queryData.getBlockData('OutBlock1');


                console.log('공지사항 수정 out : ', outblock1);

            });

        // 갱신
        this.grid_data_re();
    }


    // 공지사항 삭제 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    data_delete(comp, info, e) {


        let this_obj = this;
        theApp.qm.sendProcessByName('TE1013', this.getContainerId(), null,
            function (queryData) {


                const inblock1 = queryData.getBlockData('InBlock1')[0];
                inblock1.notice_content = this_obj.noticeContent.getData().replace(/<\/?[^>]+(>|$)/g, "");
                console.log('공지사항 삭제 in : ', inblock1);

            },
            function (queryData) {

                const errorData = this.getLastError();
                if (errorData.errFlag == "E") {
                    console.log("Error Data:", errorData);
                    AToast.show('에러가 발생했습니다.');
                    return;
                }

                const outblock1 = queryData.getBlockData('OutBlock1');
                console.log('공지사항 삭제 out : ', outblock1);

            });


        // 갱신
        this.grid_data_re();
    }


}







