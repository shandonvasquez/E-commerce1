'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header sticky & back top btn active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 150) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
}

addEventOnElem(window, "scroll", headerSticky);



/**
 * scroll reveal effect
 */

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }
  }
}

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);

/////////////////////////////////////////
// SHOPPING CART//

const cartItems = document.querySelector('#cart-items');
const addToCartButtons = document.querySelectorAll('.action-btn');
const maxItemsPerProduct = 5;

// Function to update cart items in local storage
function updateCartItemsInStorage() {
  const items = [...cartItems.children].map(item => ({
    title: item.dataset.title,
    quantity: parseInt(item.dataset.quantity),
  }));
  localStorage.setItem('cartItems', JSON.stringify(items));
}

// Load cart items from local storage
function loadCartItemsFromStorage() {
  const storedItems = localStorage.getItem('cartItems');
  if (storedItems) {
    const items = JSON.parse(storedItems);
    items.forEach(item => {
      const newItem = document.createElement('li');
      newItem.dataset.title = item.title;
      newItem.dataset.quantity = item.quantity;
      newItem.innerHTML = `
        <span class="item-title">${item.title}</span>
        <span class="item-price">${item.price}</span>
        <span class="cart-item">
          <span class="quantity">${item.quantity}</span>
        </span> 
        <button class="action-btn remove-from-cart" aria-label="remove from cart">
          <ion-icon name="trash-outline" aria-hidden="true"></ion-icon>
        </button>
      `;
      cartItems.appendChild(newItem);
    });
  }
}

// Add event listener to "Add to Cart" buttons//
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Get the name and price of the item
    const itemTitle = button.closest('.shop-card').querySelector('.card-title').textContent;
    const itemPrice = button.closest('.shop-card').querySelector('.price .span').textContent;

    // Check if the maximum number of this product has already been added to the cart
    const numItemsInCart = [...cartItems.children].reduce((total, item) => {
      if (item.dataset.title === itemTitle) {
        const quantity = parseInt(item.dataset.quantity);
        return total + quantity;
      }
      return total;
    }, 0);

    if (numItemsInCart >= maxItemsPerProduct) {
      alert(`Sorry we are out of stock of ${itemTitle}.`);
      return;
    }

    // Check if the item already exists in the cart
    const existingItem = [...cartItems.children].find(item => item.dataset.title === itemTitle);

    if (existingItem) {
      // Item already exists, update the quantity
      const quantityElement = existingItem.querySelector('.quantity');
      const quantity = parseInt(quantityElement.textContent) + 1;
      quantityElement.textContent = quantity;
      existingItem.dataset.quantity = quantity;
    } else {
      // Create a new list item for the cart
      const newItem = document.createElement('li');
      newItem.dataset.title = itemTitle;
      newItem.dataset.quantity = 1;
      newItem.innerHTML = `
        <span class="item-title">${itemTitle}</span>
        <span class="item-price">${itemPrice}</span>
        <span class="cart-item">
          <span class="quantity">1</span>
        </span> 
        <button class="action-btn remove-from-cart" aria-label="remove from cart">
          <ion-icon name="trash-outline" aria-hidden="true"></ion-icon>
        </button>
      `;
      cartItems.appendChild(newItem);
    }

    // Update cart items in local storage
    updateCartItemsInStorage();
  });
});

// Add event listener to "Remove from Cart" buttons
document.addEventListener('click', (event) => {
  if (event.target.matches('.remove-from-cart')) {
    const itemTitle = event.target.closest('li').dataset.title;
    const existingItem = [...cartItems.children].find(item => item.dataset.title === itemTitle);
    if (existingItem) {
      const quantityElement = existingItem.querySelector('.quantity');
      const quantity = parseInt(quantityElement.textContent);
      if (quantity > 1) {
        quantityElement.textContent = quantity - 1;
        existingItem.dataset.quantity = quantity - 1;
      } else {
        cartItems.removeChild(existingItem);
      }
    }

    // Update cart items in local storage
    updateCartItemsInStorage();
  }
});

// Load cart items from local storage when the page loads
loadCartItemsFromStorage();



/// dark mode
const darkModeButton = document.getElementById('dark-mode-button');
const elementsToToggle = ['body', 'section', 'div', 'span', 'button'];

darkModeButton.addEventListener('click', () => {
  elementsToToggle.forEach(element => {
    document.querySelector(element).classList.toggle('dark-mode');
  });
});


///loading

// Show the loading screen
function showLoadingScreen() {
  const loadingScreen = document.querySelector('.loading-screen');
  loadingScreen.style.display = 'flex';
}

// Hide the loading screen
function hideLoadingScreen() {
  const loadingScreen = document.querySelector('.loading-screen');
  loadingScreen.style.display = 'none';
}

// Call the showLoadingScreen function when your page is loading or performing an asynchronous task
showLoadingScreen();

// Call the hideLoadingScreen function when your content has finished loading or when the task is complete
// For example, inside the window.onload event or after an AJAX request
hideLoadingScreen();

