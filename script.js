'use strict';

////////////////////////////
/// selecting elements
const productMainImage = document.querySelector('.product__image-main');
const productImages = document.querySelectorAll('.product__image-small');
const productSizes = document.querySelectorAll('.size');
const productSizesContainer = document.querySelector('.product__sect-size');
const productColors = document.querySelectorAll('.color-ref');
const productColorsContainer = document.querySelector('.product__sect-color');
const productQuantityInput = document.querySelector('.product__sect-quantity');
const productQuantityForm = document.querySelector('.quantity_form');

const btnBuyNow = document.querySelector('#buy-now');
const btnAddToCart = document.querySelector('#add-to-cart');
const btnReview = document.querySelector('#review-product');
const btnContactSeller = document.querySelector('#contact-seller');

/// variables
const sizeList = ['s', 'm', 'l', 'xl', 'xxl'];
const colorList = ['white', 'grey', 'black', 'red'];
let selectedQuantity = 100,
  selectedSize,
  selectedColor;

/// functions
const changeMainImage = function (e) {
  const image = e.target.style.backgroundImage;
  productMainImage.style.backgroundImage = image;
  productImages.forEach((i) => i.classList.remove('card-selected'));
  e.target.classList.add('card-selected');
};
const changeSize = function (e) {
  productSizes.forEach((i) => i.classList.remove('size-active'));
  e.target.classList.add('size-active');
  selectedSize = e.target.textContent.toLowerCase();
  console.log(selectedSize);
};
const changeColor = function (e) {
  productColors.forEach((i) => i.classList.remove('color-ref-active'));
  e.target.closest('.color-ref').classList.add('color-ref-active');
  selectedColor = e.target
    .closest('.color-ref')
    .querySelector('.color-ref-color').style.backgroundColor;
  console.log(selectedColor);
};

const printSizes = function () {
  productSizesContainer.innerHTML = '';
  sizeList.forEach((item) => {
    const html = `
        <span class="size">${item}</span>
        `;
    //console.log(item);
    productSizesContainer.insertAdjacentHTML('beforeend', `${html}`);
  });
};
const printColors = function () {
  productColorsContainer.innerHTML = '';
  colorList.forEach((item) => {
    const html = `
        <span class="color-ref">
            <div
            class="color-ref-color"
            style="background-color: ${item}"
            ></div>
        </span>
        `;
    //console.log(item);
    productColorsContainer.insertAdjacentHTML('beforeend', `${html}`);
  });
};

/// events
const changeImageEvent = productImages.forEach((i) =>
  i.addEventListener('click', changeMainImage)
);
const selectSize = productSizes.forEach((i) =>
  i.addEventListener('click', changeSize)
);
const selectColor = productColors.forEach((i) =>
  i.addEventListener('click', changeColor)
);
const setQuantity = productQuantityInput.addEventListener(
  'change',
  function (e) {
    e.preventDefault();
    //console.log(e.target.value);
    const quantity = e.target.value;
    if (quantity > 100) {
      selectedQuantity = quantity;
      productQuantityInput.value = selectedQuantity;
      console.log(selectedQuantity);
    } else {
      productQuantityInput.value = selectedQuantity;
      alert(`100 pieces minimum order!`);
    }
  }
);

const buyNow = btnBuyNow.addEventListener('click', function () {
  alert('Order finalize page...');
});
const addToCart = btnAddToCart.addEventListener('click', function () {
  alert('Product added to cart...');
});
const reviewProduct = btnReview.addEventListener('click', function () {
  alert('Review this product...');
});
const contactSeller = btnContactSeller.addEventListener('click', function () {
  alert('Contacting seller...');
});

/// initial functions
//printSizes();
//printColors();
window.addEventListener('load', function () {
  //console.log(productQuantityInput);
  //printSizes();
  //printColors();
  productQuantityInput.value = selectedQuantity;
  productSizes.forEach((i) => {
    if (i.classList.contains('size-active')) {
      selectedSize = i.innerText.toLowerCase();
    }
  });
  productColors.forEach((i) => {
    if (i.classList.contains('color-ref-active')) {
      selectedColor = i
        .closest('.color-ref')
        .querySelector('.color-ref-color')
        .style.backgroundColor.toLowerCase();
      //console.log(selectedColor);
    }
  });
});
