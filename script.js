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

const sectionProduct = document.querySelector('.product');
const sectionDescription = document.querySelector('.description');
const sectionDashboard = document.querySelector('.dashboard');

const btnBuyNow = document.querySelector('#buy-now');
const btnAddToCart = document.querySelector('#add-to-cart');
const btnReview = document.querySelector('#review-product');
const btnContactSeller = document.querySelector('#contact-seller');
const btnPageToggle = document.querySelector('.page-toggle');

//const btnDoughnut = document.querySelector('.doughnut-btn');
//const btnLine = document.querySelector('.line-btn');
//const btnRadar = document.querySelector('.radar-btn');
const graphBody = document.querySelectorAll('.graph');
const graphBtn = document.querySelectorAll('.graph-btn');

const body = document.querySelector('body');

/// variables
const sizeList = ['s', 'm', 'l', 'xl', 'xxl'];
const colorList = ['white', 'grey', 'black', 'red'];
let selectedQuantity = 100,
  selectedSize,
  selectedColor,
  dashboard = false,
  myData,
  totalBookSale = 0,
  totalWatchSale = 0,
  totalLaptopSale = 0;
//const soldKeyPathList = [];
const soldItemList = [];
const totalProfitList = [];

const watchBrandList = [],
  laptopBrandList = [];
let allBrandList = [],
  sortedBrandList = [],
  topFiveBrand = [],
  topBrandNames = [],
  topBrandViews = [];

let chartBarText = 'chartDoughnut';

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

const showBooks = function () {
  setTimeout(() => {
    //console.log(myData.Categories.Books.Author);
    //console.log(findAllByKey(myData.Categories.Books, 'Sold'));
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

//find value
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
  //const totalProfitList = [];
  for (let [key, value] of Object.entries(myData.Categories)) {
    console.log(key, value);
    let price = 0,
      boughtPrice = 0,
      sold = 0;
    let priceList,
      bhPriceList,
      soldList,
      profitList = [];

    priceList = findAllByKey(value, 'Price');
    bhPriceList = findAllByKey(value, 'Bought_Price');
    soldList = findAllByKey(value, 'Sold');
    console.log(priceList, bhPriceList, soldList);
    //for (let c = 0; c<3; c++)
    for (let i = 0; i < priceList.length; i++) {
      profitList.push(soldList[i] * (priceList[i] - bhPriceList[i]));
      //profitList.push(`${soldList[i]}, ${priceList[i]}, ${bhPriceList[i]}`);
    }
    profitList = profitList.reduce((sum, cur) => sum + cur, 0);
    console.log(profitList, 'profit');
    console.log(priceList.length);
    totalProfitList.push(profitList);
    console.log(profitList, 'profitList');
  }
  console.log(totalProfitList);
  //totalProfitList[0].reduce((sum, cur) => sum + cur, 0);
  //console.log(totalProfitList);
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

/// top brand name
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

//my try
const pathList = [];
function findAllByKeyMe(obj, keyToFind) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (key === keyToFind) {
      acc.concat({ key, value });
    } else {
      if (typeof value === 'object') {
        acc.concat(findAllByKey(value, keyToFind));
      } else {
        acc, [];
      }
    }
  });
}

// USAGE
//findAllByKey(myObj, 'id')

