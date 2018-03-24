//get elements from the Form
let fullname = document.getElementById("fullname");
let address = document.getElementById("address");
let email = document.getElementById("email");
let phoneNumber = document.getElementById("phoneNumber");
let addContact = document.getElementById("submit");
let contacts = document.getElementById("listOfContacts");

//create Show/Hide function
function Show(e){
    let element = e.target;
    let nextSibling = element.nextSibling;
    let classList = nextSibling.classList;
    if(classList.contains("hide")){
        nextSibling.classList.remove("hide");
    }
    else{
        nextSibling.classList.add("hide");
    }
}

//create array to store entries
let arrContacts = [];

//event handler
addContact.addEventListener("click",addToAddressBook);

//create contact object
function Contact(fullname,address,email,phoneNumber){
    this.fullname = fullname;
    this.address = address;
    this.email = email;
    this.phoneNumber = phoneNumber;
}

function addToAddressBook(){
    if(fullname.value !== "" && address.value !== "" && email.value !== "" && phoneNumber.value !== ""){
        //Add contents to array & Local Storage
        let contacts = new Contact(fullname.value,address.value,email.value,phoneNumber.value);
        
        //store in array
        arrContacts.push(contacts);

        //store in LocalStorage
        localStorage['contacts'] = JSON.stringify(arrContacts);

        //clear the Form
        clearForm();

        //Updating and Displaying all records
        showAddressBook();
    }
}

function clearForm(){
    let formElements = document.querySelectorAll(".formElements");
    for(let i in formElements){
        formElements[i].value = "";
    }
}

function showAddressBook(){
    //check if key contacts exist in local storage or else create it
    if(localStorage['contacts'] === undefined){
        localStorage['contacts'] = "[]";
    }
    else{
        arrContacts = JSON.parse(localStorage['contacts']);
        contacts.innerHTML = "";
        for(let i in arrContacts){
            let str = '<li><a href="#" onClick=Show(event)>'+ arrContacts[i].fullname +'</a>';
                str += '<ul class="hide">';
                str += '<li>' + '<strong>Address:</strong> ' + arrContacts[i]["address"] + '</li>';
                str += '<li>' + '<strong>Email:</strong> '+ arrContacts[i]["email"] + '</li>';                        
                str += '<li>' + '<strong>Telephone:</strong> ' + arrContacts[i]["phoneNumber"] + '</li>';                    
                str += '</ul>';    
                str += '</li>';
                contacts.innerHTML += str;
        }
    }
}
showAddressBook();
