/**
 * 1- get the items of local storage and convert it to json ()=> check the product.js page for how to 
 * 2- loop oveer the items and show the data using the selected Id from HTML check script.js for same function using foreach
 * 3- calcaulate the total of all the cart items 
 */
  
 let cartItemsDiv = document.getElementById('cart__items'); 

function getProductsFromLocalStorage() {
    let cs = localStorage.getItem('cartItems');
    if (cs === null) {
      
    } else {
        cs= JSON.parse(cs)
        let totalQuantity =  0 
        let totalPrice = 0 
        cartItemsDiv.innerHTML = ''
      cs.forEach((product,index)=>{
          totalPrice +=  product.price
          totalQuantity += parseInt( product.quantity )

            cartItemsDiv.insertAdjacentHTML ('beforeend',`
            <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
            <div class="cart__item__img">
              <img src="${product.imageUrl}" alt="${product.altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>${product.color}</p>
                <p>€${product.price}</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem" onclick='deleteItem(${index})'>Delete</p>
                </div>
              </div>
            </div>
          </article>
            `)
      });
      document.getElementById('totalQuantity').innerText =  totalQuantity
      document.getElementById('totalPrice').innerText = totalPrice
    }}
    function deleteItem(index){
        console.log(index)
        let cs = JSON.parse( localStorage.getItem('cartItems'));
        cs.splice(index,1) // to delete the items from the array 
        localStorage.setItem('cartItems',JSON.stringify(cs))
        getProductsFromLocalStorage()
    }
    
    function validate(){
        var firstName = document.getElementById("firstName").value;
                var lastName = document.getElementById("lastName").value;
                var address = document.getElementById("address").value; 
                var city = document.getElementById("city").value;
                var email = document.getElementById("email").value;
        if (firstName == ''){
            alert('First name is empty')
            return true
        }
        else if(lastName == ''){
            alert('Last name is empty')
            return true
        }
        else if(address == ''){ 
            alert('Address is empty')
        return true}
        else if(city == ''){ 
            alert('City is empty')
        return true}
        else if(email == ''){ 
            alert('Email is empty')
        return true}
        
    
    
    }
    document.getElementById('order')
    .addEventListener('click',function(e){
    e.preventDefault();
    let cart = JSON.parse( localStorage.getItem('cartItems'))
    if( cart.length == 0){
        alert('You need to add products to your cart');
    }else{
            if(validate()){return true}else{
            var firstName = document.getElementById("firstName").value;
            var lastName = document.getElementById("lastName").value;
            var address = document.getElementById("address").value; 
            var city = document.getElementById("city").value;
            var email = document.getElementById("email").value;
            let productIds = cart.map(item => item.id) // read the array and return new id array
        let orderObj = {
            contact:{
                firstName,
                lastName,
                address,
                city,
                email
            },
            products:productIds
        }
        console.log(orderObj)
        fetch('http://localhost:3000/api/products/order',{
            method :'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify(orderObj)
        }).then(res=>res.json()).then(data=>{
            console.log(data)
            localStorage.setItem('orderId',data.orderId)
            window.location.href='/html/confirmation.html';
        }).catch(error=>console.log(error))
    }
    }
})


    /***
     * collect the values from the inputs 
     * make an object with contact and product id  let obj = {conatct : { firstname  : value from the input } , products : [ids]}
     * send this object to the api to get the confirmation number 
     * save the confirmation to local storage 
     * show it in the last page confirmation  only in confirmation page 
     */
document.addEventListener('load',getProductsFromLocalStorage())