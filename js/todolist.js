const todoform = document.querySelector("#todoform");
const todoInput = document.querySelector("#todolist_input");

todoform.addEventListener("submit", handleToDoSubmit);

function handleToDoSubmit(parm){
    console.log("handleToDoSummit is called")
    parm.preventDefault();
}