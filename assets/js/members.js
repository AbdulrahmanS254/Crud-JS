// i will render the users from local storage first

let members = JSON.parse(localStorage.getItem("allMembers"));
console.log(members);

// now i got the members data from local storage
// time to think how to put it in the table

const table = document.getElementById("membersTable");
const tableBody = document.getElementById("tableBody");

// function to not repeat the code for rendering every element

// function renderData(element) {
//     let row = document.createElement("tr");
//     let nameCell = document.createElement("td");
//     nameCell.innerHTML = el.firstName + " " + el.lastName;
//     row.appendChild(nameCell);
//     tableBody.appendChild(row);
// }

members.forEach((el) => {
    let row = document.createElement("tr");
    let nameCell = document.createElement("td");
    nameCell.innerHTML = el.firstName + " " + el.lastName;
    row.appendChild(nameCell);
    tableBody.appendChild(row);
});
