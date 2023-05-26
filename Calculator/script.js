let string = "";
let history = document.querySelector('.history');
let buttons = document.querySelectorAll('.button');
let deleteCheckbox = document.getElementById('deleteCheckbox');
let calculationNameInput = document.getElementById('calculationName');
let calculationInput = document.getElementById('calculationInput');

// Display "0" by default
calculationInput.value = "0";

Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        handleInput(e.target.innerHTML);
    });
});

document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (/^[0-9+\-*/.=]$/.test(key)) {
        handleInput(key);
    }
    if (key === "Enter") {
        handleEnterKey();
    }
});

function handleInput(input) {
    if (input === "=") {
        try {
            string = eval(string);
            calculationInput.value = string;
            addHistoryEntry(calculationNameInput.value, calculationInput.value);
        } catch (error) {
            calculationInput.value = 'Error';
            addHistoryEntry(calculationNameInput.value, 'Error');
        }
    } else if (input === "AC") {
        string = '';
        calculationInput.value = "0";
    } else {
        if (calculationInput.value === "0") {
            calculationInput.value = input;
        } else {
            calculationInput.value += input;
        }
        string = calculationInput.value;
    }
}

function handleEnterKey() {
    const inputValue = calculationInput.value.trim();
    if (inputValue !== "") {
        handleInput("=");
    }
}

function addHistoryEntry(name, result) {
    const historyItem = document.createElement('div');
    const deleteIcon = document.createElement('span');
    deleteIcon.classList.add('delete-icon');
    deleteIcon.innerHTML = '&#10006;';
    deleteIcon.onclick = () => {
        if (deleteCheckbox.checked) {
            history.removeChild(historyItem);
        }
    };
    historyItem.classList.add('history-item');
    historyItem.innerHTML = `<input type="checkbox">
                             <span>${name}</span>
                             <span>${result}</span>`;
    historyItem.prepend(deleteIcon);
    history.appendChild(historyItem);
    calculationNameInput.value = "";
}
