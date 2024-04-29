// Seleccionar elementos del DOM
const ulBooks = document.querySelector(".ul-books");
const btnOpenPanel = document.querySelector("#open-panel");
const panelAddNewBook = document.querySelector(".panel-book.add");
const btnClosePanel = document.querySelector(".close-form-add-book");
const formAddNewBook = document.querySelector(".form-add-book");
const inputNameBook = document.querySelector("#new-book");
const btnAddNewBook = document.querySelector("#add-new-book");
const btnCloseDelete = document.querySelector(".close-panel-delete-book");
const panelDeleteBook = document.querySelector(".panel-book.delete");
const titleBookPanelDelete = document.querySelector(
  ".tittle-book-delete"
);
const btnAceptDeleteBook = document.querySelector("#acept-delete");
let bookToDelete = undefined; // Variable para almacenar el libro a eliminar

// Lista inicial de libros
let stack = [
  "En agosto nos vemos",
  "La utima funcion",
  "La ciudad y sus muros inciertos",
  "La seduccion",
  "El espejismo",
];

// Función para insertar libros en la lista
function insertBooks(stack) {
  stack.forEach((book) => {
    const liBookItem = document.createElement("li");
    liBookItem.classList.add("book-item");

    const iconSpan = document.createElement("span");
    iconSpan.classList.add("icon");
    iconSpan.textContent = "📖";

    const nameSpan = document.createElement("span");
    nameSpan.classList.add("name");
    nameSpan.textContent = book;

    liBookItem.appendChild(iconSpan);
    liBookItem.appendChild(nameSpan);
    ulBooks.appendChild(liBookItem);
  });
}
insertBooks(stack); // Insertar libros al cargar la página

// Evento para abrir el panel de agregar libro
btnOpenPanel.addEventListener("click", openPanel);
function openPanel() {
  panelAddNewBook.classList.remove("inactive");
}

// Evento para cerrar el panel de agregar libro
btnClosePanel.addEventListener("click", closePanel);
function closePanel() {
  panelAddNewBook.classList.add("inactive");
}

// Evento para agregar un nuevo libro
formAddNewBook.addEventListener("submit", createNewBook);
function createNewBook(event) {
  event.preventDefault();

  nameNewBook = inputNameBook.value;
  stack.push(nameNewBook); // Agregar el nuevo libro al arreglo

  // Eliminar libros existentes de la lista
  const booksInDom = document.querySelectorAll(".book-item");
  const ArrayBookInDom = Array.from(booksInDom);
  ArrayBookInDom.forEach((book) => {
    book.remove();
  });

  insertBooks(stack); // Insertar los libros actualizados en la lista

  closePanel(); // Cerrar el panel de agregar libro

  inputNameBook.value = ""; // Limpiar el campo de texto
}

// Evento para abrir el panel de eliminar libro
ulBooks.addEventListener("click", openPanelDeleteBook);
function openPanelDeleteBook(event) {
  const isBook =
    event.target.classList.contains("book-item") ||
    event.target.parentElement.classList.contains("book-item");

  let nameBook;
  if (isBook === true) {
    panelDeleteBook.classList.remove("inactive");

    // Obtener el nombre del libro seleccionado
    if (event.target.classList.contains("book-item")) {
      nameBook = event.target.querySelector(".name");
    } else {
      nameBook = event.target.parentElement.querySelector(".name");
    }
    titleBookPanelDelete.textContent = nameBook.textContent; // Mostrar el nombre del libro a eliminar
    bookToDelete = nameBook; // Almacenar el libro a eliminar
  }
}

// Evento para cerrar el panel de eliminar libro
btnCloseDelete.addEventListener("click", closeDeletePanel);
function closeDeletePanel() {
  panelDeleteBook.classList.add("inactive");
}

// Evento para eliminar un libro
btnAceptDeleteBook.addEventListener("click", deleteBook);
function deleteBook() {
  const liBookToDelete = bookToDelete.parentElement; // Obtener el elemento li del libro a eliminar
  liBookToDelete.remove(); // Eliminar el libro de la lista
  closeDeletePanel(); // Cerrar el panel de eliminar libro
}