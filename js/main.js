$(function () {
    
    const urlPrd = "http://localhost:3000/products";
    

    const capitalize = (s) => {
        if (typeof s !== "string") return "";
        return s.charAt(0).toUpperCase() + s.slice(1);
      };
     //  load  sản phẩm
  fetch(`${urlPrd}?_limit=8`, { method: "GET" })
  .then((res) => res.json())
  .then((data) => {
    let txtPrd = "";
    data.forEach((product) => {
      txtPrd +=
          `
          <div class="col-md-3 p-0">
          <div class="card" style="width: 17.85rem;">
            <img class="card-img-top" src="./images/products/${product.image}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${capitalize(product.name)}</h5>
              <span class="price">
                <p class="float-left" >${FormatCurrency(Number(product.price))} <a class="text-muted" href="">đ</a></p>
               
              </span>
            </div>
          </div>
        </div>
          `;
    });
    $("#js-prd-top").html(txtPrd);
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
})