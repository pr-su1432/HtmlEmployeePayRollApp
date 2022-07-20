let isUpdate = false;
let employeePayrollObj = {};
window.addEventListener('DOMContentLoaded', (event) => {

    const name = document.querySelector('#name');
    name.addEventListener('input', function () {
        if(name.value.length == 0) {
            setTextValue('.text-error', "");
            return;
        }
        try {
            (new Payroll()).name = name.value;          
            setTextValue('.text-error', "");
        } catch (e) {
            setTextValue('.text-error', e);
        }
    });
     
     const date = document.querySelector('#date');
     date.addEventListener('input', function() {
        try {
            let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
            (new Payroll()).startDate = new Date(Date.parse(date));
            setTextValue('.date-error', "");
        } catch (e) {
            setTextValue('.date-error', e);
        }
     });
     
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
    checkForUpdate();
});

// save function
const save = (event) => {
    event.preventDefault();//prevent resetting the form (UC-19) 
    event.stopPropagation();   
    try{
        setEmployeePayrollObject();
        if(Site_Properties.use_local_storage.match("true")){
            createAndUpdateStorage();
            resetForm();
            window.location.replace(Site_Properties.home_page);
        }else {
            createOrUpdateEmployeePayroll();
        }
        
    }catch (e) {
        return;
    }    
}
const createOrUpdateEmployeePayroll = ()=> {
    let postURL = Site_Properties.server_url;
    let methodCall = "POST";
    if(isUpdate){
        methodCall = "PUT";
        postURL = postURL + employeePayrollObj.id.toString();
    }
    makeServiceCall(methodCall,postURL,true,employeePayrollObj)
        .then(responseText => {
            resetForm();
            window.location.replace(Site_Properties.home_page);
        })
        .catch(error => {
            throw error;
        });
}

const setEmployeePayrollObject= () => {
    if(!isUpdate && Site_Properties.use_local_storage.match("true")){
        employeePayrollObj.id= createNewEmployeeId();
    } 
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profilePic = getSelectedValue('[name=profile]').pop();
    employeePayrollObj._gender = getSelectedValue('[name=gender]').pop();
    employeePayrollObj._department = getSelectedValue('[name=department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._notes = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayrollObj._startDate = date;
}
//local storage
function createAndUpdateStorage(employeePayroll) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList){
        let empPayroll = employeePayrollList.
                            find(empData => empData.id == employeePayrollObj.id);
        if (!empPayroll) {
            employeePayrollList.push(employeePayrollObj());
        } else {
            const index = employeePayrollList
                          .map(empData => empData.id)
                          .indexOf(empPayroll.id);
            employeePayrollList.splice(index, 1,employeePayrollObj());
        }
    } else {
        employeePayrollList = [employeePayroll]
    }    
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));    
}
const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID)+1).toString();
    localStorage.setItem("EmployeeID", empID);
    return empID;
}
const createEmployeePayroll = () => { //Reading data from UI
    let employeePayroll = new Payroll();
    try {
        employeePayroll.name = getInputValueById('#name');
        setTextValue('.text-error', "");
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayroll.profilePic = getSelectedValue('[name=profile]').pop();
    employeePayroll.gender = getSelectedValue('[name=gender]').pop();
    employeePayroll.department = getSelectedValue('[name=department]');
    employeePayroll.salary = getInputValueById('#salary');    
    employeePayroll.notes = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayroll.startDate = new Date(Date.parse(date)); 
    alert(employeePayroll.toString());
    return employeePayroll;
}
const getInputValueById = (_id) => {
    return document.querySelector(_id).value;
}

const setTextValue = (_id, message) => {
    const textError = document.querySelector(_id);
    textError.textContent = message;
}

const getSelectedValue = (propertyValue)=> {
    let allItem = document.querySelectorAll(propertyValue);
    let setItem = [];
    allItem.forEach(item=>{
        if(item.checked == true){
            setItem.push(item.value);
        }
    })
    return setItem;
}
//create reset form
const resetForm = () => {
    setValue('#name','');
    unsetSelectedValues('[name=Profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day', 0);
    setValue('#month', 0);
    setValue('#year', 0);
}
const unsetSelectedValues = (propertyValue) =>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item =>{
        item.checked = false;
    });
}
const setValue = (_id, value) =>{
    const element = document.querySelector(_id);
    element.value = value;
}
const setSelectedIndex = (_id, index) => {
    const element = document.querySelector(_id);
    element.selectedIndex = index;
}
const checkForUpdate = (node) => {
    let employeePayroll = employeePayrollList.find(empData._id == node._id)
    if(employeePayroll) return;
    localStorage.setItem('editEmp', JSON.stringify(employeePayroll))
    window.location.replace(Site_Properties.add_emp_payroll_page);
    
}

//set form
const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=Profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]',employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setTextValue('.salary-output', employeePayrollObj._salary);
    setValue('#salary', employeePayrollObj._salary);
    setValue('#notes',employeePayrollObj._notes);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month',date[1]);
    setValue('#year',date[2]);
}
const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if(Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value === value)
            item.checked = true;
    });
}