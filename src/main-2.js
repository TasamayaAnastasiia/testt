import axios from "axios";

const listOne = document.querySelector(".list-one");
const listCategories = document.querySelector(".list_categories");
const titleSelectedCategory = document.querySelector(".main-title");
let selectedCategory;


function renderCategories(list) {
    let listCard = ""; 
    list.forEach(option => {
        listCard += `<li tabindex="0" class="categoria">${option.list_name}</li>`;
    });
    listCategories.insertAdjacentHTML("beforeend", listCard);

    const optionList = document.querySelectorAll(".categoria");

    optionList.forEach( select => {
        select.addEventListener("click", (e) => {
            e.preventDefault();

            //title
            if(e.target.textContent !== "All categories") {

                titleSelectedCategory.textContent = e.target.textContent;
            }
            else {
                titleSelectedCategory.textContent = "Best Sellers Books";
            }
            const arrayTitle = titleSelectedCategory.textContent.split(' ');
            const lastWord = arrayTitle[arrayTitle.length-1];
            titleSelectedCategory.innerHTML = titleSelectedCategory.innerHTML.replace(lastWord,`<span class="blue">${lastWord}</span>`);
            //title//

            //category//
            selectedCategory = e.target.textContent;
            selectedCategory = selectedCategory.replace(/ /g, "%20");
            //category//


                axios.get(`https://books-backend.p.goit.global/books/category?category=${selectedCategory}`)
                    .then(response => renderBooks(response.data))
                    .catch(error => console.log(error.message));
        });
    });
}

axios.get(`https://books-backend.p.goit.global/books/category-list`)
    .then(response => {
        renderCategories(response.data);
    })
    .catch(error => console.log(error.message));
    

async function renderBooks(books) {
    let booksCard = ""; 
    listOne.innerHTML = "";
    books.forEach(book => {
        booksCard += `<li class="book">
                        <img class="img-example" src="${book.book_image}"></img>
                            <div class="box-cards">
                                <p class="title-book">${book.title}</p>
                                <p class="author-book">${book.author}</p>
                            </div>
                      </li>`;
    });
    listOne.insertAdjacentHTML("beforeend", booksCard);
}