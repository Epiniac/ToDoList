document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.querySelector('.ajouter'); 
    const taskInput = document.getElementById('tache'); 
    const taskList = document.querySelector('.listeTache');
    const filterButtons = document.querySelectorAll('div[role="group"] button');


    // Fonction pour ajouter une tâche
    function addTask() {
        const taskTitle = taskInput.value.trim(); 

        if (taskTitle !== '') { 
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <input type="checkbox" id="tacheFaite">
                <label>${taskTitle}</label>
                <button class="delete-button">
                    <i class="bi bi-x"></i>
                </button>
            `;

            taskList.appendChild(taskItem);
            taskInput.value = '';

            const deleteButton = taskItem.querySelector('.delete-button');
            deleteButton.addEventListener('click', deleteTask);


            const checkbox = taskItem.getElementById('tacheFaite');
            checkbox.addEventListener('change', toggleTaskStatus);
        }
    }

    addButton.addEventListener('click', addTask);



    // Fonction pour supprimer une tâche
    function deleteTask(event) {
        const taskItem = event.target.closest('li'); 
        taskItem.remove(); 
    }

});