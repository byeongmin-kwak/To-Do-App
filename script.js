// 모든 체크박스 요소를 선택
const checkboxes = document.querySelectorAll(".checkbox");
const editButtons = document.querySelectorAll(".edit");
const deleteButtons = document.querySelectorAll(".delete");
const addTodoButton = document.querySelector(".add-todo");
const ul = document.querySelector("ul");

// Local Storage에 저장된 To-Do 리스트 불러오기
function loadTodoList() {
  const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
  todoList.forEach(function (todoItem) {
    const newLi = document.createElement("li");
    newLi.innerHTML = `
      <div class="content">
        <input class="checkbox" type="checkbox">
        <p>${todoItem.text}</p>
      </div>
      <div class="content">
        <img class="edit" src="/image/edit.png" alt="">
        <img class="delete" src="/image/delete.png" alt="">
      </div>
    `;

    ul.appendChild(newLi);

    const checkboxes = newLi.querySelectorAll(".checkbox");
    const editButton = newLi.querySelector(".edit");
    const deleteButton = newLi.querySelector(".delete");
    const pTag = newLi.querySelector("p");

    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener("change", function () {
        const liElement = this.closest("li");
        if (this.checked) {
          pTag.style.textDecoration = "line-through";
          liElement.style.opacity = 0.5;

        } else {
          pTag.style.textDecoration = "none";
          liElement.style.opacity = 1;

        }
        updateLocalStorage();
      });
      if (todoItem.checked) {
        checkbox.checked = true;
        pTag.style.textDecoration = "line-through";
        newLi.style.opacity = 0.5;
      }
    });

    editButton.addEventListener("click", function () {
      const editInput = document.createElement("input");
      editInput.value = pTag.textContent;

      editInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          pTag.textContent = editInput.value;
          updateLocalStorage();

        }
      });
      updateLocalStorage();

      pTag.textContent = "";
      editInput.style.border = "none";
      editInput.style.background = "transparent";
      editInput.style.font = "inherit";
      editInput.style.outline = "none";
      editInput.style.width = "250%";
      pTag.appendChild(editInput);
      editInput.focus();
    });

    deleteButton.addEventListener("click", function () {
      newLi.remove();
      updateLocalStorage();
    });
  });
}



checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    
    // 체크박스의 부모 요소로부터 p 태그를 찾음
    const pTag = this.closest(".content").querySelector("p");
    // 부모 li 요소 찾기
    const liElement = this.closest("li"); 
    
    // 체크박스가 체크되었는지 확인
    if (this.checked) {  
      // 텍스트 스타일을 변경하여 실선으로 표시
      pTag.style.textDecoration = "line-through";
      // 배경색 변경
      liElement.style.opacity = 0.5; 

    } 
    else {
      // 체크가 해제되었을 때 텍스트 스타일을 원래대로 변경
      pTag.style.textDecoration = "none";
      // 배경색 변경
      liElement.style.opacity = 1; 

    }
    updateLocalStorage();

  });
});

editButtons.forEach(function (editButton) {
  editButton.addEventListener("click", function () {
    const listItem = editButton.closest("li");
    const pTag = listItem.querySelector("p");

    const editInput = document.createElement("input");
    editInput.value = pTag.textContent;

    editInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        pTag.textContent = editInput.value;
        listItem.removeChild(editInput);
      }
    });
    updateLocalStorage();

    pTag.textContent = '';
    editInput.style.border = "none";
    editInput.style.background = "transparent";
    editInput.style.font = "inherit";
    editInput.style.outline = "none";
    editInput.style.width = "250%";
    pTag.appendChild(editInput); 
    editInput.focus();

  });
});

deleteButtons.forEach(function (deleteButton) {
  deleteButton.addEventListener("click", function () {
    const listItem = deleteButton.closest("li");
    listItem.remove();
    updateLocalStorage();

  });
});

addTodoButton.addEventListener("click", function () {
  const newLi = document.createElement("li");
  newLi.innerHTML = `
    <div class="content">
      <input class="checkbox" type="checkbox">
      <p>New ToDo</p>
    </div>
    <div class="content">
      <img class="edit" src="/image/edit.png" alt="">
      <img class="delete" src="/image/delete.png" alt="">
    </div>
  `;

  ul.appendChild(newLi);

  const checkboxes = newLi.querySelectorAll(".checkbox");
  const editButton = newLi.querySelector(".edit");
  const deleteButton = newLi.querySelector(".delete");
  const pTag = newLi.querySelector("p");

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      const liElement = this.closest("li");

      if (this.checked) {
        pTag.style.textDecoration = "line-through";
        liElement.style.opacity = 0.5;
      } 
      else {
        pTag.style.textDecoration = "none";
        liElement.style.opacity = 1;
      }
      updateLocalStorage();

    });
  });

  editButton.addEventListener("click", function () {
    const editInput = document.createElement("input");
    editInput.value = pTag.textContent;

    editInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        pTag.textContent = editInput.value;
        updateLocalStorage();
      }
    });
    updateLocalStorage();

    pTag.textContent = "";
    editInput.style.border = "none";
    editInput.style.background = "transparent";
    editInput.style.font = "inherit";
    editInput.style.outline = "none";
    editInput.style.width = "250%";
    pTag.appendChild(editInput);
    editInput.focus();
    
  });

  deleteButton.addEventListener("click", function () {
    newLi.remove();
    updateLocalStorage();

  });
  updateLocalStorage();

});


// Local Storage에 To-Do 리스트 저장
function updateLocalStorage() {
  const todoListItems = [];
  const liElements = document.querySelectorAll("li");
  liElements.forEach(function (liElement) {
    const pTag = liElement.querySelector("p");
    const checkbox = liElement.querySelector(".checkbox"); // 추가된 부분
    const isChecked = checkbox.checked; // 추가된 부분
    todoListItems.push({ text: pTag.textContent, checked: isChecked }); // 수정된 부분
  });
  localStorage.setItem("todoList", JSON.stringify(todoListItems));
}

// DOMContentLoaded 이벤트가 발생했을 때 실행되는 함수
document.addEventListener("DOMContentLoaded", function () {
  loadTodoList();
});