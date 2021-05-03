const MAIN_URL = "https://breakingbadapi.com"
const SEARCH_URL = MAIN_URL + "/api/characters?name="
const QUOTE_URL = MAIN_URL + "/api/quote/random"
const charAll = document.getElementById("character-all")
const searchChar = document.getElementById("search-character")
const randomQuote = document.getElementById("generate-quote")
const characterUl = document.getElementById("character-list")
const searchFormChar = document.getElementById("search-form-character")

const removeAllChildren = (parent) => {
  while(parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

const fetchAllCharacters = async () => {
    // resetPage()
    fetch(MAIN_URL + "/api/characters")
      .then((res) => res.json())
      .then((characters) => {
        characters.forEach((character) => {
          listCharacter(character)
        })
      })
}

const showSearchedCharacters = (event) => {
  event.preventDefault()
  searchedVal = event.target[0].value.replace(" ", "+")
  removeAllChildren(characterUl)
  fetch(SEARCH_URL + searchedVal)
    .then((res) => res.json())
    .then((characters) => {
      characters.forEach((character) => {
        listCharacter(character)
      })
    })
}

const generateQuote = () => {
  fetch(QUOTE_URL)
  .then((res) => res.json())
  .then((quotes) => {
    quotes.forEach((quote) => {
      listQuote(quote)
    })
  })
}

const showSearchForm = () => {
  searchFormChar.hidden = false
}

const hideSearchForm = () => {
  searchFormChar.hidden = true
}

const listQuote = (quote) => {
  let quoteList = document.querySelector(`[data-character-name="${quote.author}"]`)
  if (quoteList != null) {
    let quoteItem = document.createElement("q")
    quoteItem.innerHTML = quote.quote
    quoteList.appendChild(quoteItem)
  }
  else {
    generateQuote()
  }
}

const listCharacter = (character) => {
    let grid = document.createElement("div")
    grid.className = "four wide column"
    let card = document.createElement("div")
    card.className = "ui card"
    let image = document.createElement("div")
    image.className = "image"
    let imgElement = document.createElement("img")
    imgElement.src = character.img
    let content = document.createElement("div")
    content.className = "content"
    let quotes = document.createElement("div")
    quotes.className = "description"
    let name = document.createElement("p")
    name.innerHTML = character.name
    quotes.id = "quotes"
    quotes.dataset.characterName = character.name

    image.appendChild(imgElement)
    content.appendChild(name)
    card.appendChild(content)
    card.appendChild(image)
    card.appendChild(quotes)
    grid.appendChild(card)
    characterUl.append(grid)
}    

charAll.addEventListener("click", fetchAllCharacters)
searchFormChar.addEventListener("submit", showSearchedCharacters)
searchChar.addEventListener("click", showSearchForm)
randomQuote.addEventListener("click", generateQuote)