const input = document.getElementById('inp');
const dateTimeInput = document.getElementById('datetime');
const bucketDiv = document.getElementById("bucket");
const bucketList = [];

function add() {
    if (input.value.trim() === '') {
        alert("Please add something");
        return;
    }

    const task = {
        text: input.value,
        dateTime: dateTimeInput.value || 'No date set',
        completed: false
    };

    bucketList.push(task);
    displayData();

    input.value = "";
    dateTimeInput.value = "";
}

function displayData() {
    bucketDiv.textContent = '';
    bucketList.forEach((task, i) => {
        const listItem = document.createElement("li");
        listItem.classList.add("listItem");
        if (task.completed) listItem.classList.add("completed");

        const para = document.createElement("p");
        para.textContent = `${task.text} (${task.dateTime})`;

        const actions = document.createElement("div");
        actions.classList.add("actions");

        const completeButton = document.createElement("button");
        completeButton.textContent = "✔";
        completeButton.classList.add("complete");
        completeButton.onclick = function () {
            task.completed = !task.completed;
            displayData();
        };

        const editButton = document.createElement("button");
        editButton.textContent = "✏";
        editButton.classList.add("edit");
        editButton.onclick = function () {
            const newText = prompt("Edit your task:", task.text);
            if (newText !== null && newText.trim() !== '') {
                task.text = newText;
                displayData();
            }
        };

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "🚮";
        deleteButton.classList.add("delete");
        deleteButton.onclick = function () {
            bucketList.splice(i, 1);
            displayData();
        };

        actions.append(completeButton, editButton, deleteButton);
        listItem.append(para, actions);
        bucketDiv.appendChild(listItem);
    });
}