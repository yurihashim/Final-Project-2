var cart = {
    // (A) PROPERTIES
    hPdt : null, // HTML products list
    hItems : null, // HTML current cart
    items : {}, // Current items in cart
  
    // (B) LOCALSTORAGE CART
    // (B1) SAVE CURRENT CART INTO LOCALSTORAGE
    save : function () {
      localStorage.setItem("cart", JSON.stringify(cart.items));
    },
  
    // (B2) LOAD CART FROM LOCALSTORAGE
    load : function () {
      cart.items = localStorage.getItem("cart");
      if (cart.items == null) { cart.items = {}; }
      else { cart.items = JSON.parse(cart.items); }
    },
  
    // (B3) EMPTY ENTIRE CART
    nuke : function () {
      if (confirm("Empty cart?")) {
        cart.items = {};
        localStorage.removeItem("cart");
        cart.list();
      }
    },
  
    // (C) INITIALIZE
    init : function () {
      // (C1) GET HTML ELEMENTS
      cart.hPdt = document.getElementById("cart-products");
      cart.hItems = document.getElementById("cart-items");
  
      // (C2) DRAW PRODUCTS LIST
      cart.hPdt.innerHTML = "";
      let VeganP, item, part;
      for (let id in Veganproducts) {
        // WRAPPER
        VeganP= Veganproducts[id];
        item = document.createElement("div");
        item.className = "p-item";
        cart.hPdt.appendChild(item);
  
        // PRODUCT IMAGE
        part = document.createElement("img");
        part.src = "images/" + VeganP.img;
        part.className = "p-img";
        item.appendChild(part);
  
        // PRODUCT NAME
        part = document.createElement("div");
        part.innerHTML = VeganP.name;
        part.className = "p-name";
        item.appendChild(part);
  
        // PRODUCT DESCRIPTION
        part = document.createElement("div");
        part.innerHTML = VeganP.desc;
        part.className = "p-desc";
        item.appendChild(part);
  
        // PRODUCT PRICE
        part = document.createElement("div");
        part.innerHTML = "$" + VeganP.price;
        part.className = "p-price";
        item.appendChild(part);
  
        // ADD TO CART
        part = document.createElement("input");
        part.type = "button";
        part.value = "Add to Cart";
        part.className = "cart p-add";
        part.onclick = cart.add;
        part.dataset.id = id;
        item.appendChild(part);
      }
  
      // (C3) LOAD CART FROM PREVIOUS SESSION
      cart.load();
  
      // (C4) LIST CURRENT CART ITEMS
      cart.list();
    },
  
    // (D) LIST CURRENT CART ITEMS (IN HTML)
    list : function () {
      // (D1) RESET
      cart.hItems.innerHTML = "";
      let item, part, pdt;
      let empty = true;
      for (let key in cart.items) {
        if(cart.items.hasOwnProperty(key)) { empty = false; break; }
      }
  
      // (D2) CART IS EMPTY
      if (empty) {
        item = document.createElement("div");
        item.innerHTML = "Your cart is currently empty...";
        cart.hItems.appendChild(item);
      }
  
      // (D3) CART IS NOT EMPTY - LIST ITEMS
      else {
        let VeganP, total = 0, subtotal = 0;
        for (let id in cart.items) {
          // ITEM
          VeganP = Veganproducts[id];
          item = document.createElement("div");
          item.className = "c-item";
          cart.hItems.appendChild(item);
  
          // NAME
          part = document.createElement("div");
          part.innerHTML = VeganP.name;
          part.className = "c-name";
          item.appendChild(part);
  
          // REMOVE
          part = document.createElement("input");
          part.type = "button";
          part.value = "X";
          part.dataset.id = id;
          part.className = "c-del cart";
          part.addEventListener("click", cart.remove);
          item.appendChild(part);
  
          // QUANTITY
          part = document.createElement("input");
          part.type = "number";
          part.value = cart.items[id];
          part.dataset.id = id;
          part.className = "c-qty";
          part.addEventListener("change", cart.change);
          item.appendChild(part);
  
          // SUBTOTAL
          subtotal = cart.items[id] * VeganP.price;
          total += subtotal;
        }
  
        // EMPTY BUTTONS
        item = document.createElement("input");
        item.type = "button";
        item.value = "Empty";
        item.addEventListener("click", cart.nuke);
        item.className = "c-empty cart";
        cart.hItems.appendChild(item);
  
        // CHECKOUT BUTTONS
        item = document.createElement("input");
        item.type = "button";
        item.value = "Checkout - " + "$" + total;
        item.addEventListener("click", cart.checkout);
        item.className = "c-checkout cart";
        cart.hItems.appendChild(item);
      }
    },
  
    // (E) ADD ITEM INTO CART
    add : function () {
      if (cart.items[this.dataset.id] == undefined) {
        cart.items[this.dataset.id] = 1;
      } else {
        cart.items[this.dataset.id]++;
      }
      cart.save();
      cart.list();
    },
  
    // (F) CHANGE QUANTITY
    change : function () {
      if (this.value == 0) {
        delete cart.items[this.dataset.id];
      } else {
        cart.items[this.dataset.id] = this.value;
      }
      cart.save();
      cart.list();
    },
    
    // (G) REMOVE ITEM FROM CART
    remove : function () {
      delete cart.items[this.dataset.id];
      cart.save();
      cart.list();
    },
    
    // (H) CHECKOUT
    checkout : function () {
      // SEND DATA TO SERVER
      // CHECKS
      // SEND AN EMAIL
      // RECORD TO DATABASE
      // PAYMENT
      // WHATEVER IS REQUIRED
      alert("TO DO");
  
      /*
      var data = new FormData();
      data.append('cart', JSON.stringify(cart.items));
      data.append('products', JSON.stringify(products));
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "SERVER-SCRIPT");
      xhr.onload = function(){ ... };
      xhr.send(data);
      */
    }
  };
  window.addEventListener("DOMContentLoaded", cart.init);



  