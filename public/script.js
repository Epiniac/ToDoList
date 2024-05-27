document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.querySelector('.ajouter'); 
    const taskInput = document.getElementById('tache'); 
    const taskList = document.querySelector('.listeTache');
    const filterButtons = document.querySelectorAll('div[role="group"] button');
  
    // Ajouter une Tâche
    function addTask() {
      const taskTitle = taskInput.value;
  
      if (taskTitle!== '') {
        fetch('/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: taskTitle }),
        })
        .then((response) => response.json())
        .then((data) => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
              <input type="checkbox" id="tacheFaite">
              <label>${data.title}</label>
              <button class="delete-button">
                ❌
              </button>
            `;
            taskList.appendChild(taskItem);
            taskInput.value = '';
  
            const deleteButton = taskItem.querySelector('.delete-button');
            deleteButton.addEventListener('click', deleteTask);
  
            const checkbox = taskItem.querySelector('#tacheFaite');
            checkbox.addEventListener('change', toggleTaskStatus);
          })
        .catch((error) => {
            console.error('Error:', error);
          });
      }
    }
  
    addButton.addEventListener('click', addTask);
  
    // Supprimer une Tâche
    function deleteTask(event) {
      const taskItem = event.target.closest('li'); 
      const taskId = taskItem.dataset.taskId;
  
      fetch(`/tasks/${taskId}`, {
        method: 'DELETE',
      })
      .then((response) => response.json())
      .then(() => {
          taskItem.remove();
       })
      .catch((error) => {
          console.error('Error:', error);
       });
    }
  
    // Statut de la Tâche
    function toggleTaskStatus(event) {
      const taskItem = event.target.closest('li'); 
      const taskId = taskItem.dataset.taskId;
      const checkbox = event.target;
  
      fetch(`/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDone: checkbox.checked }),
      })
      .then((response) => response.json())
      .then(() => {
          if (checkbox.checked) {
            taskItem.classList.add('task-done');
          } else {
            taskItem.classList.remove('task-done');
          }
       })
      .catch((error) => {
          console.error('Error:', error);
       });
    }
  
    // Filtrer les Tâches
    function filterTasks(filterValue) {
      const taskItems = document.querySelectorAll('.listeTache li');
  
      taskItems.forEach(function(item) {
        const checkbox = item.querySelector('input[type="checkbox"]');
        if (filterValue === 'all') {
          item.style.display = 'flex';
        } else if (filterValue === 'todo' &&!checkbox.checked) {
          item.style.display = 'flex'; 
        } else if (filterValue === 'done' && checkbox.checked) {
          item.style.display = 'flex'; 
        } else {
          item.style.display = 'none';
        }
      });
  
      filterButtons.forEach(function(button) {
        if (button.dataset.filter === filterValue) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });
    }
  
    filterButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const filterValue = this.dataset.filter; 
        filterTasks(filterValue); 
      });
    });
  });