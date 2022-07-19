const stringifyDate = (date) =>{
    const options = {day: 'numeric', month: 'short', year: 'numeric'};
    const newDate = !date ? "undefined" :
                    new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
    return newDate;
}
const update = (node) =>{
    let employeePayroll = employeePayrollList.find(empData => empData._id == node.id);
    if(!employeePayroll) return; 
    localStorage.setItem('editEmp', JSON.stringify(employeePayroll));
    window.location.replace(Site_Properties.add_emp_payroll_page);
}
const checkName = (name) => {
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
    if (!nameRegex.test(name)) throw 'Name is Incorrect!';
}
const checkStartDate = (startDate) => {
    let now = new Date();
    if (startDate > now) throw 'Start Date is a Future Date!';
    var diff = Math.abs(now.getTime() - startDate.getTime());
    if (diff / (1000 * 60 * 60 * 24) > 30)
    throw 'Start Date is Beyond 30 Days!';
}
