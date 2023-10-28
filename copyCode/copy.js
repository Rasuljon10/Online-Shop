const productList = document.getElementById("productList");
const cartList = document.getElementById("cartList");
const notifBage = document.getElementById("notifBage");

function search() {
  const search = document.getElementById("search").value.toLowerCase();
  const product = document.getElementsByClassName("product");
  const h3 = document.getElementsByClassName("cartTitle");
  for (let i = 0; i < h3.length; i++) {
    const a = product[i].getElementsByClassName("cardTitle")[0];
    const value = a.innerHTML;
    if (value.toLowerCase().indexOf(search) > -1) {
      product[i].style.display = "";
    } else {
      product[i].style.display = "none";
    }
  }
  if (search.value == "") {
    return productList;
  }
}

const dropdown = document.getElementById("dropdown");
const dropContent = document.getElementById("dropContent");
const dropIcon = document.getElementById("dropIcon");

dropdown.addEventListener("click", function () {
  if (dropContent.style.display === "none") {
    dropContent.style.display = "grid";
    // // dropContent.style.top = "40px";
    // // dropContent.style.left = "-40px";
    // dropContent.style.gridTemplateColumns = "auto";
    // dropContent.style.rowGap = "20px";
    // dropContent.style.padding = "20px";
    // dropContent.style.border = "none";
    // dropContent.style.borderRadius = "10px";
    // dropContent.style.background = "aqua";
    dropContent.style.transition = "0.3s";
    dropIcon.style.rotate = "180deg";
  } else {
    dropContent.style.display = "none";
    dropIcon.style.rotate = "0deg";
  }
});

const titleInp = document.getElementById("title");
const imgInp = document.getElementById("imgInp");
const itemInp = document.getElementById("itemInp");
const priceInp = document.getElementById("priceInp");
// const formInp = document.getElementsByClassName("formInp");

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let cart = [];
// let products = [];

function addProduct() {
  if (titleInp.value && imgInp.value && itemInp.value && priceInp.value != "") {
    const productObj = {
      title: titleInp.value,
      img: imgInp.value,
      item: itemInp.value,
      price: priceInp.value,
    };
    var products = JSON.parse(localStorage.getItem("products")) ?? [];
    products.push(productObj);
    console.log(products);
    localStorage.setItem("products", JSON.stringify(products));
  }
  showProducts();
}

function showProducts() {
  // const id = new Date().getTime();
  productList.innerHTML = "";
  var cardTime = new Date();
  const date = cardTime.getDate();
  const currentMonth = month[cardTime.getMonth()];
  const hours = cardTime.getHours();
  const minuts = cardTime.getMinutes();
  products = JSON.parse(localStorage.getItem("products")) || [];
  products.forEach((element, i) => {
    var img = element.img || "";
    var title = element.title || "";
    var price = element.price || "";
    var item = element.item || "";
    productList.innerHTML += `<div class="card product">
    <div onclick="showCardSet(${i})" class="removeProduct">
      <i class="fa-solid fa-ellipsis-vertical"></i>
      <ul class="dropCardSet">
        <li onclick="showRemProd(${i})">
          <a>Delete product
          <div class="remProdModal">
      <div class="remProdHeader">
        <p>Do you want to delete this product?</p>
      </div>
      <div class="wrap">
        <div class="cancelBtn">
          <button onclick="cancelRemove(${i})">Cancel</button>
        </div>
        <div class="okBtn">
          <button onclick="removeProduct(${i})">Ok</button>
        </div>
      </div>
    </div></a>
        </li>
        <li>
          <a>Edit product</a>
        </li>
      </ul>
    </div>
    <img
      class="productImg"
      src="${img}"
      alt="..."
    />
    <h3 class="cardTitle">${title}</h3>
    <hr />
    <div class="gallery">
      <div class="price">
        <h4 class="greyText">Price</h4>
        <h6 class="priceNum">${price} $</h6>
      </div>
      <div class="iteam">
        <h4 class="greyText">Iteam</h4>
        <h6>${item}</h6>
      </div>
    </div>
    <div class="buyWrap">
      <button onclick="addcart(${i})" class="priceBtn">Buy now</button>
    </div>
     <div class="productDate">
      <p>${date}, ${currentMonth}</p>
      <p>${hours}:${minuts}</p>
     </div>
    </div>`;
  });
}
window.onload(showProducts());

function showCardSet(id) {
  const dropCardSet = document.getElementsByClassName("dropCardSet");
  if (dropCardSet[id].style.display === "none") {
    dropCardSet[id].style.display = "block";
  } else {
    dropCardSet[id].style.display = "none";
  }
}