//find path
const findPath = (ob, key) => {
  const path = [];
  const keyExists = (obj) => {
    if (!obj || (typeof obj !== 'object' && !Array.isArray(obj))) {
      return false;
    } else if (obj.hasOwnProperty(key)) {
      return true;
    } else if (Array.isArray(obj)) {
      let parentKey = path.length ? path.pop() : '';

      for (let i = 0; i < obj.length; i++) {
        path.push(`${parentKey}[${i}]`);
        const result = keyExists(obj[i], key);
        if (result) {
          return result;
        }
        path.pop();
      }
    } else {
      for (const k in obj) {
        path.push(k);
        const result = keyExists(obj[k], key);
        if (result) {
          return result;
        }
        path.pop();
      }
    }
    return false;
  };

  keyExists(ob);

  return path.join('.');
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
    console.log(
      e.target.closest('.product__sect').querySelector('.quantity_form'),
      e.defaultPrevented
    );
    //console.log(e.target.value);
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
    //console.log(e.target.dataset.n);
    graphBody.forEach((j) => {
      j.classList.contains(`${e.target.dataset.n}`)
        ? j.classList.remove('hide')
        : j.classList.add('hide');

      console.log(e.target.dataset.n);
      chartBarText = e.target.dataset.n;
      e.target.dataset.n === 'doughnut'
        ? (chartBarText = 'chartDoughnut')
        : (chartBarText = 'chartRadar');
      console.log(chartBarText);
      // if (e.target.dataset.n === 'doughnut') {
      //   chartBar = new Chart(
      //     document.getElementById('chartDoughnut'),
      //     configDoughnut
      //   );
      // } else {
      //   chartBar = new Chart(
      //     document.getElementById('chartRadar'),
      //     configRadarChart
      //   );
      // }
    });
  });
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
  readData();
  showBooks();
});

/// chart doughnut
const dataDoughnut = {
  //labels: ['JavaScript', 'Python', 'Ruby'],
  labels: ['Books', 'Watches', 'Laptops'],
  datasets: [
    {
      //label: 'My First Dataset',
      label: 'Product sold: ',
      //data: [300, 50, 100],
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
  document.getElementById('chartDoughnut'), //chartDoughnut
  configDoughnut
);

// let chartBar;
// function show() {
//   chartBarText === 'chartDoughnut'
//     ? (chartBar = new Chart(
//         document.getElementById('chartDoughnut'),
//         configDoughnut
//       ))
//     : (chartBar = new Chart(
//         document.getElementById('chartRadar'),
//         configRadarChart
//       ));
// }
// show();

/// chart line
//const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
const labels = ['Books', 'Watches', 'Laptops'];
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Product profit: ',
      backgroundColor: 'hsl(252, 82.9%, 67.8%)',
      borderColor: 'hsl(252, 82.9%, 67.8%)',
      //data: [0, 10, 5, 2, 20, 30, 45],
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

console.log(topBrandNames);
/// radar chart

setTimeout(() => {
  const dataRadar = {
    // labels: [
    //   'Eating',
    //   'Drinking',
    //   'Sleeping',
    //   'Designing',
    //   'Coding',
    //   'Cycling',
    //   'Running',
    // ],
    labels: topBrandNames,
    datasets: [
      {
        label: 'Popular brands: ',
        //data: [65, 59, 90, 81, 56],
        //data: [65, 59, 90, 81, 56, 55, 40],
        data: topBrandViews,
        fill: true,
        backgroundColor: 'rgba(133, 105, 241, 0.2)',
        borderColor: 'rgb(133, 105, 241)',
        pointBackgroundColor: 'rgb(133, 105, 241)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(133, 105, 241)',
      },
      // {
      //   label: 'My Second Dataset',
      //   //data: [28, 48, 40, 19, 96, 27, 100],
      //   data: [28, 48, 40, 19, 96],
      //   fill: true,
      //   backgroundColor: 'rgba(54, 162, 235, 0.2)',
      //   borderColor: 'rgb(54, 162, 235)',
      //   pointBackgroundColor: 'rgb(54, 162, 235)',
      //   pointBorderColor: '#fff',
      //   pointHoverBackgroundColor: '#fff',
      //   pointHoverBorderColor: 'rgb(54, 162, 235)',
      // },
    ],
  };

  const configRadarChart = {
    type: 'radar',
    data: dataRadar,
    options: {},
  };

  chartBar = new Chart(document.getElementById('chartRadar'), configRadarChart);
}, 1000);

/// read data
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
