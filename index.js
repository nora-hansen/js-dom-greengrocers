const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35
    }
  ],
  cart: []
};

const storeList = document.getElementById("store").children[1]
const cartList  = document.getElementById("cart").children[1].children[0]
const totalText = document.querySelector(".total-number")
const mainSection = document.getElementById("cart")

const filterList = []

// update data

function addToCart(item) {

  let pushedNew = false // To check if the item was already in cart or not
    for (let i = 0; i < state.cart.length; i++) {
      if (state.cart[i].item.name === item.name) {
        state.cart[i] = {
          item: item,
          amount: state.cart[i].amount + 1
        }

        return true
      }
    }
    state.cart.push({
      item: item,
      amount: 1
    })
}

function removeFromCart(item) {
  let pushedNew = false // To check if the item was already in cart or not
  for (let i = 0; i < state.cart.length; i++) {
    if (state.cart[i].item.name === item.name) {
      if (state.cart[i].amount <= 0) {
        state.cart.splice(i, 1)
      }

      state.cart[i] = {
        item: item,
        amount: state.cart[i].amount - 1
      }
    }
  }

}

function filterItem(item) {
  for (const i in filterList) {
    if (filterList[i] === item.name) {
      filterList.splice(i, 1)
      return true
    } 
  }
  filterList.push(item.name)
  console.log("Select " + item.name)
}

// Handle user clicks

function handleClick(val, item) {
  if (val === 1) {
    addToCart(item)
    renderCart()
  } else {
    removeFromCart(item)
    renderCart()
  }
}

function handleSelect(item) {
  filterItem(item)
  renderCart()
}

// Render the items

function renderShopItems() {
  storeList.innerHTML = ""

  for (let i = 0; i < state.items.length; i++) {

    const itemLi = document.createElement("li")

    let itemDiv = document.createElement("div")
    itemDiv.setAttribute('class', 'store--item-icon')

    let itemImg = document.createElement("img")
    itemImg.setAttribute('src', 'assets/icons/' + state.items[i].id + '.svg')
    itemImg.setAttribute('alt', state.items[i].name)

    itemDiv.appendChild(itemImg)

    let itemButton = document.createElement("button")
    itemButton.innerText = "Add to cart"
    itemButton.addEventListener('click', (event) => handleClick(1, state.items[i]))

    itemLi.appendChild(itemDiv)
    itemLi.appendChild(itemButton)

    storeList.appendChild(itemLi)
  }

}

function renderCart() { 
  let total = 0
  cartList.innerHTML = ""
  for (let i = 0; i < state.cart.length; i++) {
    if (state.cart[i].amount > 0 && (filterList.includes(state.cart[i].item.name) || filterList.length === 0)) {
      const cartLi = document.createElement("li")
      const cartImg = document.createElement("img")

      cartImg.setAttribute('class', 'cart--item-icon')
      cartImg.setAttribute('src', 'assets/icons/' + state.cart[i].item.id + '.svg')
      cartImg.setAttribute('alt', state.cart[i].item.name)

      const cartP = document.createElement("p")
      cartP.innerText = state.cart[i].item.name

      const cartButton1 = document.createElement("button")
      cartButton1.setAttribute('class', 'quantity-btn remove-btn center')
      cartButton1.innerText = '-'
      cartButton1.addEventListener('click', (event) => handleClick(-1, state.cart[i].item))

      const cartButton2 = document.createElement("button")
      cartButton2.setAttribute('class', 'quantity-text center')
      cartButton2.innerText = state.cart[i].amount

      const cartButton3 = document.createElement("button")
      cartButton3.setAttribute('class', 'quantity-btn add-btn center')
      cartButton3.innerText = '+'
      cartButton3.addEventListener('click', (event) => handleClick(1, state.cart[i].item))

      cartLi.appendChild(cartImg)
      cartLi.appendChild(cartP)
      cartLi.appendChild(cartButton1)
      cartLi.appendChild(cartButton2)
      cartLi.appendChild(cartButton3)
      cartList.appendChild(cartLi)

      total += state.cart[i].item.price * state.cart[i].amount
    }
  }
  totalText.innerHTML = '£' + (Math.round(total * 100) / 100).toFixed(2)
}

function renderFilterList() {
  // The list of items to filter by
  const filterList = document.createElement("div")
  filterList.setAttribute('id', 'filter-by--list')
  // Title saying "Filter by" above list
  const filterH5 = document.createElement("h5")
  filterH5.setAttribute('id', 'filter-by--title')
  filterH5.innerHTML = "Filter by"
  mainSection.appendChild(filterH5)

  // Add all the available items to the list
  for (const i in state.items) {
    const checkBoxDiv = document.createElement("div")

    const checkBox = document.createElement("input")
    checkBox.setAttribute('class', 'filter-by--items')
    checkBox.setAttribute('type', 'checkbox')
    checkBox.setAttribute('id', 'item-box--' + state.items[i].name)
    checkBox.addEventListener('click', (event) => handleSelect(state.items[i]))

    checkBoxDiv.appendChild(checkBox)

    const checkBoxLabel = document.createElement("label")
    checkBoxLabel.setAttribute('for', 'item-box--' + state.items[i].name)
    checkBoxLabel.innerHTML = state.items[i].name

    checkBoxDiv.appendChild(checkBoxLabel)

    filterList.appendChild(checkBoxDiv)
  }

  mainSection.appendChild(filterList)
}

function main() {
  renderShopItems()
  renderFilterList()
  renderCart()
}

main()