function showRemProd(id) {
  const remProdModal = document.getElementsByClassName("remProdModal");
  if (remProdModal[id].style.display === "none") {
    remProdModal[id].style.display = "block";
  } else {
    cancelRemove(id);
  }
}

function cancelRemove(id) {
  const remProdModal = document.getElementsByClassName("remProdModal");
  remProdModal[id].style.display = "none";
}
function removeProduct(id) {
  var products = JSON.parse(localStorage.getItem("products")) || [];
  products.splice(id, 1);
  localStorage.setItem("products", JSON.stringify(products));
  const remProdModal = document.getElementsByClassName("remProdModal")[0];
  remProdModal.style.display = "none";
  showProducts();
}

function addcart(id) {
  cart.unshift(products[id]);
  showcart(cart);
  notifBage.style.display = "flex";
  return notifBage.innerHTML++;
}

function buyItemSett() {
  if (addcart()) {
    productList.innerHTML = "";
    var cardTime = new Date();
    const date = cardTime.getDate();
    const currentMonth = month[cardTime.getMonth()];
    const hours = cardTime.getHours();
    const minuts = cardTime.getMinutes();
    products = JSON.parse(localStorage.getItem("products")) || [];
    products.forEach((element, i) => {
      var img = element.img || "";
      var title = element.title || "";
      var price = element.price || "";
      var item = element.item || "";
      productList.innerHTML += `<div class="card product">
        <img
          class="productImg"
          src="${img}"
          alt="..."
        />
        <h3 class="cardTitle">${title}</h3>
        <hr />
        <div class="gallery">
          <div class="price">
            <h4 class="greyText">Price</h4>
            <h6 class="priceNum">${price} $</h6>
          </div>
          <div class="iteam">
            <h4 class="greyText">Iteam</h4>
            <h6>${(item -= 1)}</h6>
          </div>
        </div>
        <div class="buyWrap">
          <button onclick="addcart(${i})" class="priceBtn">Buy now</button>
        </div>
         <div class="productDate">
          <p>${date}, ${currentMonth}</p>
          <p>${hours}:${minuts}</p>
         </div>
        </div>`;
    });
  }
}

function showcart(arr) {
  if (arr.length) {
    cartList.innerHTML = "";
    var cardTime = new Date();
    const date = cardTime.getDate();
    const currentMonth = month[cardTime.getMonth()];
    const hours = cardTime.getHours();
    const minuts = cardTime.getMinutes();
    arr?.forEach((element, i) => {
      // console.log(element);
      element.item = 0;
      cartList.innerHTML += `<div class="card product">
        <img
          class="productImg"
          src="${element.img}"
          alt="..."
        />
        <h3 class="cardTitle">${element.title}</h3>
        <hr />
        <div class="gallery">
          <div class="price">
            <h4 class="greyText">Price</h4>
            <h6 class="priceNum">${element.price} $</h6>
          </div>
          <div class="iteam">
            <h4 class="greyText">Iteam</h4>
            <h6>${(element.item += 1)}</h6>
          </div>
        </div>
        <div class="buyWrap">
          <button onclick="deleteCard(${i})" class="priceBtn">Delete product</button>
        </div>
        <div class="productDate">
          <p>${date}, ${currentMonth}</p>
          <p>${hours}:${minuts}</p>
        </div>
      </div>`;
    });
  }
}

function deleteCard(index) {
  cart.splice(index, 1);
  showcart(cart);
}

function showBuyProduct() {
  if (cartList.style.display === "none") {
    notifBage.innerHTML = 0;
    notifBage.style.display = "none";
    cartList.style.display = "grid";
  } else {
    cartList.style.display = "none";
  }
  if (!cart.length) {
    cartList.innerHTML = `<h2>No items</h2>`;
  }
}
function changeUserImg() {
  const selectedFile = this.files[0];
  const imageUrl = window.URL.createObjectURL(selectedFile);

  // Rasm manzilini Local Storage'ga saqlash
  localStorage.setItem("userImageUrl", imageUrl);

  document.getElementById("userImg1").src = imageUrl;
  document.getElementById("userImg2").src = imageUrl;
}

window.addEventListener("load", function () {
  const imageUrl = localStorage.getItem("userImageUrl");
  if (imageUrl) {
    document.getElementById("userImg1").src = imageUrl;
    document.getElementById("userImg2").src = imageUrl;
  }
});
