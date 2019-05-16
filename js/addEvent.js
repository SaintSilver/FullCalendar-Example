/* ****************
 *  새로운 일정 생성
 * ************** */
var newEvent = function (start, end, eventType) {

    $("#contextMenu").hide();
    $('.eventType').text(eventType);
    $('input#title').val("");
    $('#starts-at').val(start);
    $('#ends-at').val(end);
    $('#add-event-desc').val("");
    $('#newEventModal').modal('show');
    $('#calendar-type').val(eventType).prop("selected", true);

    /******** 임시 RAMDON ID - 실제 DB 연동시 삭제 **********/
    var eventId = 1 + Math.floor(Math.random() * 1000);
    /******** 임시 RAMDON ID - 실제 DB 연동시 삭제 **********/

    $('#save-event').unbind();
    //새로운 일정 저장버튼 클릭
    $('#save-event').on('click', function () {

        var title = $('input#title').val();
        var startDay = $('#starts-at').val();
        var endDay = $('#ends-at').val();
        var displayEndDay = $('#ends-at').val();
        var description = $('#add-event-desc').val();
        var type = $('#calendar-type').val();
        var selectColor = $('#add-color').val();

        if (startDay > endDay) {
            alert('끝나는 날짜가 앞설 수 없습니다.');
            return false;
        }

        if (title === '') {
            alert('일정명은 필수입니다.');
            return false;
        }

        var statusAllDay;
        if ($(".allDayNewEvent").is(':checked')) {
            startDay = moment(startDay).format('YYYY-MM-DD');
            endDay = moment(endDay).format('YYYY-MM-DD');
            displayEndDay = moment($('#ends-at').val()).add(1, 'days');
            statusAllDay = true;
        }

        //sample data
        //DB 연동시 ajax call 안으로
        var eventData = {
            _id: eventId,
            title: title,
            start: startDay,
            end: displayEndDay,
            description: description,
            type: type,
            username: '사나',
            backgroundColor: selectColor,
            textColor: '#ffffff',
            allDay: statusAllDay
        };

        $("#calendar").fullCalendar('renderEvent', eventData, true);
        $('#newEventModal').find('input, textarea').val('');
        $('#newEventModal').find('input:checkbox').prop('checked', false);
        $('#ends-at').prop('disabled', false);
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
