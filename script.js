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
const reviewInput = document.querySelector('.review__input');
const reviewForm = document.querySelector('.review_form');
const reviewSubmitBtn = document.querySelector('#review-submit');

const sectionProduct = document.querySelector('.product');
const sectionDescription = document.querySelector('.description');
const sectionDashboard = document.querySelector('.dashboard');

const btnBuyNow = document.querySelector('#buy-now');
const btnAddToCart = document.querySelector('#add-to-cart');
const btnReview = document.querySelector('#review-product');
const btnContactSeller = document.querySelector('#contact-seller');
const btnPageToggle = document.querySelector('.page-toggle');

const graphBody = document.querySelectorAll('.graph');
const graphBtn = document.querySelectorAll('.graph-btn');

const body = document.querySelector('body');

/// variables
const sizeList = ['s', 'm', 'l', 'xl', 'xxl'];
const colorList = ['white', 'grey', 'black', 'red'];
let selectedQuantity = 100,
  selectedSize,
  selectedColor,
  reviewText = '',
  dashboard = false,
  myData,
  totalBookSale = 0,
  totalWatchSale = 0,
  totalLaptopSale = 0;

const soldItemList = [];
const totalProfitList = [];

const watchBrandList = [],
  laptopBrandList = [];
let allBrandList = [],
  sortedBrandList = [],
  topFiveBrand = [],
  topBrandNames = [],
  topBrandViews = [];

//////////////////////////////////////////////////////
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

const showSolds = function () {
  setTimeout(() => {
    totalBookSale = findAllByKey(myData.Categories.Books, 'Sold').reduce(
      (sum, cur) => sum + cur,
      0
    );
    soldItemList.push(totalBookSale);
    totalWatchSale = findAllByKey(myData.Categories.Watches, 'Sold').reduce(
      (sum, cur) => sum + cur,
      0
    );
    soldItemList.push(totalWatchSale);
    totalLaptopSale = findAllByKey(myData.Categories.Laptops, 'Sold').reduce(
      (sum, cur) => sum + cur,
      0
    );
    soldItemList.push(totalLaptopSale);
    console.log('total books sold: ' + totalBookSale);
    console.log('total watches sold: ' + totalWatchSale);
    console.log('total laptops sold: ' + totalLaptopSale);
    console.log(soldItemList);
    profitCalc();
    popularProduct();
    topBrands();
    topViews();
  }, 600);
};

/// Find value
function findAllByKey(obj, keyToFind) {
  return Object.entries(obj).reduce(
    (acc, [key, value]) =>
      key === keyToFind
        ? acc.concat(value)
        : typeof value === 'object'
        ? acc.concat(findAllByKey(value, keyToFind))
        : acc,
    []
  );
}

/// profit calculation
const profitCalc = function () {
  console.log(myData, 'profit');
  for (let [key, value] of Object.entries(myData.Categories)) {
    console.log(key, value);
    let priceList,
      bhPriceList,
      soldList,
      profitList = [];

    priceList = findAllByKey(value, 'Price');
    bhPriceList = findAllByKey(value, 'Bought_Price');
    soldList = findAllByKey(value, 'Sold');
    console.log(priceList, bhPriceList, soldList);

    for (let i = 0; i < priceList.length; i++) {
      profitList.push(soldList[i] * (priceList[i] - bhPriceList[i]));
    }
    profitList = profitList.reduce((sum, cur) => sum + cur, 0);
    console.log(profitList, 'profit');
    console.log(priceList.length);
    totalProfitList.push(profitList);
    console.log(profitList, 'profitList');
  }
  console.log(totalProfitList);
};

/// Popular product
function popularProduct() {
  for (let [key, value] of Object.entries(myData)) {
    console.log(value.Watches, 'popular');
    for (let [k, v] of Object.entries(value.Watches.Brand)) {
      console.log(k, v, 'popular');
      watchBrandList.push([k, v.Number_of_views]);
    }
    for (let [k, v] of Object.entries(value.Laptops.Brand)) {
      console.log(k, v, 'popular');
      laptopBrandList.push([k, v.Number_of_views]);
    }
  }
  allBrandList = [...watchBrandList, ...laptopBrandList];
  sortedBrandList = [...allBrandList];
  sortedBrandList.sort((a, b) => {
    return b[1] - a[1];
  });
  for (let n = 0; n < 5; n++) {
    topFiveBrand.push(sortedBrandList[n]);
  }
  console.log(
    watchBrandList,
    laptopBrandList,
    allBrandList,
    sortedBrandList,
    topFiveBrand
  );
}

