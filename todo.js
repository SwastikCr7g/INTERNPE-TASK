const addBtn = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const prioritySelect = document.getElementById('priority-select');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const filterButtons = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clear-completed-btn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  let filteredTasks = tasks;

  if (currentFilter === 'pending') {
    filteredTasks = tasks.filter(task => !task.done);
  } else if (currentFilter === 'completed') {
    filteredTasks = tasks.filter(task => task.done);
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.done ? ' done' : '');

    let priorityClass = 'task-priority-' + task.priority;

    li.innerHTML = `
      <span class="task-text" data-index="${index}" contenteditable="false">${task.text}</span>
      <span class="${priorityClass}">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
      <div class="task-buttons">
        <button title="Toggle Done" onclick="toggleDone(${index})">✔️</button>
        <button title="Edit Task" onclick="editTask(${index})">✏️</button>
        <button title="Delete Task" onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;

    taskList.appendChild(li);
  });

  updateTaskCount();
  saveTasks();
}

function updateTaskCount() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;
  taskCount.textContent = `Total: ${total} | Completed: ${completed}`;
}

function addTask() {
  const text = taskInput.value.trim();
  const priority = prioritySelect.value;
  if (text === '') return;

  tasks.push({ text, done: false, priority });
  taskInput.value = '';
  renderTasks();
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function editTask(index) {
  const taskTextSpans = document.querySelectorAll('.task-text');
  const span = taskTextSpans[index];

  if (span.isContentEditable) {
    // Save edit
    span.contentEditable = "false";
    span.classList.remove('editing');
    tasks[index].text = span.textContent.trim();
    renderTasks();
  } else {
    // Enable editing
    span.contentEditable = "true";
    span.classList.add('editing');
    span.focus();

    // Optional: Save on Enter key press
    span.onkeydown = function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        span.contentEditable = "false";
        span.classList.remove('editing');
        tasks[index].text = span.textContent.trim();
        renderTasks();
      }
    }
  }
}

function setFilter(filter) {
  currentFilter = filter;
  filterButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  renderTasks();
}

function clearCompleted() {
  tasks = tasks.filter(task => !task.done);
  renderTasks();
}

// Event Listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') addTask();
});

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    setFilter(button.dataset.filter);
  });
});

clearCompletedBtn.addEventListener('click', clearCompleted);

// Initial render
renderTasks();
