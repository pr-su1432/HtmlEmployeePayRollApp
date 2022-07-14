window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                        "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    let empPayrollList = createEmployeePayrollJSON();
    for (const empPayrollData of empPayrollList) {
        innerHtml = `${innerHtml}  
        <tr>
            <td><img class="profile" alt=""
                src="${empPayrollData._profilePic  }">
            </td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>${getDeptHtml(empPayrollData._department)}</td>
            <td>${empPayrollData._salary}</td>
            <td>${empPayrollData._startDate}</td>
            <td>
                <img id="1" onclick="remove(this)" alt="delete" 
                    src="../assets/delete-black-18dp.svg">
                <img id="1" onclick="update(this)" alt="edit"
                    src="../assets/update-black-18dp.svg">
            </td>
        </tr>
        `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}
const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
        {
            _name: 'Prasanna',
            _gender: 'Female',
            _department: [
                'Analyst',
                'Engineer'
            ],
            _salary: '650000',
            _startDate: '8 Nov 2019',
            _note: '',
            _id: new Date().getTime(),
            _profilePic: '../assets/Profile1.jpg'
        },
        {
            _name: 'Arjun',
            _gender: 'Male',
            _department: [
                'Army'
            ],
            _salary: '800000',
            _startDate: '15 Jan 2015',
            _note: '',
            _id: new Date().getTime() + 1,
            _profilePic: '../assets/Profile2.jpg'
        },
        {
            _name: 'Dimple',
            _gender: 'Female',
            _department: [
                'Teacher',
                'Engineer'
            ],
            _salary: '900000',
            _startDate: '25 Nov 2021',
            _note: '',
            _id: new Date().getTime() + 1,
            _profilePic: '../assets/Profile3.jpg'
        },
        {
            _name: 'Mallikharjun',
            _gender: 'Male',
            _department: [
                'Sales',
                'Engineer'
            ],
            _salary: '700000',
            _startDate: '5 Feb 2017',
            _note: '',
            _id: new Date().getTime() + 1,
            _profilePic: '../assets/Profile4.jpg'
        }
    ];
    return empPayrollListLocal;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}