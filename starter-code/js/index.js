

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
// function to hook up the buttons even if the content is not loaded
function ready() {
  var removeCartItemBtn = document.getElementsByClassName("btn-delete");

  for (var i = 0; i < removeCartItemBtn.length; i++) {
    var button = removeCartItemBtn[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var createBtn = document.getElementsByClassName("btn-create")[0];
  createBtn.addEventListener("click", createBtnClicked);
}

function removeCartItem(event) {
  var clickedBtn = event.target;
  clickedBtn.parentElement.remove();
  updateTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

function createBtnClicked(event) {
  var newItem = document.getElementById("name-new-item").value;
  var newItemPrice = document.getElementById("price-new-item").value;
  console.log(newItem + " " + newItemPrice);
  addItemToCart(newItem, newItemPrice);
  updateTotal();
}

function addItemToCart(newItem, newItemPrice) {
  var productRow = document.createElement("div");
  productRow.classList.add("product-row");
  var cartProducts = document.getElementsByClassName("cart-products")[0];
  var productRowContent = `
    <span class="product-name flex-item">${newItem}</span>
    <span class="price-per-item flex-item">${newItemPrice}</span>
    <div class="cart-quantity flex-item">
      <label for="quantity-input">QTY</label>
      <input type="number" class="quantity-input" id="quantity-input" value="0">
    </div>
    <span class="total-for-product flex-item">$0.00</span>
    <button class="btn btn-delete" type="button">Delete</button>`;
  productRow.innerHTML = productRowContent;
  cartProducts.append(productRow);
  productRow.getElementsByClassName("quantity-input")[0].addEventListener("change", quantityChanged);
  productRow.getElementsByClassName("btn-delete")[0].addEventListener("click", removeCartItem);
}

function updateTotal() {
  var productsContainer = document.getElementsByClassName("cart-products")[0];
  var productRows = productsContainer.getElementsByClassName("product-row");
  var total = 0;
  for (var i = 0; i < productRows.length; i++) {
    var productRow = productRows[i];
    var priceElement = productRow.getElementsByClassName("price-per-item")[0];
    var quantityElement = productRow.getElementsByClassName("quantity-input")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    var totalForProduct = Math.round((price * quantity) * 100) / 100;
    total = total + totalForProduct;
    //counting total for each product
    document.getElementsByClassName("total-for-product")[i].innerText = `$${totalForProduct.toFixed(2)}`;
  }

  total = Math.round(total * 100) / 100;
  // document.getElementsByClassName("total-for-product")[0].innerText = `$${total}`;
  document.getElementsByClassName("cart-total-price")[0].innerText = `$${total.toFixed(2)}`;
}
 



