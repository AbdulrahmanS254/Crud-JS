// i will render the users from local storage first

let members = JSON.parse(localStorage.getItem("allMembers"));

// now i got the members data from local storage
// time to think how to put it in the table

const table = document.getElementById("membersTable");
const tableBody = document.getElementById("tableBody");

const memberModal = document.getElementById("memberModal");

// function to not repeat the code for rendering every element

function renderData(element, propertyName, row) {
    let cell = document.createElement("td");

    let value =
        element[propertyName] ||
        (propertyName === "updated_At" ? element.created_At : "");

    cell.innerHTML = value;
    row.appendChild(cell);
}

function buttonCreate(btnClass, btnText, row) {
    let btnName = document.createElement("button");
    btnName.classList.add(btnClass);
    btnName.innerHTML = btnText;

    let buttonsCell = document.createElement("td");
    buttonsCell.appendChild(btnName);
    row.appendChild(buttonsCell);
}

members.forEach((el) => {
    let row = document.createElement("tr");
    let nameCell = document.createElement("td");
    nameCell.innerHTML = el.firstName + " " + el.lastName;
    row.appendChild(nameCell);

    renderData(el, "phone", row);
    renderData(el, "govern", row);
    renderData(el, "created_At", row);
    renderData(el, "updated_At", row);

    let buttonsCell = document.createElement("td");

    // delete
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.innerHTML = "Delete";

    // edit
    let editBtn = document.createElement("button");
    editBtn.classList.add("editBtn");
    editBtn.innerHTML = "Edit";

    // view
    let viewBtn = document.createElement("button");
    viewBtn.classList.add("viewBtn");
    viewBtn.innerHTML = "View";

    buttonsCell.appendChild(deleteBtn);
    buttonsCell.appendChild(editBtn);
    buttonsCell.appendChild(viewBtn);

    row.appendChild(buttonsCell);

    tableBody.appendChild(row);
});

const viewButton = document.querySelectorAll('.viewBtn');

viewButton.forEach(el => {
    el.addEventListener('click', () => {
        memberModal.style.display = "block";
    })
})