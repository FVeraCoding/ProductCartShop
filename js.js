document.addEventListener("DOMContentLoaded", () => {

    fetch("data.json")
        .then(response => response.json())
        .then(data => {

            console.log(data);

            // Div de todos los productos
            const productList = document.querySelector(".product-list");
            const productCartList = document.querySelector(".product-cart-list");
            const totalPrice = document.querySelector(".total-amount");
            const totalDiv = document.querySelector(".total");

            let allProducts = [];
            let total = 0;
            let articleCartCount = 0;

            data.forEach(product => {

                // Div del producto
                const productDiv = document.createElement("div");
                productDiv.classList.add("product");

                // Imagen del producto
                const productImage = document.createElement("img");
                productImage.src = product.img;
                productImage.alt = product.name;
                productImage.classList.add("product-image");
                productDiv.appendChild(productImage);

                // Título del producto
                const productTitle = document.createElement("h3");
                productTitle.classList.add("product-title");
                productTitle.textContent = product.name;
                productDiv.appendChild(productTitle);

                // Precio del producto
                const productPrice = document.createElement("p");
                productPrice.classList.add("product-price");
                productPrice.textContent = `$${product.price}`;
                productDiv.appendChild(productPrice);

                // Botón de añadir al carrito
                const buttonAddtocart = document.createElement("button");
                buttonAddtocart.classList.add("addtocart");
                buttonAddtocart.textContent = "Add to Cart";
                productDiv.appendChild(buttonAddtocart);

                productList.appendChild(productDiv);

                // Evento de click en añadir al carrito
                buttonAddtocart.addEventListener("click", (e) => {
                    let infoProduct = {
                        name: "",
                        quantity: 1,
                        price: 0
                    };

                    const product = e.target.parentElement;
                    const productName = product.querySelector(".product-title").textContent;
                    const productPrice = product.querySelector(".product-price").textContent;

                    infoProduct.name = productName;
                    infoProduct.price = productPrice;

                    // Buscar si el producto ya existe en allProducts
                    const index = allProducts.findIndex(product => product.name === infoProduct.name);

                    if (index !== -1) {
                        // Si el producto ya existe, incrementamos la cantidad
                        allProducts[index].quantity += 1;

                        const productos = document.querySelectorAll(".product-cart");
                        productos[index].querySelector(".product-cart-quantity").textContent = `x${allProducts[index].quantity}`;
                        productos[index].querySelector(".product-cart-price").textContent = (allProducts[index].quantity * parseFloat(allProducts[index].price.replace("$", ""))).toFixed(2);

                    } else {
                        // Si el producto no existe, lo añadimos al array y lo mostramos en el carrito
                        allProducts.push(infoProduct);

                        // Div del producto en el carrito
                        const productCart = document.createElement("div");
                        productCart.classList.add("product-cart");

                        // Cantidad del producto en el carrito
                        const productCartQuantity = document.createElement("p");
                        productCartQuantity.classList.add("product-cart-quantity");
                        productCartQuantity.textContent = `x${infoProduct.quantity}`;
                        productCart.appendChild(productCartQuantity);

                        // Nombre del producto en el carrito
                        const productCartName = document.createElement("p");
                        productCartName.classList.add("product-cart-name");
                        productCartName.textContent = infoProduct.name;
                        productCart.appendChild(productCartName);

                        // Precio del producto en el carrito
                        const productCartPrice = document.createElement("p");
                        productCartPrice.classList.add("product-cart-price");
                        productCartPrice.textContent = parseFloat(infoProduct.price.replace("$", "")).toFixed(2);
                        productCart.appendChild(productCartPrice);

                        // Icono de eliminar
                        const productCartXicon = document.createElement("img");
                        productCartXicon.src = "images/icons8-x-50.png";
                        productCartXicon.alt = "close";
                        productCartXicon.classList.add("product-cart-x-icon");
                        productCart.appendChild(productCartXicon);

                        productCartXicon.addEventListener("click", (e) => {


                            const productName = e.target.previousElementSibling.previousElementSibling.textContent;

                            const productQuantity = parseInt(e.target.previousElementSibling.previousElementSibling.previousElementSibling.textContent.replace("x", ""));

                            articleCartCount -= productQuantity;
                            articleCount.textContent = articleCartCount;

                            const index = allProducts.findIndex(product => product.name === productName);

                            if (index !== -1) {
                                allProducts.splice(index, 1);
                            }

                            e.target.parentElement.remove();

                            total = 0;

                            allProducts.forEach(product => {
                                total += product.quantity * parseFloat(product.price.replace("$", ""));
                            });

                            totalPrice.textContent = `$${total.toFixed(2)}`;

                            console.log(allProducts);
                        })

                        productCartList.appendChild(productCart);


                        

                    }

                    // Contador de artículos en el carrito.

                    articleCartCount++;

                    const articleCount = document.querySelector("#article-count");
                    articleCount.textContent = articleCartCount;


                    total = 0;


                    // Calcular cantidad total de precio.

                    allProducts.forEach(product => {
                        total += product.quantity * parseFloat(product.price.replace("$", ""));
                    });

                    totalPrice.textContent = `$${total.toFixed(2)}`;


                });

                

            });

            // Abrir y cerrar el carrito.

            const cartIcon = document.querySelector("#cart-icon-image");
            cartIcon.addEventListener("click", (e) => {
                if(productCartList.style.display === "" || productCartList.style.display === "none"){
                    productCartList.style.display = "flex";
                    totalDiv.style.display = "block";
                } else {
                    productCartList.style.display = "none";
                    totalDiv.style.display = "none";
                }
            });
            

        });
});
