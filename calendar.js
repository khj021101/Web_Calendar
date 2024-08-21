
document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    selectable: true,
    events:[],

    dateClick: function(info){
      console.log("Clicked event occurs : date = " + info.dateStr)
      addEventToCalendar({start: info.dateStr});
    }
  });
  calendar.render();
});

function addEventToCalendar(event){
  calendar.addEvent({title: "memo", start: info.dateStr});
} 