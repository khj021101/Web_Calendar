const todoform = document.querySelector("#todoform");
const todoInput = document.querySelector("#todolist_input");
const todoList_ul = document.querySelector("#todolist");
const curDate_p = document.querySelector("#cur_date");
var addEventCounter = 0;
todoform.addEventListener("submit", handleToDoSubmit);

let DBLists = [];
let CurrentDate;
const DBLIST_KEY = "DBLISTS"

function TodoList(date){
    this.date = date;
    this.todos = [];
}

function clearTodoItems(){
    console.log("clearTodoItems is called");
    while(todoList_ul.firstChild){
        todoList_ul.removeChild(todoList_ul.firstChild)
    }
}

function displayTodoItem(curTime, item){
    console.log("displayTodoItem is called")
    const todo_cur_li = document.createElement("li");
    const todo_cur_span = document.createElement("span");
    const todo_remove_btn = document.createElement("button");
    todo_remove_btn.addEventListener("click", function(){
        removeTodoItem(item, curTime, todo_cur_li);
    })
    
    todo_cur_span.innerText = item;
    todo_remove_btn.innerText = 'X';


    todo_cur_li.appendChild(todo_cur_span);
    todo_cur_li.appendChild(todo_remove_btn);
    todoList_ul.appendChild(todo_cur_li);

}

function removeTodoItem(item, id, listItemElement){
    console.log("removeTodoItem is called");
    todoList_ul.removeChild(listItemElement);
    const todoList = DBLists.find(list => list.date === CurrentDate);
    if(todoList){
        todoList.todos = todoList.todos.filter(todo => todo !== item);
        saveDBListInLocalStorage();
    }
    var delEvent = calendar.getEventById(id);
    delEvent.remove();
    localStorage.setItem(EVENTDB_KEY, JSON.stringify(calendar.getEvents()));
    calendar.render();
}
function handleToDoSubmit(parm){
    console.log("handleToDoSummit is called")
    parm.preventDefault();
    const curTodo = todoInput.value;
    console.log("todoInput value : " + curTodo);
    todoInput.value = "";

    curTime = new Date().toISOString();
    displayTodoItem(curTime, curTodo);
    addNewTodo(CurrentDate, curTime, curTodo);
    saveDBListInLocalStorage();

}

function setCurrentDate(date){
    console.log('setCurrentDate - ' + date);
    curDate_p.textContent = date + " 일정";
    CurrentDate = date;
}

function addNewTodo(date, curTime, newTodo){
    console.log("addNewTodo is called");
    addEventCounter = addEventCounter + 1;
    curTodoList = DBLists.find(list => list.date === date)
    if(!curTodoList){
        curTodoList = new TodoList(date);
        DBLists.push(curTodoList);
    }
    curTodoList.todos.push(newTodo);
    curTodoList.todos.sort((a, b) => a.localeCompare(b));
    calendar.addEvent({id: curTime, title: newTodo, start: date});
    localStorage.setItem(EVENTDB_KEY, JSON.stringify(calendar.getEvents()));
}

function saveDBListInLocalStorage(){
    console.log("saveDBListInLocalStorage is called");
    localStorage.setItem(DBLIST_KEY, JSON.stringify(DBLists));

}

function loadCurrentTodo(){
    console.log("loadCurrentTodo is called");
    //todolist를 클리어해준다.
    clearTodoItems();
    // 클릭된 date값이 정해지면 DBlist에서 새로 불러온다.
    const savedDBLists = localStorage.getItem(DBLIST_KEY);

    if(savedDBLists !== null){
        DBLists = JSON.parse(savedDBLists);
    }
    console.log(DBLists);

    if(!DBLists){
        return;
    }
    DBLists.forEach(tlist => {
        if(tlist.date === CurrentDate){
            tlist.todos.sort((a, b) => a.localeCompare(b));
            tlist.todos.forEach(displayTodoItem)
        }
    })

}

function loadTodoInit(){
    console.log("loadTodoInit is called");

    //날짜 초기화
    var today = new Date();
    var formattedToday = today.toISOString().split('T')[0]
    console.log(formattedToday);
    setCurrentDate(formattedToday);
    // DBList 불러오기
    loadCurrentTodo();

}

loadTodoInit();