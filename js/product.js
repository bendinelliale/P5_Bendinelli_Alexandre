let price = document.getElementById('price');
let quantity = document.getElementById('quantity');
let productName = document.getElementById('title');
let productDescription = document.getElementById('description');
let colorsOPtions = document.getElementById('colors');
let image = document.getElementById('image');
let addToCart = document.getElementById('addToCart');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
fetch('http://localhost:3000/api/products/'+id).then(data=>data.json()).then(data=>{
    console.log(data)
    price.innerText=data.price
    productDescription.innerText=data.description
    productName.innerText=data.name
    image.src = data.imageUrl
    image.alt = data.altTxt
    data.colors.forEach(color => {
        colorsOPtions.insertAdjacentHTML('beforeend', 
        `<option value="${color}">${color}</option>`
        )})

   addToCart.addEventListener('click',()=>{
       let product = {
           id  : data._id ,
        price : data.price ,
        description : data.description,
        name : data.name ,
        imageUrl :  data.imageUrl,
        altTxt :data.altTxt , 
        color :  colorsOPtions.value,
        quantity : quantity.value ,
       }

       // check if localstroge is empty or not 
       // if empty add the product direct to it as an array 
        if (localStorage.getItem('cartItems')== null){
            localStorage.setItem('cartItems',JSON.stringify([product]))
        }else{
            // the cart is not empty so we need to get the old values convert it back again
            // to array and JSON to use it then we puch the created product to the array then save the new list with added items again to local storage 
            let cartItems = JSON.parse( localStorage.getItem('cartItems'))
            cartItems.push(product)
            localStorage.setItem('cartItems',JSON.stringify(cartItems))
        }
      
       
   })     
})