// 모든 체크박스 요소를 선택
const checkboxes = document.querySelectorAll(".checkbox");
const editButtons = document.querySelectorAll(".edit");
const deleteButtons = document.querySelectorAll(".delete");
const addTodoButton = document.querySelector(".add-todo");
const ul = document.querySelector("ul");


// 각 체크박스에 대한 이벤트 리스너 추가
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
      } else {
        pTag.style.textDecoration = "none";
        liElement.style.opacity = 1;
      }
    });
  });

  editButton.addEventListener("click", function () {
    const editInput = document.createElement("input");
    editInput.value = pTag.textContent;

    editInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        pTag.textContent = editInput.value;
        newLi.removeChild(editInput);
      }
    });

    pTag.textContent = "";
    editInput.style.border = "none";
    editInput.style.background = "transparent";
    editInput.style.font = "inherit";
    editInput.style.outline = "none";
    editInput.style.width = "100%";
    pTag.appendChild(editInput);
    editInput.focus();
  });

  deleteButton.addEventListener("click", function () {
    newLi.remove();
  });
});