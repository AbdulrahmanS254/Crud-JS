const form = document.getElementById("memberForm");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const birthday = document.getElementById("birthday");
const single = document.getElementById("single");
const married = document.getElementById("married");
const govern = document.getElementById("government");
const partTimeCheck = document.getElementById("partTime");

// user data object
let allMembers = JSON.parse(localStorage.getItem("allMembers") || "[]");

// Regular expressions for validation
const checkName = /^[A-Za-z]{2,}$/;
const checkMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const checkPhone = /^(010|011|012|015)[0-9]{8}$/;

function getErrorElement(id, text) {
    document.getElementById(id).innerHTML = text;
}

function addKeyToObject(obj, key, testedElement) {
    obj[key] = testedElement.value;
}

let hasError = false;

function showErrorReg(reg, testedElement, elementId, text, obj, key) {
    if (!reg.test(testedElement.value)) {
        getErrorElement(elementId, text);
        hasError = true;
    } else {
        getErrorElement(elementId, "");
        addKeyToObject(obj, key, testedElement);
    }
}

let errorText = {
    name: "Name should be at least 2 characters or longer",
    phone: "Number should be a valid egyptian number",
    email: "Please enter a valid email address",
    birth: "Please select your birthday.",
    marital: "Please choose your marital status",
    govern: "Please select your government",
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let member = {};
    hasError = false;

    // Validating the inputs
    showErrorReg(
        checkName,
        firstName,
        "firstNameError",
        errorText.name,
        member,
        "firstName"
    );
    showErrorReg(
        checkName,
        lastName,
        "lastNameError",
        errorText.name,
        member,
        "lastName"
    );
    showErrorReg(
        checkPhone,
        phone,
        "phoneError",
        errorText.phone,
        member,
        "phone"
    );
    showErrorReg(
        checkMail,
        email,
        "emailError",
        errorText.email,
        member,
        "email"
    );

    if (!birthday.value) {
        getErrorElement("birthdayError", errorText.birth);
        hasError = true;
    } else {
        getErrorElement("birthdayError", "");
        addKeyToObject(member, "birth", birthday);
    }

    if (!single.checked && !married.checked) {
        getErrorElement("maritalStatusError", errorText.marital);
        hasError = true;
    } else {
        getErrorElement("maritalStatusError", "");
        single.checked
            ? addKeyToObject(member, "marital", single)
            : addKeyToObject(member, "marital", married);
    }

    if (!govern.value) {
        getErrorElement("governmentError", errorText.govern);
        hasError = true;
    } else {
        getErrorElement("governmentError", "");
        addKeyToObject(member, "govern", govern);
    }

    member["partTime"] = partTimeCheck.checked;

    if (hasError) return;

    // Checking if user signed before

    /* Wrong check
    for (let i = 0; i < allMembers.length; i++) {
        if (allMembers[i]["phone"] === member["phone"]) {
            window.alert("phone number used before");
            used = true;
        } else {
            used = false;
        }
    }
    */

    // array.some returns true or false
    let used = allMembers.some((item) => {
        return item["phone"] === member["phone"];
    });

    if (used) {
        window.alert("phone number used before");
        return;
    }

    let time = new Date();
    member["created_At"] = time;
    member["updated_At"] = "";
    let randomNo = Math.floor(Math.random() * 1000);
    member["id"] = Date.now() + randomNo;

    allMembers.push(member);
    localStorage.setItem("allMembers", JSON.stringify(allMembers));

    form.reset();
    window.alert("Member Added");
});
