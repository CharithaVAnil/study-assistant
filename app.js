let tasks = [];
function addTask() {

let subject = document.querySelector('input[type="text"]').value;
let deadline = document.querySelector('input[type="date"]').value;
let priority = document.querySelector('select').value;

let taskList = document.getElementById("taskList");

let li = document.createElement("li");

li.className = priority.toLowerCase();
li.innerHTML = "<input type='checkbox' onchange='this.parentElement.classList.toggle(\"completed\")'> " + subject + " | Deadline: " + deadline + " | Priority: " + priority + " <button onclick='deleteTask(this)'>Delete</button>";
tasks.push(li.innerHTML);
localStorage.setItem("tasks", JSON.stringify(tasks));

taskList.appendChild(li);
updateTaskCount();
document.querySelector('input[type="text"]').value = "";
document.querySelector('input[type="date"]').value = "";
document.querySelector('select').value = "High";

}
function generateTimetable() {

let tasks = document.querySelectorAll("#taskList li");

let timetable = document.getElementById("timetable");

timetable.innerHTML = "<h2>Study Timetable</h2>";

tasks.forEach(function(task, index) {

let session = document.createElement("p");

session.textContent = "Session " + (index + 1) + ": Study " + task.textContent;

timetable.appendChild(session);

});

}
function startStudySession() {

let time = 1500; // 25 minutes (1500 seconds)

let timerDisplay = document.getElementById("timer");
let progressBar = document.getElementById("progressBar");
let timer = setInterval(function() {

let minutes = Math.floor(time / 60);
let seconds = time % 60;

timerDisplay.textContent = "Time Remaining: " + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

time--;
progressBar.value = 1500 - time;
    
if (time < 0) {
clearInterval(timer);
timerDisplay.textContent = "Study Session Complete!";
}

}, 1000);

}
window.onload = function() {

    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(function(task){
        let li = document.createElement("li");
        li.innerHTML = task;
        document.getElementById("taskList").appendChild(li);
    });
updateTaskCount();
}
function updateTaskCount() {
    const tasks = document.querySelectorAll("#taskList li");
    document.getElementById("taskCount").textContent =
        "Total Tasks: " + tasks.length;
}
function deleteTask(button) {
    button.parentElement.remove();
    updateTaskCount();
}
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});



