const stringifyDate = (date) =>{
    const options = {day: 'numeric', month: 'short', year: 'numeric'};
    const newDate = !date ? "undefined" :
                    new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
    return newDate;
}
const update = (node) =>{
    let employeePayroll = employeePayrollList.find(empData => empData._id == node.id);
    if(!employeePayroll){return;} 
    localStorage.setItem('editEmp', JSON.stringify(employeePayroll));
    window.location.replace(Site_Properties.add_emp_payroll_page);
}
