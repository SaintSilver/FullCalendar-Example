/* ****************
 *  일정 편집
 * ************** */
var editEvent = function (event, element, view) {

    $('.popover.fade.top').remove();
    $(element).popover("hide");

    if (event.allDay === true) {
        $('.allDayEdit').prop('checked', true);
    } else {
        $('.allDayEdit').prop('checked', false);
    }

    if (event.end === null) {
        event.end = event.start;
    }

    if (event.allDay === true && event.end !== event.start) {
        $('#editEndDate').val(moment(event.end).subtract(1, 'days').format('YYYY-MM-DD HH:mm'))
    } else {
        $('#editEndDate').val(event.end.format('YYYY-MM-DD HH:mm'));
    }

    $('#editTitle').val(event.title);
    $('#editStartDate').val(event.start.format('YYYY-MM-DD HH:mm'));
    $('#edit-calendar-type').val(event.type);
    $('#edit-event-desc').val(event.description);
    $('#edit-color').val(event.backgroundColor);
    $('#edit-color').css('color', event.backgroundColor);
    $('#editEventModal').modal('show');

    //업데이트 버튼 클릭시
    $('#updateEvent').unbind();
    $('#updateEvent').on('click', function () {

        if ($('#editStartDate').val() > $('#editEndDate').val()) {
            alert('끝나는 날짜가 앞설 수 없습니다.');
            return false;
        }

        if ($('#editTitle').val() === '') {
            alert('일정명은 필수입니다.')
            return false;
        }

        var statusAllDay;
        var startDate;
        var endDate;
        var displayDate;

        if ($(".allDayEdit").is(':checked')) {
            statusAllDay = true;
            startDate = moment($('input#editStartDate').val()).format('YYYY-MM-DD');
            endDate = moment($('input#editEndDate').val()).format('YYYY-MM-DD');
            displayDate = moment($('input#editEndDate').val()).add(1, 'days').format('YYYY-MM-DD');
        } else {
            statusAllDay = false;
            startDate = $('input#editStartDate').val();
            endDate = $('input#editEndDate').val();
            displayDate = endDate;
        }
        var title = $('input#editTitle').val();
        var calendar = $('#edit-calendar-type').val();
        var description = $('#edit-event-desc').val();
        var selectColor = $('#edit-color').val();

        $('#editEventModal').modal('hide');
        event.title = title;
        event.start = startDate;
        event.end = displayDate;
        event.type = calendar;
        event.description = description;
        event.allDay = statusAllDay;
        event.backgroundColor = selectColor;

        $("#calendar").fullCalendar('updateEvent', event);

        //일정 업데이트
        $.ajax({
            type: "get",
            url: "",
            data: {
                //...
            },
            success: function (response) {
                alert('수정되었습니다.')
            }
        });

    });

    // 삭제버튼
    $('#deleteEvent').on('click', function () {
        $('#deleteEvent').unbind();
        $("#calendar").fullCalendar('removeEvents', [event._id]);
        $('#editEventModal').modal('hide');

        //삭제시
        $.ajax({
            type: "get",
            url: "",
            data: {
                //...
            },
            success: function (response) {
                alert('삭제되었습니다.');
            }
        });
    });
};