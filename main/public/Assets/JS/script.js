document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.querySelector('.ajouter'); 
    const taskInput = document.getElementById('tache'); 
    const taskList = document.querySelector('.listeTache');
    const filterButtons = document.querySelectorAll('div[role="group"] button');

    

    // Fonction pour ajouter une tâche
    function addTask() {
        const taskTitle = taskInput.value; 

        if (taskTitle !== '') { 
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <input type="checkbox" id="tacheFaite">
                <label>${taskTitle}</label>
                <button class="delete-button">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;

            taskList.appendChild(taskItem);
            taskInput.value = '';

            const deleteButton = taskItem.querySelector('.delete-button');
            deleteButton.addEventListener('click', deleteTask);


            const checkbox = taskItem.querySelector('#tacheFaite');
            checkbox.addEventListener('change', toggleTaskStatus);
        }
    }

    addButton.addEventListener('click', addTask);



    // Fonction pour supprimer une tâche
    function deleteTask(event) {
        const taskItem = event.target.closest('li'); 
        taskItem.remove(); 
    }



    // Fonction pour masquer une tâche comme terminée
    function toggleTaskStatus(event) {
        const taskItem = event.target.closest('li'); 
        if (event.target.checked) {
            taskItem.classList.remove('task-done'); 
        } else {
            taskItem.classList.add('task-done'); 
        }
    }

        // Fonction pour filtrer les tâches Toutes/A faire/Faites
        function filterTasks(filterValue) {
            const taskItems = document.querySelectorAll('.listeTache li');
    
            taskItems.forEach(function(item) {
                const checkbox = item.querySelector('input[type="checkbox"]');
                if (filterValue === 'all') {
                    item.style.display = 'flex';
                } else if (filterValue === 'todo' && !checkbox.checked) {
                    item.style.display = 'flex'; 
                } else if (filterValue === 'done' && checkbox.checked) {
                    item.style.display = 'flex'; 
                } else {
                    item.style.display = 'none';
                }
            });
        
                // CSS .btn.active
    filterButtons.forEach(function(button) {
        if (button.dataset.filter === filterValue) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}



    // Clic  bouton  filtre
    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const filterValue = this.dataset.filter; 
            filterTasks(filterValue); 
        });
    });
});