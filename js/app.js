// select all Element node
let input = document.querySelector('[ type= text]');
let addTaskBtn = document.querySelector('[ type= submit]');
let allTasksDiv = document.querySelector('.tasks');


// create empty array to storing data from input value 
let arrayOfTasks = [];





//check if the array is an empty or not 
if (localStorage.getItem('tasks')) {
    arrayOfTasks = JSON.parse(localStorage.getItem('tasks'))
}

// trigger funcion to get data from local storage and append it on page
getDataFromLoaclStorage()

// create add task function 
input.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        // check the input field is an empty or not
        if (input.value !== "") {
            //add the tasks ot an empt array of tasks and a paramter is input.value
            addTaskToArray(input.value);
            // reset an input field to empty
            input.value = "";
        }
    }


});
addTaskBtn.addEventListener('click', () => {

    // check the input field is an empty or not
    if (input.value !== "") {
        //add the tasks ot an empt array of tasks and a paramter is input.value
        addTaskToArray(input.value);
        // reset an input field to empty
        input.value = "";
    }



});


// create add task to array function 
function addTaskToArray(taskContent) {
    // create object to sort the data wich coming from input field
    const task = {
            id: Math.floor(Math.random(Date.now()) * 100 + 1), // to create unique id
            textContent: taskContent,
            complated: false
        }
        //push the task data to array
    arrayOfTasks.push(task)
        // add these tasks to page
    addElementToPageForm(arrayOfTasks);
    //add tasks to local storage
    addTasksToLocalStorageFrom(arrayOfTasks);

};

//create function  to add tasks to page
function addElementToPageForm(arrayOfTasks) {


    // reset allTasksDiv to an empty
    allTasksDiv.innerHTML = "";
    // looping on array of tasks
    arrayOfTasks.forEach((task) => {
        //create div of task
        const div = document.createElement('div')
            // add class to this div
        div.className = "task animate__animated animate__bounce fw-light bg-white w-100 p-2 border-secondary border-5 shadow-sm mb-2  d-flex justify-content-between";
        //check if task  is complated or no
        if (task.complated) {
            div.className = "task done fw-light bg-white w-100 p-2 border-secondary border-5 shadow-sm mb-2  d-flex justify-content-between";

        }
        //add id to this div
        div.id = task.id;
        //add and append textNode to this div
        div.appendChild(document.createTextNode(task.textContent));
        // ceate span to add delete btn
        const span = document.createElement('span');
        span.className = 'del fa-solid fa-delete-left text-danger';

        div.appendChild(span);

        //add time to task div
        let today = new Date()

        let month = today.getMonth() + 1;
        let year = today.getFullYear()
        let date = today.getDate()


        let currentDate = `${month}/${date}/${year}`

        let hours = addZero(today.getHours())
        let minuts = addZero(today.getMinutes())
        let second = addZero(today.getSeconds())

        let currentTime = `${hours}:${minuts}:${second}`



        // this function to handle time
        function addZero(num) {
            return num < 10 ? `0${num}` : num
        }



        const timeDiv = document.createElement('div');

        timeDiv.className = "time";

        timeDiv.innerHTML = `${currentTime} ${currentDate} `;


        div.insertBefore(timeDiv, span)



        //add the div to allTasksDiv
        allTasksDiv.appendChild(div)


    })

}

//create functio to add tasks to local storage
function addTasksToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem('tasks', JSON.stringify(arrayOfTasks))
};

// create function to get data from loacl storage
function getDataFromLoaclStorage() {
    const data = window.localStorage.getItem('tasks');
    if (data) {
        let tasks = JSON.parse(data);
        // add to page
        addElementToPageForm(tasks)
    }

}

//function to delete elements
allTasksDiv.addEventListener('click', (ele) => {
    //delete the task from the local storage
    deleteTaskWith(ele.target.parentNode.getAttribute('id'))

    //check if the class list contain
    if (ele.target.classList.contains('del')) {
        //delete the task from the page
        ele.target.parentElement.remove();
    }

    //toggle done class 
    if (ele.target.classList.contains('task')) {
        ele.target.classList.toggle('done');
    }

    // toggle complated task
    toggleStutsTaskWith(ele.target.getAttribute('id'))

})

//function to delete the task from local storage
function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId)
    addTasksToLocalStorageFrom(arrayOfTasks)

}

//function to update complated stuts

function toggleStutsTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].complated == false ? (arrayOfTasks[i].complated = true) :
                (arrayOfTasks[i].complated = false)
        }
    }
}






ScrollReveal().reveal('.headline');
ScrollReveal().reveal('.tagline', { delay: 500 });
ScrollReveal().reveal('.punchline', { delay: 2000 });