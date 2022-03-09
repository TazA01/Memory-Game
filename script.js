const gameContainer = document.getElementById("game");
let newDiv = '';
let card1 = null;
let click = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);


  }
}

// TODO: Implement this function!
function handleCardClick(event) {

  let clickedCard = event.target;

  if (click === true || clickedCard === card1 || clickedCard.className.includes('matched')) {
    return;

  }
  clickedCard.style.backgroundColor = clickedCard.classList[0];
  clickedCard.className += ' matched';

  if (!card1) {
    card1 = clickedCard;

  } else if (card1) {
    if (card1.classList[0] === clickedCard.classList[0]) {
      alert("It's a Match!");
      card1 = null;

    } else if (card1.classList[0] !== clickedCard.classList[0]) {
      click = true;
      setTimeout(function () {
        clickedCard.classList.remove('matched');
        card1.classList.remove('matched');
        alert("Not a Match!")
        card1.style.backgroundColor = null;
        clickedCard.style.backgroundColor = null;
        card1 = null;
        click = false;

      }, 1000)
    }
  }


}

// when the DOM loads
createDivsForColors(shuffledColors);
