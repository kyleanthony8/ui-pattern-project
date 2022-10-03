let URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
let drinksArr = []

window.addEventListener("DOMContentLoaded", () => {
  showDrinks(URL)
});


const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) return element;
};

const form = getElement('.search-form');
const input = getElement('[name="drink"]');

form.addEventListener("submit", (e) => {
  e.preventDefault()
})

form.addEventListener('keyup', function (e) {
  e.preventDefault();
  console.log(input.value);
  const value = input.value;
  // if (!value) return;

  let filteredDrinks = drinksArr.filter((drk) => {
    return drk.strDrink.includes(value)
  })

  displayDrinks({ drinks: filteredDrinks, formUp: true })
});

const fetchDrinks = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error);
  }
};

const displayDrinks = ({ drinks, formUp }) => {
  if (!formUp) {
    drinksArr = [...drinks]
  }

  let newFilteredDrinks = [...drinks]
  // const section = getElement('.section-center');
  const section = getElement('.drinks-container');
  const title = getElement('.title');
  if (!drinks) {
    title.textContent = 'Sorry, no drinks matched your search'
    section.innerHTML = null;
    return;
  }

  const newDrinks = newFilteredDrinks
    .map((drink) => {
      const { idDrink: id, strDrink: name, strDrinkThumb: image } = drink
      let output = document.createElement('article')
      output.classList.add('cocktail')
      output.dataset.id = `${id}`
      output.innerHTML = `
      <div>
        <img src="${image}" alt="${name}"/>
        <h2>"${name}"</h2>
      </div>`

      output.addEventListener('click', () => modalPopulate(drink))
      return output;
    });

  title.textContent = '';
  section.innerText = ""
  for (let i = 0; i < newDrinks.length; i++) {
    section.appendChild(newDrinks[i])
  }
  // section.innerHTML = newDrinks;
  return section;
};

const showDrinks = async (url) => {
  const data = await fetchDrinks(url);
  data.formUp = false
  displayDrinks(data);
};

function modalPopulate(drink) {
  console.log(document.querySelector("#myModal"))
  let modalDisplay = document.getElementById("myModal")
  modalDisplay.style.display = "block"

  let innerModal = document.querySelector(".inner-modal")

  innerModal.innerText = ""

  let modelHTML = `
    <h3 class="modal-head">The "${drink.strDrink}"</h3>
    <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
    <p class="modal-ingredients">${drink.strInstructions}</p>
  `
  innerModal.insertAdjacentHTML("beforeend", modelHTML)
}

// const displayDrink = async ({ drinks }) => {
//   const drink = data.drinks[0];
//   const { strDrinkThumb: image, strDrink: name, strInstructions: desc } = drink;
//   const list = [drink.strIngredient1,
//   drink.strIngredient2,
//   drink.strIngredient3,
//   drink.strIngredient4,
//   drink.strIngredient5,
//   ]
// };

///////////////////////////////////////////////////////////
//////////////////      MODAL       ///////////////////////
///////////////////////////////////////////////////////////

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

span.onclick = function () {
  modal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
