let myLibrary = []
const shelf = document.querySelector('#shelf')
const tableHeader = document.querySelector('#table-header')
function Book(title, author, pages, ifRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.ifRead = ifRead

    this.toggleStatus = function() {
        this.ifRead = !this.ifRead
    }
}

function addBookToLibrary(title, author, pages, ifRead) {
  let book = new Book(title, author, pages, ifRead)
  myLibrary.push(book)
}

function removeBook() {
    let index = this.parentElement.parentElement.id.replace('book', '')
    myLibrary.splice(index, 1)
    render(myLibrary)
}

function changeStatus() {
    let index = this.parentElement.parentElement.id.replace('book', '')
    let book = myLibrary[index]
    book.toggleStatus()
    render(myLibrary)
}

function render(library) {
    shelf.innerHTML = ''
    shelf.appendChild(tableHeader)
    for (let i = 0; i < library.length; i++) {
        let row = document.createElement('tr')
        for (const key in library[i]) {
            if(key != 'toggleStatus') {
                let cell = document.createElement('td')
                if(key == 'ifRead') {
                    cell.innerHTML = library[i][key] ? 'read' : 'unread'
                }
                else {
                    cell.innerHTML = library[i][key];
                }
                row.appendChild(cell)
            }
        }
        let tableData = document.createElement('td')
        let changeStatusButton = document.createElement('button')
        changeStatusButton.classList.add('btn')
        changeStatusButton.classList.add('btn-light')
        changeStatusButton.innerHTML = 'Change Status'
        changeStatusButton.addEventListener('click', changeStatus)
        tableData.appendChild(changeStatusButton)
        row.appendChild(tableData)
        let tableData2 = document.createElement('td')
        let button = document.createElement('button')
        button.classList.add('btn')
        button.classList.add('btn-light')
        button.innerHTML = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>'
        button.addEventListener('click', removeBook)
        tableData2.appendChild(button)
        row.appendChild(tableData2)
        row.id = 'book' + i
        shelf.appendChild(row)
    }
}

function processForm() {
    let title = document.querySelector('#title').value
    let author = document.querySelector('#author').value
    let pages = document.querySelector('#pages').value
    let ifRead = document.querySelector('#read').checked
    document.querySelector('#form').reset()
    addBookToLibrary(title, author, pages, ifRead)
    render(myLibrary)
}
