// =====> Get members data from local storage or set to empty array if not found
let members = JSON.parse(localStorage.getItem("allMembers") || "[]");

// =====> DOM element references
const table = document.getElementById("membersTable");
const tableBody = document.getElementById("tableBody");
const memberModal = document.getElementById("memberModal");

// =====> Helper function to render specific table cell
function renderData(element, propertyName, row) {
    let cell = document.createElement("td");
    let value =
        element[propertyName] ||
        (propertyName === "updated_At" ? element.created_At : "");
    cell.innerHTML = value;
    row.appendChild(cell);
}

// =====> Helper function to create buttons (View, Edit, Delete)
function buttonCreate(className, id, btnText, cell) {
    let btn = document.createElement("button");
    btn.classList.add(className);
    btn.setAttribute("data-id", id);
    btn.innerHTML = btnText;
    cell.appendChild(btn);
}

// =====> Renders the table based on current filters
function renderTable(search = "", govern = "", marital = "", partTime = false) {
    tableBody.innerHTML = ""; // Clear previous table rows

    // Filter members based on the provided criteria
    let data = members.filter((item) => {
        const fullName = (item.firstName + " " + item.lastName).toLowerCase();
        const matchSearch = fullName.includes(search.toLowerCase());
        const matchGovern = !govern || item.govern === govern;
        const matchMarital = !marital || item.marital === marital;
        const matchPartTime = !partTime || item.partTime === true;

        return matchSearch && matchGovern && matchMarital && matchPartTime;
    });

    // Create table rows for filtered data
    data.forEach((item) => {
        let row = document.createElement("tr");
        row.setAttribute("data-id", item.id);

        // Name cell
        let nameCell = document.createElement("td");
        nameCell.innerHTML = item.firstName + " " + item.lastName;
        row.appendChild(nameCell);

        // Other data cells
        renderData(item, "phone", row);
        renderData(item, "govern", row);
        renderData(item, "created_At", row);
        renderData(item, "updated_At", row);

        // Buttons cell
        let buttonsCell = document.createElement("td");
        buttonCreate("viewBtn", item.id, "View", buttonsCell);
        buttonCreate("editBtn", item.id, "Edit", buttonsCell);
        buttonCreate("deleteBtn", item.id, "Delete", buttonsCell);
        row.appendChild(buttonsCell);

        tableBody.appendChild(row);
    });

    // Rebind events for the newly created buttons
    rebindEventListeners();
}

renderTable(); // Initial render

// =====> Filter elements
const searchInput = document.getElementById("searchInput");
const governFilter = document.getElementById("filterGovernment");
const maritalStatus = document.getElementById("filterMarital");
const partTimeCheck = document.getElementById("filterPartTime");

// =====> Filter update handler
function updateFilter() {
    const search = searchInput.value;
    const govern = governFilter.value;
    const marital = maritalStatus.value;
    const partTime = partTimeCheck.checked;

    renderTable(search, govern, marital, partTime);
}

// =====> Event listeners for filters
searchInput.addEventListener("input", updateFilter);
governFilter.addEventListener("change", updateFilter);
maritalStatus.addEventListener("change", updateFilter);
partTimeCheck.addEventListener("change", updateFilter);

// =====> Modal display close button
const closeModal = document.querySelector(".closeBtn");

// =====> Modal data elements
const modalName = document.getElementById("userName");
const modalPhone = document.getElementById("userPhone");
const modalMail = document.getElementById("userMail");
const modalBirth = document.getElementById("userBirth");
const modalStatus = document.getElementById("userStatus");
const modalGovern = document.getElementById("userGovern");
const modalPart = document.getElementById("userPart");
const modalCreated = document.getElementById("userCreated");
const modalUpdated = document.getElementById("userUpdated");

// =====> Function to view user data in modal
function viewMemberById(id) {
    const user = members.find((item) => item.id == id);
    if (user) {
        modalName.innerHTML = user.firstName + " " + user.lastName;
        modalPhone.innerHTML = user.phone;
        modalMail.innerHTML = user.email;
        modalBirth.innerHTML = user.birth;
        modalStatus.innerHTML = user.marital;
        modalGovern.innerHTML = user.govern;
        modalPart.innerHTML = user.partTime ? "Yes" : "No";
        modalCreated.innerHTML = user.created_At;
        modalUpdated.innerHTML = user.updated_At || user.created_At;
        memberModal.style.display = "flex";
    }
}

// =====> Close modal on close button click
closeModal.addEventListener("click", () => {
    memberModal.style.display = "none";
});

// =====> Delete user from localStorage
function deleteMemberById(id) {
    const userIndex = members.findIndex((item) => item.id == id);
    if (userIndex !== -1) {
        members.splice(userIndex, 1);
        localStorage.setItem("allMembers", JSON.stringify(members));
    }
}

// =====> Rebind all event listeners after each render
function rebindEventListeners() {
    // View button
    document.querySelectorAll(".viewBtn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const userId = btn.getAttribute("data-id");
            viewMemberById(userId);
        });
    });

    // Edit button
    document.querySelectorAll(".editBtn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const userId = btn.getAttribute("data-id");
            window.location.href = `index.html?id=${userId}`;
        });
    });

    // Delete button
    document.querySelectorAll(".deleteBtn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const userId = btn.getAttribute("data-id");
            deleteMemberById(userId);
            btn.closest("tr").remove(); // remove from table UI
        });
    });
}

// =====> Delete all members
const deleteAll = document.getElementById("removeAllBtn");

deleteAll.addEventListener("click", () => {
    members = [];
    localStorage.setItem("allMembers", JSON.stringify(members));
    location.reload(); // reload to re-render empty table
});
