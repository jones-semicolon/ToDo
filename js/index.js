const input = document.querySelector('input[type="text"]');
const form = document.querySelector("form");
const list = document.querySelector("section.pending > .lists");
const removeBtn = document.querySelectorAll("i");
const total = document.querySelector("section.pending>.top>h5+h5");
let tasks = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  input.value && addTask(input.value);
});

function addTask(val) {
  const item = document.createElement("div");
  const checkBox = document.createElement("input");
  const removeIcon = document.createElement("i");
  removeIcon.classList.add("fa", "fa-times");
  checkBox.setAttribute("type", "checkbox");
  const div = document.createElement("div");
  div.innerText = val;
  item.classList.add("item");
  list.appendChild(item);
  item.appendChild(checkBox);
  item.appendChild(div);
  item.appendChild(removeIcon);
  item.id = tasks.length;
  tasks.push({
    id: tasks.length,
    content: val,
    status: "pending",
  });
  input.value = "";
  total.innerText = `${
    tasks.filter((task) => task.status === "completed").length
  }/${tasks.length}`;
  removeIcon.addEventListener("click", (e) => {
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    tasks.splice(e.target.id, 1);
    total.innerText = `${
      tasks.filter((task) => task.status === "completed").length
    }/${tasks.length}`;
  });
  checkBox.addEventListener("click", (e) => {
    if (e.target.checked) {
      e.target.parentNode.classList.add("complete");
      console.log(e.target.parentNode.id);
      tasks[e.target.parentNode.id].status = "completed";
      complete(e.target.parentNode);
    } else {
      e.target.parentNode.classList.remove("complete");
      tasks[e.target.parentNode.id].status = "pending";
      pending(e.target.parentNode);
    }
    total.innerText = `${
      tasks.filter((task) => task.status === "completed").length
    }/${tasks.length}`;
  });
}

function complete(item) {
  const list = document.querySelector("section.completed > .lists");
  list.appendChild(item);
}

function pending(item) {
  const list = document.querySelector("section.pending > .lists");
  list.appendChild(item);
}
