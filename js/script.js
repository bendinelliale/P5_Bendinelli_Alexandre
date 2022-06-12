let items = document.getElementById('items');
//using fetch
fetch('http://localhost:3000/api/products').then(data=>data.json()).then(data=>{
    console.log(data);
data.forEach(element => {
    items.insertAdjacentHTML('beforeend',`<a href="./product.html?id=${element._id}">
    <article>
      <img src="${element.imageUrl}" alt="${element.altTxt}">
      <h3 class="productName">${element.name}</h3>
      <p class="productDescription">${element.description}</p>
    </article>
  </a> `);
});
}).catch(err => console.log(err));