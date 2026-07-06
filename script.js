let products = [

    { id:1, name:"555 Gold", price:300 },

    { id:2, name:"555 Pearl", price:300 },

    { id:3, name:"Camel Blue", price:320 },

    { id:4, name:"Davidoff Classic", price:320 },

    { id:5, name:"Davidoff Gold Slim", price:330 },

    { id:6, name:"Esse Change", price:200 },

    { id:7, name:"Malboro Red 1st Quality", price:290 },

    { id:8, name:"Malboro Red Pro", price:330 },

    { id:9, name:"Malboro Vista Double Ice", price:340 },

    { id:10, name:"Malboro Vista Double Mix", price:340 },

    { id:11, name:"Manchester Red", price:280 },

    { id:12, name:"Manchester Sapphire Blue", price:290 },

    { id:13, name:"Mond Variance", price:180 },

    { id:14, name:"Platinum Double", price:280 }

];

let customers = [

    {
        id:1,
        name:"Chai Tribe",
        phone:"9526807517",
        place:"Kowdiar"
    },

    {
        id:2,
        name:"ABC Stores",
        phone:"9876543210",
        place:"Trivandrum"
    },

    {
        id:3,
        name:"Royal Traders",
        phone:"9895000000",
        place:"Pattom"
    },

    {
        id:4,
        name:"Rahman Stores",
        phone:"9895111111",
        place:"Kazhakuttam"
    }

];

let billItems = [];

let selectedCustomer = null;
let selectedProduct = null;

const customerSearch = document.getElementById("customerSearch");
const customerResults = document.getElementById("customerResults");

const phone = document.getElementById("phone");
const place = document.getElementById("place");

const productSearch = document.getElementById("productSearch");
const productResults = document.getElementById("productResults");

const qty = document.getElementById("qty");

const billBody = document.getElementById("billBody");

const grandTotal = document.getElementById("grandTotal");
const totalQty = document.getElementById("totalQty");

const itemCount = document.getElementById("itemCount");
const itemCount2 = document.getElementById("itemCount2");

const billCustomer = document.getElementById("billCustomer");

const invoiceNo = document.getElementById("invoiceNo");
const billDate = document.getElementById("billDate");

const addBtn = document.getElementById("addBtn");

const saveBill = document.getElementById("saveBill");
const newBill = document.getElementById("newBill");
const shareBill = document.getElementById("shareBill");

/* ==========================================
   Invoice Number
========================================== */

function generateInvoice(){

    let last = localStorage.getItem("eazim_invoice");

    if(last==null){

        last=1;

    }else{

        last=parseInt(last)+1;

    }

    localStorage.setItem("eazim_invoice",last);

    invoiceNo.innerText=
    "EZ-"+String(last).padStart(6,"0");

}

generateInvoice();

/* ==========================================
   Date
========================================== */

billDate.innerText =
new Date().toLocaleDateString("en-IN",{

day:"2-digit",

month:"short",

year:"numeric"

});

/* ==========================================
   Customer Search
========================================== */

customerSearch.addEventListener("input",()=>{

const value=
customerSearch.value.toLowerCase();

customerResults.innerHTML="";

if(value==""){

customerResults.style.display="none";

return;

}

const filtered=customers.filter(c=>

c.name.toLowerCase().includes(value)

);

filtered.forEach(customer=>{

const div=document.createElement("div");

div.className="result-item";

div.innerHTML=customer.name;

div.onclick=function(){

selectedCustomer=customer;

customerSearch.value=customer.name;

phone.value=customer.phone;

place.value=customer.place;

billCustomer.innerHTML=customer.name;

customerResults.style.display="none";

};

customerResults.appendChild(div);

});

customerResults.style.display=
filtered.length?"block":"none";

});

/* ==========================================
   Product Search
========================================== */

productSearch.addEventListener("input",()=>{

const value=
productSearch.value.toLowerCase();

productResults.innerHTML="";

if(value==""){

productResults.style.display="none";

return;

}

const filtered=products.filter(product=>

product.name.toLowerCase().includes(value)

);

filtered.forEach(product=>{

const div=document.createElement("div");

div.className="result-item";

div.innerHTML=
product.name+" <b>₹"+product.price+"</b>";

div.onclick=function(){

selectedProduct=product;

productSearch.value=product.name;

productResults.style.display="none";

};

productResults.appendChild(div);

});

productResults.style.display=
filtered.length?"block":"none";

});

/* ==========================================
   Add Item
========================================== */

