//CALENDAR VIEW 변경
$('#calendar_view').on('change', function () {
    var defaultCalendarView = $("#calendar_view").val();
    if (defaultCalendarView == 'month') {
        $('#calendar').fullCalendar('changeView', 'month');
    } else if (defaultCalendarView == 'agendaWeek') {
        $('#calendar').fullCalendar('changeView', 'agendaWeek');
    } else if (defaultCalendarView == 'agendaDay') {
        $('#calendar').fullCalendar('changeView', 'agendaDay');
    } else if (defaultCalendarView == 'listWeek') {
        $('#calendar').fullCalendar('changeView', 'listWeek');
    }
    $('#calendar').fullCalendar('changeView', defaultCalendarView);
});

//SELECT 색 변경
$('#add-color, #edit-color').change(function () {
    $(this).css('color', $(this).val());
});

//필터
$('.filter').on('change', function () {
    $('#calendar').fullCalendar('rerenderEvents');
});

$("#type_filter").select2({
    placeholder: "선택..",
    allowClear: true
});

//datetimepicker
$("#starts-at, #ends-at, #editStartDate, #editEndDate").datetimepicker({
    format: 'YYYY-MM-DD HH:mm'
});