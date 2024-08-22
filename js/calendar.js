var calendar;
document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    selectable: true,
    events:[{id: '2024-08-21', title: "21학번", start: "2024-08-21"}, {id: '2024-08-28', title: "14학번", start: "2024-08-28"}],

    dateClick: function(info){
      console.log("Clicked event occurs : date = " + info.dateStr);
      setCurrentDate(info.dateStr)
      loadCurrentTodo();
      //addEventToCalendar({title: "memo", start: info.dateStr});
      //removeEventFromCalendar(info.dateStr)
    }
  });
  calendar.render();
});

function addEventToCalendar(event){
  calendar.addEvent(event);
} 
function removeEventFromCalendar(id){
  var calendarEvent = calendar.getEventById(id);
  calendarEvent.remove();
}