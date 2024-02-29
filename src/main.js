import axios from "axios";

const listOne = document.querySelector(".list-one");

await axios.get(`https://books-backend.p.goit.global/books/top-books`)
    .then(response => foo(response.data))
    .catch(error => console.log(error.message));

function foo(boo) {
    let stringOne = '';
    let stringTwo = '';

    for( let i in boo) {
        stringOne += `
            <li class="books_list">
                <h3 class="name_category">${boo[i].list_name}</h3>
                <ul class="images_books"></ul>
            </li>`;

        for (let j in boo[i].books) {
            stringTwo +=  `<li class="image_book"><img src="${boo[i].books[j].book_image}"></img></li>`;
        }
    }
    listOne.insertAdjacentHTML("beforeend", stringOne);
    listOne.insertAdjacentHTML("beforeend", stringTwo);
}
