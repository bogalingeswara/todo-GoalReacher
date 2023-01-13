let day = document.querySelector('.day');
let input = document.querySelector('.input');
let saveBtn = document.querySelector('.save');
let list = document.querySelector('.list');
let star = document.querySelector('.star');
let reset = document.querySelector('.reset')
const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let arry = [];
star.innerHTML = 0


let Day = new Date();
day.innerHTML = weekday[Day.getDay()] + ", " + Day.getDate();

reset.addEventListener('click', () => {
        star.innerHTML = 0;
        arry = [];
        localStorage.setItem('notes', JSON.stringify(arry))
        localStorage.setItem('star',star.innerHTML)
        location.reload()
})

saveBtn.addEventListener('click', () => {
        let text = input.value
        addNote(text)
        input.value = ""
})

const addNote = (text = '') => {
        const add = document.createElement('div');
        add.classList.add('list-items');
        add.innerHTML = ` <div class="list-item mt-3 mb-3">
                        <p class="task">${text}</p>
                        <div class="buttons">
                                <button class="btn btn-warning doneBtn m-2">❗</button>
                                <button class="btn btn-danger deleteBtn me-2">🗑️</button>
                        </div>
                     </div>`;

        add.querySelector('.deleteBtn').addEventListener('click',  () => {
                add.remove();
                remove(text);
        })

        add.querySelector('.doneBtn').addEventListener('click', () => {
               star.innerHTML++;
               add.remove();
               remove(text);
               localStorage.setItem('star',star.innerHTML)
        })

        list.appendChild(add);
        saveNote(text)
}  

const remove = (text) => {;
        arry.splice(arry.indexOf(text),1);
        localStorage.setItem('notes', JSON.stringify(arry))
        // arry.pop(text)
}

const saveNote = (text) => {
        arry.push(text)
        localStorage.setItem('notes', JSON.stringify(arry))
}


(
        function () {
                const lsNotes = JSON.parse(localStorage.getItem('notes'));
                lsNotes.forEach((lsNote) => addNote(lsNote));
                star.innerHTML = localStorage.getItem('star')
        }
)()
