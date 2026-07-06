const products = [

{
name:"Gold Flake Kings",
price:270
},

{
name:"Classic Regular",
price:260
},

{
name:"Marlboro Advance",
price:340
},

{
name:"Gold Flake Lights",
price:250
}

];

const productSelect=document.getElementById("product");

products.forEach(product=>{

let option=document.createElement("option");

option.value=product.name;

option.textContent=product.name;

productSelect.appendChild(option);

});

let grandTotal=0;

document.getElementById("addBtn").addEventListener("click",()=>{

const productName=productSelect.value;

const qty=parseInt(document.getElementById("qty").value);

if(productName===""||!qty){

alert("Select product and quantity");

return;

}

const product=products.find(p=>p.name===productName);

const total=product.price*qty;

grandTotal+=total;

document.getElementById("grandTotal").innerText="₹"+grandTotal;

const row=document.createElement("tr");

row.innerHTML=`

<td>${product.name}</td>

<td>${qty}</td>

<td>₹${product.price}</td>

<td>₹${total}</td>

<td>

<button class="delete-btn">

X

</button>

</td>

`;

row.querySelector(".delete-btn").onclick=function(){

grandTotal-=total;

document.getElementById("grandTotal").innerText="₹"+grandTotal;

row.remove();

};

document.getElementById("billBody").appendChild(row);

document.getElementById("qty").value="";

productSelect.selectedIndex=0;

});
