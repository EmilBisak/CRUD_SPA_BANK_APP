window.addEventListener('beforeunload',function () {
  localStorage.db = JSON.stringify(db)
})
if (localStorage.db) {
  var db = JSON.parse(localStorage.db);
}else{
  var db = [];
}
let accBtn = document.querySelector('#accBtn'),
  addBtn = document.querySelector('#addBtn'),
  editBtn = document.querySelector('#editBtn'),
  tbody = document.querySelector('#mainTbody'),
  editTbody = document.querySelector('#editTbody'),
  mainRow = document.querySelector('.main-row'),
  formRow = document.querySelector('.form-row'),
  idForm = document.querySelector('#idForm'),
  nameForm = document.querySelector('#nameForm'),
  depositForm = document.querySelector('#depositForm'),
  cCardForm = document.querySelector('#cCardForm'),
  addFormBtn = document.querySelector('#addFormBtn'),
  editFormRow = document.querySelector('.editFormRow'),
  editId = document.querySelector('#editId'),
  editName = document.querySelector('#editName'),
  editDeposit = document.querySelector('#editDeposit'),
  editCcard = document.querySelector('#editCcard'),
  save = document.querySelector('#save'),
  index = null,
  editRow = document.querySelector('.editRow');


// first thing first
createTable();
// add listeners
addBtn.addEventListener('click',showForm);
accBtn.addEventListener('click',showMain);
addFormBtn.addEventListener('click',addAccToDb);
editBtn.addEventListener('click',createEditTable);
save.addEventListener('click', saveAccToDb);


function createTable() {
  let text = '';
  formRow.style.display = "none";
  mainRow.style.display = "block";
  editRow.style.display = "none";
  editFormRow.style.display = "none";
  db.forEach(function (el) {
    text += '<tr>';
    text += '<td>'+el.id+'</td>';
    text += '<td>'+el.name+'</td>';
    text += '<td>'+el.deposit+'</td>';
    text += '<td>'+el.cCard+'</td>';
    text += '<tr>';
  });
  tbody.innerHTML = text;
}


function createEditTable() {
  let text = '';
  formRow.style.display = "none";
  mainRow.style.display = "none";
  editRow.style.display = "block";
  editFormRow.style.display = "none";
  db.forEach(function (el,index) {
    text += '<tr>';
    text += '<td>'+el.id+'</td>';
    text += '<td>'+el.name+'</td>';
    text += '<td>'+el.deposit+'</td>';
    text += '<td>'+el.cCard+'</td>';
    text += '<td><button class="btn btn-sm btn-warning edit '+index+'">Edit</button></td>';
    text += '<td><button id="'+index+'" class="btn btn-sm btn-danger delete">Delete</button></td>';
    text += '<tr>';

  });
  editTbody.innerHTML = text;
  let allDeleteBtns= document.querySelectorAll('.delete');
  let allEditBtns = document.querySelectorAll('.edit');
  for (var i = 0; i < allDeleteBtns.length; i++) {
    allDeleteBtns[i].addEventListener('click',deleteFromDb);
    allEditBtns[i].addEventListener('click',editAccountFromDb);

  }
}

function showForm() {
  formRow.style.display = "block";
  mainRow.style.display = "none";
  editRow.style.display = "none";
  editFormRow.style.display = "none";
}

function showMain() {
  formRow.style.display = "none";
  mainRow.style.display = "block";
  editRow.style.display = "none";
  editFormRow.style.display = "none";
}

function addAccToDb() {
  db.push({
    id : idForm.value,
    name : nameForm.value,
    deposit : depositForm.value,
    cCard : cCardForm.value,
  })
  idForm.value = "";
  nameForm.value = "";
  depositForm.value = "";
  cCardForm.value = "";
  createTable();
}


function deleteFromDb() {
  let index = this.id;
  db.splice(index,1);
  createTable();
}

function editAccountFromDb() {
  editFormRow.style.display = "block";
  formRow.style.display = "none";
  mainRow.style.display = "none";
  editRow.style.display = "none";

  index = this.className.split(" ").pop();
  // let index = this.className.split(" ")[this.className.split(" ").length-1]; //DRUGI NACIN PISANJA

  let id = db[index].id;
  let name = db[index].name;
  let deposit = db[index].deposit;
  let cCard = db[index].cCard;

  editId.value = id;
  editName.value = name;
  editDeposit.value = deposit;
  editCcard.value = cCard;
}

function saveAccToDb() {
  db[index].id = editId.value;
  db[index].name = editName.value;
  db[index].deposit = editDeposit.value;
  db[index].cCard = editCcard.value;

  createTable();
}
