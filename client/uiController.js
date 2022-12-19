
    window.addEventListener("load", initialize);

    //var ajax;
    var genders;
    var patients;
    var Valid = "lightgreen";
    var Invalid = "pink";
    var Initial = "white"
    var Update = "khaki";
    var Select = "skyblue";

    let nameValidation = false;
    let emailValidation = false;
    let mobileValidation = false;
    let nicValidation = false;
    let genderValidation = false;

    let oldPatient = null;
    // let patients = null;
    var baseurl = "http://" + location.hostname + "/Patient-Details-Managment-System/server/";
    var mod = function (data) {

    var confirm = window.confirm("Are you sure to modify this patient " + data.name + "  ?");
    if (confirm) {
    fillForm(data);
    btnAdd.setAttribute("disabled", "disabled");
    btnUpdate.removeAttribute("disabled", "disabled");
    btnDelete.removeAttribute("disabled", "disabled");
}
}

    function clearTableSelection() {
    let trList = tblMain.patient[1].patient;
    for (let i = 0; i < trList.length; i++) {
    trList[i].style.backgroundColor = Initial;
}
}

    function Patient(name, nic, email, mobile, gender) {
    this.name = name;
    this.nic = nic;
    this.email = email;
    this.mobile = mobile;
    this.gender = gender;
}

    function initialize() {

    patients = get("patients");
    genders = get("genders");

    loadView();
    loadForm();
    btnClear.addEventListener("click", clearForm);
    btnSearch.addEventListener("click", search);
    btnSearchClear.addEventListener("click", searchClear);
    btnAdd.addEventListener("click", Add);
    btnUpdate.addEventListener("click", btnUpdateMC);
    btnAdd.removeAttribute("disabled", "disabled");
    btnDelete.addEventListener("click", bDelete);
    btnUpdate.setAttribute("disabled", "disabled");
    btnDelete.setAttribute("disabled","disabled" );
    txtName.addEventListener("input", txtNameKU);
    txtEmail.addEventListener("input", txtEmailKU);
    txtMobile.addEventListener("input", txtMobileKU);
    txtNic.addEventListener("input", txtNicKU);
    cmbGender.addEventListener("change", cmbGenderCH);
}

    function loadView() {
    FillCombo(genders, cmbSearchGender);
    fillTable(patients, ["id", "name", "nic", "email", "mobile", function (e) {
    return e.gender.name
}], display, [{"btnText": "MODIFY", "btnFun": mod}]);
}

    function loadForm() {
    genders = get("genders");
    //fillForm(data);
    FillCombo(genders, cmbGender);
}

    function clearForm() {
    txtEmail.value = "";
    txtMobile.value = "";
    txtName.value = "";
    txtNic.value = "";
    cmbGender.value = null;

    btnAdd.removeAttribute("disabled");
    btnUpdate.setAttribute("disabled", "disabled");
    btnDelete.setAttribute("disabled", "disabled");
    txtEmail.style.backgroundColor = Initial;
    txtName.style.backgroundColor = Initial;
    txtMobile.style.backgroundColor = Initial;
    txtNic.style.backgroundColor = Initial;
    cmbGender.style.backgroundColor = Initial;

}

    function txtNameKU() {
    let name = txtName.value;
    let namePattern = new RegExp("^[A-Z][a-z]{2,}$");
    if (!namePattern.test(name)) {
    txtName.style.backgroundColor = Invalid;
    nameValidation = false;
} else {
    if (oldPatient && oldPatient.name != name) {
    txtName.style.backgroundColor = Update;
    nameValidation = true;
} else {
    txtName.style.backgroundColor = Valid;
    nameValidation = true;
}

}
}

    function txtNicKU() {
    let nic = txtNic.value;
    let nicPattern = new RegExp("^([0-9]{9}[x|X|vV]|[0-9]{12})$");

    if (!nicPattern.test(nic)) {
    txtNic.style.backgroundColor = Invalid;
    nicValidation = false;
} else {
    if (oldPatient && oldPatient.nic != nic) {
    txtNic.style.backgroundColor = Update;
    nicValidation = true;
} else {
    txtNic.style.backgroundColor = Valid;
    nicValidation = true;
}
}
}


    function txtEmailKU() {
    let email = txtEmail.value;
    let emailPattern = new RegExp("^[a-z0-9]+[@][a-z]+.[a-z]+$");

    if (!emailPattern.test(email)) {
    txtEmail.style.backgroundColor = Invalid;
    emailValidation = false;
} else {
    if (oldPatient && oldPatient.email != email) {
    txtEmail.style.backgroundColor = Update;
    emailValidation = true;
} else {
    txtEmail.style.backgroundColor = Valid;
    emailValidation = true;
}
}
}


    function txtMobileKU() {
    let mobile = txtMobile.value;
    let mobilePattern = new RegExp("^([0-9]{10})$");

    if (!mobilePattern.test(mobile)) {
    txtMobile.style.backgroundColor = Invalid;
    mobileValidation = false;
} else {
    if (oldPatient && oldPatient.email != email) {
    txtMobile.style.backgroundColor = Update;
    mobileValidation = true;
} else {
    txtMobile.style.backgroundColor = Valid;
    mobileValidation = true;
}
}
}


    function cmbGenderCH() {
    let gender = JSON.parse(cmbGender.value);

    if (gender == null) {
    cmbGender.style.backgroundColor = Invalid;
    genderValidation = false;
} else {
    if (oldPatient && oldPatient.gender.id != gender.id) {
    cmbGender.style.backgroundColor = Update;
    genderValidation = true;
} else {
    cmbGender.style.backgroundColor = Valid;
    genderValidation = true;
}

}

}

    function getErrors() {
    let errors = "";
    if (!nameValidation) errors += "\nInvalid Name";
    if (!nicValidation) errors += "\nInvalid NIC";
    if (!emailValidation) errors += "\nInvalid Email";
    if (!mobileValidation) errors += "\nInvalid Mobile";
    if (!genderValidation) errors += "\nInvalid Gender";

    return errors;
}

    function Add(){
    let errors = getErrors();

    if (errors !== "") {
    window.alert("You have following errors\n" + errors);
} else {

    let patient = new Patient();
    patient.name = txtName.value;
    patient.nic = txtNic.value;
    patient.email = txtEmail.value;
    patient.mobile = txtMobile.value;
    patient.gender = JSON.parse(cmbGender.value);

    let userConfirm = window.confirm("Are you sure you want to add this record? \n" + "Name : " + patient.name + "\nNic : " + patient.nic + "\nEmail : " + patient.email + "\nMobile : " + patient.mobile + "\nGender : " + patient.gender.name);
    if (userConfirm) {

    let result = post("patients", JSON.stringify(patient));
    console.log(result)
    if (result !== "") {
    window.alert(result);
} else {
    window.alert("Success ..!");
    clearForm();
    patients = get("patients");
    fillTable(patients, ["id", "name", "nic", "email", "mobile", function (e) {
    return e.gender.name
}], display, [{"btnText": "MODIFY", "btnFun": mod}]);
}
    // post("patients", "patient=" + JSON.stringify(patient))
    // patients = get("patients");
    // fillTable(patients, ["id", "name", "email", "nic", function (e) {
    //     return e.gender.name
    // }], display, [{"btnText": "MODIFY", "btnFun": mod}])s
    // clearForm();

}
}
}

    function getUpdates() {
    let updates = "";
    if (oldPatient != null) {
    if (oldPatient.name != patient.name) updates += "Name Updated \n";
    if (oldPatient.nic != patient.nic) updates += "NIC Updated \n";
    if (oldPatient.email != patient.email) updates += "Email Updated \n";
    if (oldPatient.mobile != patient.mobile) updates += "Mobile Updated \n";
    if (oldPatient.gender.id != patient.gender.id) updates += "Gender Updated \n";
}
    return updates;
}

    function btnUpdateMC() {
    patient = new Patient();
    patient.id = oldPatient.id;
    patient.name = txtName.value;
    patient.nic = txtNic.value;
    patient.email = txtEmail.value;
    patient.mobile = txtMobile.value;

    patient.gender = JSON.parse(cmbGender.value);


    let updates = getUpdates();

    if (updates == "") {
    window.alert("Nothing to Update");
} else {
    let userConfirm = window.confirm("Are you sure to Update this patient ? \n\n" + updates);
    if (userConfirm) {

    let result = put("patients/" + oldPatient.id, JSON.stringify(patient));
    if (result !== "") {
    window.alert(result);
} else {
    window.alert("Success ..!");
    clearForm();
    patient = get("patients");
    fillTable(patient, ["id", "name", "nic", "email", "mobile", function (e) {
    return e.gender.name
}], display, [{"btnText": "MODIFY", "btnFun": mod}]);
}
}
}


}


    function bDelete() {

    let userConfirm = window.confirm("Are you sure you want to delete this record? \n" + "Name : " + oldPatient.name);
    if (userConfirm) {

    let result = del("patients/"+oldPatient.id);
    console.log(result)
    if (result !== "") {
    window.alert(result);
} else {
    window.alert("Success ..!");
    clearForm();
    patients = get("patients");
    fillTable(patients, ["id", "name", "nic", "email", "mobile", function (e) {
    return e.gender.name
}], display, [{"btnText": "MODIFY", "btnFun": mod}]);
}


}

}




    function search() {
    var name = txtSearchName.value;
    var txtGender = cmbSearchGender.value;
    var querry = "";
    var gender = null;

    if (txtGender != "null") {
    gender = JSON.parse(txtGender);
}
    if (name != "") {
    querry += "name=" + name;
}
    if (gender != null) {
    if (name != "") {
    querry += "&gender=" + gender.id;
} else {
    querry += "gender=" + gender.id;
}
}
    patients = get("patients?" + querry);
    console.log(patients);

    fillTable(patients, ["id", "name", "nic", "email", "mobile", function (e) {
    return e.gender.name
}], display, [{"btnText": "MODIFY", "btnFun": mod}]);
}

    function searchClear() {
    txtSearchName.value = "";
    cmbSearchGender.value = "null";
    genders = get("genders");
    //fillForm(data);
    FillCombo(genders, cmbGender);

    patients = get("patients");

    fillTable(patients, ["id", "name", "nic", "email", "mobile", function (e) {
    return e.gender.name
}], display, [{"btnText": "MODIFY", "btnFun": mod}]);
}

    function fillTable(data, props, show, btns) {
    show.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
    // const datum = data[i];      //singular form of data
    var tr = document.createElement("tr");
    for (let j = 0; j < props.length; j++) {
    var text = document.createTextNode(typeof props[j] == "function" ? props[j](data[i]) : data[i][props[j]]);
    var td = document.createElement("td");
    td.appendChild(text);
    tr.appendChild(td);
}

    if (btns) {
    for (let k = 0; k < btns.length; k++) {
    const btn = btns[k];
    var button = document.createElement("input");
    button.setAttribute("type", "button");
    button.setAttribute("value", btn["btnText"]);
    button.addEventListener("click", function () {
    btn["btnFun"](data[i]);
    txtName.value = data[i].name;
    txtNic.value = data[i].nic;
    txtEmail.value = data[i].email;
    txtMobile.value = data[i].mobile;
    cmbGender.value = JSON.stringify(data[i].gender);

    txtName.style.backgroundColor = Valid;
    txtNic.style.backgroundColor = Valid;
    txtEmail.style.backgroundColor = Valid;
    txtMobile.style.backgroundColor = Valid;
    cmbGender.style.backgroundColor = Valid;
    oldPatient = data[i];
});
    var td = document.createElement("td");
    td.appendChild(button);
    tr.appendChild(td);
}
}
    show.appendChild(tr);

}
}

    function fillForm(data) {

    txtName.value = data.name;
    txtEmail.value = data.email;
    txtMobile.value = data.mobile;
    cmbGender.value = JSON.stringify(data.gender);

}

    function FillCombo(data, show) {
    var optionHint = document.createElement("option");
    optionHint.innerHTML = "select a gender";
    optionHint.value = null;
    optionHint.setAttribute("disabled", "disabled");
    optionHint.setAttribute("selected", "selected");
    show.appendChild(optionHint);

    for (let i = 0; i < data.length; i++) {
    const datum = data[i];
    var option = document.createElement("option");
    option.innerHTML = datum.name;
    option.value = JSON.stringify(datum);
    show.appendChild(option);

}
}

    function put(url, querry) {
    var url = baseurl + url;
    var http = new XMLHttpRequest();
    http.open("PUT", url, false);
    http.setRequestHeader("Content-type", "application/json");
    http.send(querry);
    if (http.status == 200) {
    return http.responseText;
}
    return null;

}

    function post(url, querry1) {
    var url = baseurl + url;
    var http = new XMLHttpRequest();
    http.open("POST", url, false);
    http.setRequestHeader("Content-type", "application/json");
    http.send(querry1);
    if (http.status == 200) {
    return http.responseText;
}
    return null;

}

    function get(url) {
    var url = baseurl + url;
    var http = new XMLHttpRequest();
    http.open("GET", url, false);
    http.send();
    var data = JSON.parse(http.responseText);
    // console.log(data)
    return data;
}

    function del(url) {
    var url = baseurl + url;
    var http = new XMLHttpRequest();
    http.open("DELETE", url, false);
    http.send();

    if (http.status === 200) {
    return http.responseText;
}
    return null;

}

