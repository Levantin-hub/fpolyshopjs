$(function () {
  const urlCate = "http://localhost:3000/categories";
  const urlPrd = "http://localhost:3000/products";
  const urlBrand = "http://localhost:3000/brands";

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  //  load danh mục sản phẩm
  fetch(urlCate, { method: "GET" })
    .then((res) => res.json())
    .then((data) => {
      let txtCate = "";
      data.forEach((cate) => {
        txtCate += `<li class="list-group-item"><a href="#" ">${capitalize(
          cate.name
        )}</a></li>`;
      });
      $("#card-category").html(txtCate);
      // $("#js-section-category").append(listCate);
    });

  fetch(urlBrand, { method: "GET" })
    .then((res) => res.json())
    .then((data) => {
      let txtBrand = "";
      data.forEach((brand) => {
        txtBrand += `<li class="list-group-item"><a href="#">${capitalize(
          brand.name
        )}</a></li>`;
      });
      $("#card-trademark").html(txtBrand);
      // $("#js-section-category").append(listCate);
    });

  //  load  sản phẩm
  fetch(`${urlPrd}?_limit=8`, { method: "GET" })
    .then((res) => res.json())
    .then((data) => {
      let txtPrd = "";
      data.forEach((product) => {
        txtPrd +=
          `<div class="prd-item col-20 col-lg-3 col-md-4 col-sm-4  col-xs-6 col-6 ">
                <a href="" class="d-block m-0 p-2 text-center">
                <span class="itemid hide" style="display: none;">${
                  product.id
                }</span>
                    <figure class="prd-img">
                        <img class="lazyload full zoom" data-src="./images/products/${
                          product.image
                        }" alt="" loading="lazy" height="300" width="300" >
                        
                    </figure>
                    <button type="submit" class="add-to-cart btn btn-outline-primary mt-2"  style="font-size: 12px;"><i class="fas fa-shopping-cart"></i> Add to card</button>
                    <div class="prd-name mt-1">
                        <h5 class="name">${capitalize(product.name)}</h5>
                    </div>
                    <div class="prd-price price"">
                        <strong>` +
          FormatCurrency(Number(product.price)) +
          ` ₫</strong>
                    </div>
                </a>
            </div>`;
      });
      $("#js-prd-new").html(txtPrd);
      LoadImg();
    });

  const FormatCurrency = (olded, discount = 0) => {
    let old = olded;
    let result = "";
    let number;
    if (discount == 0) {
      number = old;
    } else {
      number = (old * (100 - discount)) / 100;
    }
    890000;
    number = number.toString(10);
    let index = 0;
    for (let i = number.length - 1; i >= 0; i--) {
      if (index < 3) {
        result += "0";
      } else if (index == 3 || index == 6) {
        result += "." + number[i];
      } else {
        result += number[i];
      }
      index++;
    }
    result = result.split("").reverse().join("");
    // console.log(result);
    return result;
  };
  // Lazyloading image
  const LoadImg = () => {
    if ("loading" in HTMLImageElement.prototype) {
      const images = document.querySelectorAll("img.lazyload");
      images.forEach((img) => {
        img.src = img.dataset.src;
      });
    } else {
      // import Lazysize
      let script = document.createElement("script");
      script.async = true;
      script.src = "./js/lazysizes.min.js";
      document.body.appendChild(script);
    }
  };

  $(document).ready(function () {
    displayCart();

    $("#js-prd-new").on("click", ".add-to-cart", function (e) {
      e.preventDefault();
      var parent, id, name, price, image;

      parent = $(this).closest(".prd-item");
      id = parent.find(".itemid").text();
      name = parent.find(".name").text();
      price = parseFloat(parent.find(".price").text()).toFixed(2); //
      image = parent.find("img").attr("src");

      var r = confirm("you want to add " + name + " to cart?");
      if (r == true) {
        americo_shoppingCart.addITemToTheCart(id, name, price, image, 1);
        displayCart();
      } else {
        // alert("You pressed Cancel!");
      }

      // confirm("You have successfully added" + name);
    });

    $(".panel-footer").on("click", ".emptyCart", function (e) {
      e.preventDefault();

      americo_shoppingCart.clearCart();
      displayCart();
    });

    $(".numberOfItems").html(americo_shoppingCart.countCart());

    $(".panel-body").on("click", "#removeItem", function (e) {
      e.preventDefault();
      var itemId = $(this).attr("data-id");
      americo_shoppingCart.removeAllItemFromCart(itemId);
      displayCart();
    });

    $(".panel-body").on("click", "#removeOneItem", function (e) {
      e.preventDefault();
      var itemId = $(this).attr("data-id");
      americo_shoppingCart.removeItemFromCart(itemId);
      displayCart();
    });

    $(".panel-body").on("click", "#addItem", function (e) {
      e.preventDefault();
      var itemId = $(this).attr("data-id");
      americo_shoppingCart.addITemToTheCart(itemId, "", 0, "", 1);
      displayCart();
    });
  });
  function displayCart() {
    var cartArray = americo_shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
      output +=
        '<tr class="singleProduct"><td class="prodImage"><img class="img-responsive" style="width: 50px; height: 50px" src="' +
        cartArray[i].image +
        '" alt=""></td>' +
        '<td class="text-center amountPods">' +
        cartArray[i].count +
        "</td>" +
        '<td class="singleProd">' +
        cartArray[i].price +
        " đ</td>" +
        '<td class="totalProd">' +
        cartArray[i].total +
        " đ</td></tr>" +
        "<td></td>" +
        '<td class="deleteItem"><a id="removeItem" data-id="' +
        cartArray[i].id +
        '" href="#!" class="btn btn-outline-danger btn-xs" role="button"><i class="fas fa-trash-alt"></i></a></td>' +
        '<td class="addItem"><a id="removeOneItem" data-id="' +
        cartArray[i].id +
        '" href="#!" class="btn btn-primary btn-xs " role="button">-</a></td>' +
        '<td class="addItem"><a id="addItem" data-id="' +
        cartArray[i].id +
        '" href="#!" class="btn btn-success btn-xs " role="button">+</a></td></tr>';
    }

    $("#productLists").html(output);
    $(".numberOfItems").html(americo_shoppingCart.countCart());
    $("span.cartTotal").html(americo_shoppingCart.totalCart());
  }
  // function numberWithCommas(x) {
  //   x = x.toString();
  //   var pattern = /(-?\d+)(\d{3})/;
  //   while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  //   return x;
  // }
});