/// Top brand name
function topBrands() {
  let arr = [];
  for (let [k, v] of topFiveBrand) {
    arr.push(k);
  }
  topBrandNames = arr;
  console.log(topBrandNames, 'names');
}
/// top brand views
function topViews() {
  let arr = [];
  for (let [k, v] of topFiveBrand) {
    arr.push(v);
  }
  topBrandViews = arr;
  console.log(topBrandViews, 'views');
}

//////////////////////////////////////////////////////
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
    console.log(
      e.target.closest('.product__sect').querySelector('.quantity_form'),
      e.defaultPrevented
    );

    const quantity = e.target.value;
    if (quantity >= 100) {
      selectedQuantity = quantity;
      productQuantityInput.value = selectedQuantity;
      console.log(selectedQuantity);
    } else {
      productQuantityInput.value = selectedQuantity;
      alert(`100 pieces minimum order!`);
    }
  }
);
const setReviewText = reviewInput.addEventListener('change', function (e) {
  e.preventDefault();
  reviewText = e.target.value;
  console.log(reviewText);
});

const reviewSubmit = reviewSubmitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  reviewInput.value = '';
  console.log(reviewText);
  alert('Thank you for your valuable feedback!');
});
const buyNow = btnBuyNow.addEventListener('click', function () {
  alert('Redirecting to order confirmation page...');
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
const pageToggle = btnPageToggle.addEventListener('click', function (e) {
  console.log(e);
  if (!dashboard) {
    e.target.innerText = 'Go to Product Page';
    sectionProduct.classList.add('hide');
    sectionDescription.classList.add('hide');
    sectionDashboard.classList.remove('hide');
    body.classList.add('over-hide');
    dashboard = !dashboard;
  } else {
    e.target.innerText = 'Go to Dashboard';
    sectionProduct.classList.remove('hide');
    sectionDescription.classList.remove('hide');
    sectionDashboard.classList.add('hide');
    body.classList.remove('over-hide');
    dashboard = !dashboard;
  }
});

const chartToggle = graphBtn.forEach((i) => {
  i.addEventListener('click', function (e) {
    graphBody.forEach((j) => {
      j.classList.contains(`${e.target.dataset.n}`)
        ? j.classList.remove('hide')
        : j.classList.add('hide');
    });
  });
});

//////////////////////////////////////////////////////
/// Initial Functions
window.addEventListener('load', function () {
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
    }
  });
  readData();
  showSolds();
});

//////////////////////////////////////////////////////
///CHARTS

/// chart doughnut
const dataDoughnut = {
  labels: ['Books', 'Watches', 'Laptops'],
  datasets: [
    {
      label: 'Product sold: ',

      data: soldItemList,
      backgroundColor: [
        'rgb(133, 105, 241)',
        'rgb(164, 101, 241)',
        'rgb(101, 143, 241)',
      ],
      hoverOffset: 4,
    },
  ],
};

const configDoughnut = {
  type: 'doughnut',
  data: dataDoughnut,
  options: {},
};

let chartBar = new Chart(
  document.getElementById('chartDoughnut'),
  configDoughnut
);

/// chart line
const labels = ['Books', 'Watches', 'Laptops'];
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Product profit: ',
      backgroundColor: 'hsl(252, 82.9%, 67.8%)',
      borderColor: 'hsl(252, 82.9%, 67.8%)',
      data: totalProfitList,
    },
  ],
};

const configLineChart = {
  type: 'line',
  data,
  options: {},
};

let chartLine = new Chart(
  document.getElementById('chartLine'),
  configLineChart
);

/// radar chart
setTimeout(() => {
  const dataRadar = {
    labels: topBrandNames,
    datasets: [
      {
        label: 'Popular brands: ',
        data: topBrandViews,
        fill: true,
        backgroundColor: 'rgba(133, 105, 241, 0.2)',
        borderColor: 'rgb(133, 105, 241)',
        pointBackgroundColor: 'rgb(133, 105, 241)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(133, 105, 241)',
      },
    ],
  };

  const configRadarChart = {
    type: 'radar',
    data: dataRadar,
    options: {},
  };

  chartBar = new Chart(document.getElementById('chartRadar'), configRadarChart);
}, 1000);

/// Read Data
async function readData() {
  await fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
      myData = data;
    });
}
setTimeout(() => {
  console.log(myData);
}, 500);
