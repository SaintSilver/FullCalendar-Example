/* ****************
 *  새로운 일정 생성
 * ************** */
var newEvent = function (start, end, eventType) {
    $('#starts-at').val(start);
    $('#ends-at').val(end);

    $("#contextMenu").hide(); //메뉴 숨김
    $('#calendar-type').val(eventType).prop("selected", true); //선택한 메뉴에 따른 selectbox 수정
    $('#newEventModal').modal('show');

    /******** 임시 RAMDON ID - 실제 DB 연동시 삭제 **********/
    var eventId = 1 + Math.floor(Math.random() * 1000);
    /******** 임시 RAMDON ID - 실제 DB 연동시 삭제 **********/

    //새로운 일정 저장버튼 클릭
    $('#save-event').unbind();
    $('#save-event').on('click', function () {

        var eventData = {
            _id: eventId,
            title: $('input#title').val(),
            start: $('#starts-at').val(),
            end: $('#ends-at').val(),
            description: $('#add-event-desc').val(),
            type: $('#calendar-type').val(),
            username: '사나',
            backgroundColor:  $('#add-color').val(),
            textColor: '#ffffff',
            allDay: false
        };

        if (eventData.start > eventData.end) {
            alert('끝나는 날짜가 앞설 수 없습니다.');
            return false;
        }

        if (eventData.title === '') {
            alert('일정명은 필수입니다.');
            return false;
        }

        var realEndDay;

        if ($(".allDayNewEvent").is(':checked')) {
            eventData.start = moment(eventData.start).format('YYYY-MM-DD');
            //render시 날짜표기수정
            eventData.end = moment(eventData.end).add(1, 'days').format('YYYY-MM-DD');
            //DB에 넣을때(선택)
            realEndDay = moment(eventData.end).format('YYYY-MM-DD');

            eventData.allDay = true;
        }

        $("#calendar").fullCalendar('renderEvent', eventData, true);
        $('#newEventModal').find('input, textarea').val('');
        $('#newEventModal').find('.allDayNewEvent').prop('checked', false);
        $('#newEventModal').modal('hide');

        //새로운 일정 저장
        $.ajax({
            type: "get",
            url: "",
            data: {
                //.....
            },
            success: function (response) {
                
            }
        });
    });
};
