const inputName = document.getElementById("name");
const inputEmail = document.getElementById("email");
const btnSubmit = document.getElementById("btn");

const randomId = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

if (btnSubmit) {
  btnSubmit.addEventListener("click", () => {
    const myTodo = {
      id: randomId(1, 1000000000),
      name: inputName.value,
      email: inputEmail.value,
    };
    const currentTodoStr = localStorage.getItem("todo");
    if (currentTodoStr) {
      const currentTodo = JSON.parse(currentTodoStr);
      currentTodo.push(myTodo);

      localStorage.setItem("todo", JSON.stringify(currentTodo));
    } else {
      localStorage.setItem("todo", JSON.stringify([myTodo]));
    }
    window.location.href = "index.html";
  });
}

const generateTable = () => {
  const todoListStr = localStorage.getItem("todo");
  if (todoListStr) {
    const todoList = JSON.parse(todoListStr);
    const tbody = document.querySelector("#userTable tbody");
    if (todoList && todoList.length) {
      todoList.forEach((todo, index) => {
        tbody.innerHTML += `
                        <tr>
                            <td>${todo.id}</td>
                            <td>${todo.name}</td>
                            <td>${todo.email}</td>
                            <td><button
                            data-id=${todo.id}
                            class="btn-delete">Delete</button></td>
                        </tr>
                `;
      });
    }
  }
};
generateTable();

const deletedBtns = document.querySelectorAll(".btn-delete");
if (deletedBtns) {
  deletedBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const option = prompt("Do you want to delete(Y/N): ");
      if (option === "y") {
        handleDelete(id);
      }
    });
  });
}

const handleDelete = (id) => {
  const todoListStr = localStorage.getItem("todo");
  if (todoListStr) {
    const todoList = JSON.parse(todoListStr);
    const newTodo = todoList.filter((todo, index) => todo.id + "" !== id);
    localStorage.setItem("todo", JSON.stringify(newTodo));
    window.location.reload();
  }
};
