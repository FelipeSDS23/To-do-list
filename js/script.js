; (function () {
    "use strict"

    //Armazenamento do DOM em variáveis
    const form = document.querySelector("#form");
    const inputTask = document.querySelector("#inputTask");
    const ul = document.querySelector("#taskList");
    //Fim armazenamento do DOM em variáveis

    //Obj lista
    const taskListArray = [{name: "Teste1", completed: true,}];
    //Fim Obj lista

    //Event listeners
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!inputTask.value) return;
        const obj = createObject(inputTask.value);
        taskListArray.push(obj);
        renderLis(taskListArray);
    });


    ul.addEventListener("click", e => {
        const el = e.target;
        let li = el.parentElement;
        
        //Qualquer elemento clicado dentro da UL vai retornar no Dom até acha sua LI pai
        if(el.nodeName !== "LI" && el.nodeName !== "P" && el.nodeName !== "UL"){
            while(li.nodeName !== "LI") {
                li = li.parentElement;
            }
        }
        
        let liList = ul.getElementsByTagName("li");
        liList = Array.from(liList);

        const arrIndex = liList.indexOf(li);

        const div = li.querySelector("#editDiv");

        if (el.hasAttribute('btnActionCheck')) {
            taskListArray[arrIndex].completed = !taskListArray[arrIndex].completed;
            renderLis(taskListArray);
        }
        if (el.hasAttribute('btnActionEdit')) {
            div.setAttribute("class", "editDiv showEditDiv");
        }
        if(el.hasAttribute('btnActionConfirm')){
            const editInput = li.querySelector(".editInput").value;
            taskListArray[arrIndex].name = editInput;
            renderLis(taskListArray);
            div.setAttribute("class", "editDiv hideEditDiv");
        }
        if (el.hasAttribute('btnActionRemove')) {
            taskListArray.splice(arrIndex, 1);
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
        return obj;
    };

    function createLi(obj) {
        const li = document.createElement("li");
        li.classList.add("taskLi");
        const checkBtn = document.createElement("i");
        checkBtn.setAttribute("class", "fa-sharp fa-solid fa-square icon");
        checkBtn.setAttribute("btnActionCheck", "true");
        if (obj.completed) {
            checkBtn.classList.replace("fa-square", "fa-square-check");
        }
        const paragraph = document.createElement("p");
        paragraph.classList.add("taskName");
        paragraph.textContent = obj.name;

        const div = document.createElement("div"); 
        div.setAttribute("class", "editDiv hideEditDiv");
        div.setAttribute("id", "editDiv");
        const input = document.createElement("input");
        input.setAttribute("class", "editInput");
        const confirmEditBtn = document.createElement("i"); 
        confirmEditBtn.setAttribute("class", "fa-solid fa-check icon");
        confirmEditBtn.setAttribute("btnActionConfirm", "true");
        div.appendChild(input);
        div.appendChild(confirmEditBtn);

        const editBtn = document.createElement("i");
        editBtn.setAttribute("class", "fa-sharp fa-solid fa-pen-to-square icon");
        editBtn.setAttribute("btnActionEdit", "true");
        const removeBtn = document.createElement("i");
        removeBtn.setAttribute("class", "fa-solid fa-trash-can icon");
        removeBtn.setAttribute("btnActionRemove", "true");

        li.appendChild(checkBtn);
        li.appendChild(paragraph);
        li.appendChild(div);
        li.appendChild(editBtn);
        li.appendChild(removeBtn);

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
