; (function () {
    "use strict"

    //Armazenamento do DOM em variáveis
    const form = document.querySelector("#form");
    const inputTask = document.querySelector("#inputTask");
    const submitBtn = document.querySelector("#submitBtn");
    const ul = document.querySelector("#taskList");
    //Fim armazenamento do DOM em variáveis

    //Obj lista
    const taskListArray = [
        {
            name: "Teste1",
            completed: true,
        }
    ]
    //Fim Obj lista

    //Event listeners
    form.addEventListener("submit", e => {
        e.preventDefault();
        if (!inputTask.value) return;
        const obj = createObject(inputTask.value);
        renderLis(taskListArray);
    })

    ul.addEventListener("click", e => {
        const el = e.target;
        const li = el.parentElement;
        const taskName = li.querySelector(".taskName").value;
        const arrIndex = taskListArray.indexOf(taskListArray.filter(function (obj) {
            return obj.name === taskName;
        })[0]);

        if (el.hasAttribute('btnActionRemove')) {
            taskListArray.splice(arrIndex, 1);
            el.parentElement.remove(li);
        }

        /*
        if (el.hasAttribute('btnActionEdit')) {
            if (li.querySelector(".taskName").disabled === true) {
                li.querySelector(".taskName").disabled = false
            } else {
                li.querySelector(".taskName").disabled = true   
            }
            
            taskListArray.forEach((element, index) => {
                if (index === arrIndex){
                    element.name = taskName;
                }
            });

            //console.log(taskListArray[arrIndex])
            //console.log(typeof taskName)
            //console.log(taskListArray[arrIndex].name)
            //taskListArray[arrIndex].name = taskName;
        }
        */

        if (el.hasAttribute('btnActionCheck')) {
            taskListArray[arrIndex].completed = !taskListArray[arrIndex].completed;
            renderLis(taskListArray);
        }
    })
    //Fim event listeners

    //Funções
    function createObject(name) {
        let obj = {
            name: name,
            completed: false,
        };
        taskListArray.push(obj);
        return obj;
    };

    function createLi(obj) {
        let li = document.createElement("li");
        li.classList.add("taskLi");
        let checkBtn = document.createElement("i");
        checkBtn.setAttribute("class", "fa-sharp fa-solid fa-square icon")
        checkBtn.setAttribute("btnActionCheck", "true")
        if (obj.completed) {
            checkBtn.classList.replace("fa-square", "fa-square-check");
        }
        let input = document.createElement("input");
        input.classList.add("taskName");
        input.setAttribute("type", "text");
        input.setAttribute("disabled", "true");
        input.value = obj.name;
        let editBtn = document.createElement("i");
        editBtn.setAttribute("class", "fa-sharp fa-solid fa-pen-to-square icon")
        editBtn.setAttribute("btnActionEdit", "true")
        let remove = document.createElement("i");
        remove.setAttribute("class", "fa-solid fa-trash-can icon")
        remove.setAttribute("btnActionRemove", "true")

        li.appendChild(checkBtn);
        li.appendChild(input);
        li.appendChild(editBtn);
        li.appendChild(remove);

        return li;
    };

    function renderLis(arr) {
        ul.innerHTML = "";
        arr.forEach(element => {
            const li = createLi(element);
            ul.appendChild(li);
        });
    }
    //Fim Funções


})()