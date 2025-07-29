// i will get the users from local storage first

let members = JSON.parse(localStorage.getItem("allMembers") || "[]");

// now i got the members data from local storage

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

// button creation for every row
function buttonCreate(className, id, btnText, cell) {
    let btn = document.createElement("button");
    btn.classList.add(className);
    btn.setAttribute("data-id", id);
    btn.innerHTML = btnText;
    cell.appendChild(btn);
}

members.forEach((el) => {
    let row = document.createElement("tr");
    row.setAttribute("data-id", el.id);
    let nameCell = document.createElement("td");
    nameCell.innerHTML = el.firstName + " " + el.lastName;
    row.appendChild(nameCell);

    renderData(el, "phone", row);
    renderData(el, "govern", row);
    renderData(el, "created_At", row);
    renderData(el, "updated_At", row);

    let buttonsCell = document.createElement("td");

    // view
    buttonCreate("viewBtn", el.id, "View", buttonsCell);
    // edit
    buttonCreate("editBtn", el.id, "Edit", buttonsCell);
    // delete
    buttonCreate("deleteBtn", el.id, "Delete", buttonsCell);

    row.appendChild(buttonsCell);

    tableBody.appendChild(row);
});

// =====> Modal viewing
const viewButton = document.querySelectorAll(".viewBtn");
const closeModal = document.querySelector(".closeBtn");
const modalDetails = document.getElementById("modalDetails");

// calling the details elements
const modalName = document.getElementById("userName");
const modalPhone = document.getElementById("userPhone");
const modalMail = document.getElementById("userMail");
const modalBirth = document.getElementById("userBirth");
const modalStatus = document.getElementById("userStatus");
const modalGovern = document.getElementById("userGovern");
const modalPart = document.getElementById("userPart");
const modalCreated = document.getElementById("userCreated");
const modalUpdated = document.getElementById("userUpdated");

viewButton.forEach((el) => {
    el.addEventListener("click", () => {
        memberModal.style.display = "flex";
    });
});

closeModal.addEventListener("click", () => {
    memberModal.style.display = "none";
});

function viewMemberById(id) {
    const user = members.findIndex((item) => item.id == id);
    if (user !== -1) {
        let userObject = members[user];
        modalName.innerHTML =
            userObject["firstName"] + " " + userObject["lastName"];
        modalPhone.innerHTML = userObject["phone"];
        modalMail.innerHTML = userObject["email"];
        modalBirth.innerHTML = userObject["birth"];
        modalStatus.innerHTML = userObject["marital"];
        modalGovern.innerHTML = userObject["govern"];
        modalPart.innerHTML = userObject["partTime"] ? "Yes" : "No";
        modalCreated.innerHTML = userObject["created_At"];
        modalUpdated.innerHTML = userObject["updated_At"]
            ? userObject["updated_At"]
            : userObject["created_At"];
    }
}

viewButton.forEach((item) => {
    item.addEventListener("click", (ev) => {
        let userId = item.getAttribute("data-id");
        viewMemberById(userId);
    });
});

// =====> Deleting member
const deleteBtn = document.querySelectorAll(".deleteBtn");

function deleteMemberById(id) {
    const userIndex = members.findIndex((item) => item.id == id);
    if (userIndex !== -1) {
        members.splice(userIndex, 1);
        localStorage.setItem("allMembers", JSON.stringify(members));
    }
}

deleteBtn.forEach((element) => {
    element.addEventListener("click", (ev) => {
        let userId = element.getAttribute("data-id");
        deleteMemberById(userId);
        element.closest("tr").remove();
    });
});

// =====> Deleting all members
const deleteAll = document.getElementById("removeAllBtn");

deleteAll.addEventListener("click", (ev) => {
    members = [];
    localStorage.setItem("allMembers", JSON.stringify(members));
    location.reload();
});

// =====> Editing a member

const editBtn = document.querySelectorAll(".editBtn");

editBtn.forEach((item) => {
    item.addEventListener("click", (ev) => {
        userId = item.getAttribute("data-id");
        window.location.href = `index.html?id=${userId}`;
    });
});