addBtn.onclick=function(){

if(selectedCustomer==null){

alert("Select Customer");

return;

}

if(selectedProduct==null){

alert("Select Product");

return;

}

let quantity=parseInt(qty.value);

if(isNaN(quantity)||quantity<=0){

quantity=1;

}

const total=
selectedProduct.price*quantity;

billItems.push({

product:selectedProduct.name,

price:selectedProduct.price,

qty:quantity,

total:total

});

renderBill();

productSearch.value="";

selectedProduct=null;

qty.value=1;

};

/* ==========================================
   Render Bill
========================================== */

function renderBill(){

billBody.innerHTML="";

let totalAmount=0;

let totalItems=0;

let quantity=0;

billItems.forEach((item,index)=>{

totalAmount+=item.total;

quantity+=item.qty;

totalItems++;

billBody.innerHTML += `

<tr>

    <td>${item.product}</td>

    <td>${item.qty}</td>

    <td>₹${item.price}</td>

    <td>₹${item.total}</td>

    <td>

        <button
            class="delete-btn"
            onclick="deleteItem(${index})">

            ✕
        </button>

    </td>

</tr>

`;

});

grandTotal.innerHTML =
"₹"+totalAmount;

totalQty.innerHTML =
quantity;

itemCount.innerHTML =
totalItems+" Items";

itemCount2.innerHTML =
totalItems;

saveLocal();

}

/* ==========================================
   Delete Item
========================================== */

function deleteItem(index){

billItems.splice(index,1);

renderBill();

}

/* ==========================================
   Local Storage
========================================== */

function saveLocal(){

const bill={

customer:selectedCustomer,

items:billItems

};

localStorage.setItem(

"eazim_current_bill",

JSON.stringify(bill)

);

}

function loadLocal(){

const data=

localStorage.getItem(

"eazim_current_bill"

);

if(!data){

return;

}

const bill=

JSON.parse(data);

if(bill.customer){

selectedCustomer=

bill.customer;

customerSearch.value=

bill.customer.name;

phone.value=

bill.customer.phone;

place.value=

bill.customer.place;

billCustomer.innerHTML=

bill.customer.name;

}

billItems=

bill.items||[];

renderBill();

}

loadLocal();

/* ==========================================
   Save Bill
========================================== */

saveBill.onclick=function(){

if(billItems.length==0){

alert("Bill is empty");

return;

}

alert(

"Bill Saved Successfully"

);

};

/* ==========================================
   New Bill
========================================== */

newBill.onclick=function(){

if(!confirm(

"Start a new bill?"

)){

return;

}

billItems=[];

selectedCustomer=null;

selectedProduct=null;

customerSearch.value="";

phone.value="";

place.value="";

productSearch.value="";

qty.value=1;

billCustomer.innerHTML=

"No Customer Selected";

localStorage.removeItem(

"eazim_current_bill"

);

generateInvoice();

renderBill();

};

/* ==========================================
   Share
========================================== */

shareBill.onclick=function(){

if(billItems.length==0){

alert("Bill is empty");

return;

}

let message="";

message+="*EAZIM BILL*%0A";

message+="Invoice : "+invoiceNo.innerText+"%0A";

message+="Date : "+billDate.innerText+"%0A";

message+="Customer : "+customerSearch.value+"%0A%0A";

billItems.forEach(item=>{

message+=item.product;

message+=" x ";

message+=item.qty;

message+=" = ₹";

message+=item.total;

message+="%0A";

});

message+="%0A";

message+="Grand Total : ";

message+=grandTotal.innerText;

window.open(

"https://wa.me/?text="+message,

"_blank"

);

};

/* ==========================================
   Add Customer (Temporary)
========================================== */

document
.getElementById("newCustomerBtn")
.onclick=function(){

const name=

prompt("Customer Name");

if(!name){

return;

}

const phoneNumber=

prompt("Phone Number");

const placeName=

prompt("Place");

const customer={

id:Date.now(),

name:name,

phone:phoneNumber||"",

place:placeName||""

};

customers.push(customer);

selectedCustomer=

customer;

customerSearch.value=

customer.name;

phone.value=

customer.phone;

place.value=

customer.place;

billCustomer.innerHTML=

customer.name;

};

/* ==========================================
   Close Search Dropdowns
========================================== */

document.addEventListener("click",(e)=>{

if(!e.target.closest(".search-wrapper")){

customerResults.style.display="none";

productResults.style.display="none";

}

});

/* ==========================================
   Keyboard Shortcuts
========================================== */

document.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){

if(document.activeElement===qty){

addBtn.click();

}

}

if(e.ctrlKey && e.key.toLowerCase()==="s"){

e.preventDefault();

saveBill.click();

}

if(e.ctrlKey && e.key.toLowerCase()==="n"){

e.preventDefault();

newBill.click();

}

});

/* ==========================================
   Initial Render
========================================== */

async function start(){

    await loadProducts();

    await loadCustomers();

    renderBill();

}

start();
                  
