var calendar;
let EventDB = [];
const EVENTDB_KEY = "EVENTLIST"

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    selectable: true,
    events:[],
    eventClick: function(info){
      console.log("Clicked event object occurs : event =  " + info.event.title);
      setCurrentDate(info.event.start.toLocaleDateString('en-CA'))
      loadCurrentTodo();
    },
    dateClick: function(info){
      console.log("Clicked event occurs : date = " + info.dateStr);
      setCurrentDate(info.dateStr)
      loadCurrentTodo();
      //addEventToCalendar({title: "memo", start: info.dateStr});
      //removeEventFromCalendar(info.dateStr)
    }
    
  });
  // const savedEventDB = JSON.parse(localStorage.getItem(EVENTDB_KEY));
  // if(savedEventDB){
  //   console.log(savedEventDB);
  //   EventDB = savedEventDB;
  //   EventDB.forEach(event => calendar.addEvent(event));
  // }
  // calendar.render();
  fetch('./index.php')
    .then(response => response.json())
    .then(data => {
      data.forEach(todo => {
        calendar.addEvent(todo);
      })
    })
    .catch(error => console.error('Error loading todos:', error));
  calendar.render();
});



function addEventToCalendar(event){
  calendar.addEvent(event);
} 
function removeEventFromCalendar(id){
  var calendarEvent = calendar.getEventById(id);
  calendarEvent.remove();
}