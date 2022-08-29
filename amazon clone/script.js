
function getItems () {
    db.collection("products").get().then((product) => {
        // console.log(product)
        let items = [];
        product.forEach((doc) => {
            items.push({
                id: doc.id,
                image: doc.data().Image,
                name1: doc.data().Name,
                name2: doc.data().Name2,
                brand: doc.data().Brand,
                rating: doc.data().Rating,
                price: doc.data().Price,
                realPrice: doc.data().RealPrice, 
                discount: doc.data().Discount
            })
        });
        console.log(items)
        generateItems(items)
    });    
}

function addToCart(item){
    // console.log(item);
    let cartItem = db.collection("cart-items").doc(item.id);
    cartItem.get().then(function(doc){
        if(doc.exists){
            cartItem.update({
                quantity: doc.data().quantity + 1
            })
        } else {
            cartItem.set({
                image: item.image,
                brand: item.brand,
                name: item.name1,
                price: item.price,
                rating: item.rating,
                quantity: 1
            })
        }
    })
}

    function generateItems(items){
        // let itemContent = "";
        items.forEach((item)=>{
            let doc = document.createElement('div');
            doc.classList.add('main-product-section-1', 'mr-5', 'mt-10');
            doc.innerHTML = `
        <div class="main-product-section-1 mr-5 mt-10">
            <div class="product-image w-44 h-58 bg-white rounded-lg p-4"> 
                <img class="w-full h-full" src= "${item.image}">
            </div>
            <div class="product-name text-gray=700 font-bold mt-2 text-sm">
               <span>${item.name1}</span><br><span>${item.name2}</span> 
            </div>
            <div class="product-company text-green-700">
                ${item.brand}
            </div>
            <div class="product-rating text-yellow-300 text-bold my-1">
                ⭐⭐⭐⭐⭐ ${item.rating}
            </div>
            <div class="product-price font-bold text-gray-700 text-l"> 
               <b class="text-red-600">(-${item.discount}%) </b><sup>₹</sup> ${numeral(item.price).format('$0,0')} (<del><sup>₹</sup> ${numeral(item.realPrice).format('$0,0')}</del>) 
            </div>
        </div>
            `

            let addToCartEl = document.createElement("div");
            addToCartEl.classList.add("hover:bg-yellow-600", "cursor-pointer", "product-add", "h-8", "w-28", "rounded", "bg-yellow-500", "text-white", "text-md", "flex", "justify-center", "items-center");
            addToCartEl.innerText = "Add to cart";
            addToCartEl.addEventListener("click", function(){
                addToCart(item)
            })
            doc.appendChild(addToCartEl);
            document.querySelector(".main-product-section").appendChild(doc);
        })
    }

getItems();