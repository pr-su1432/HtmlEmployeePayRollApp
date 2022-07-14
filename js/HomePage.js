window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const innerHtml = `
    <tr>
        <th></th>
        <th>Name</th>
        <th>Gender</th>
        <th>Department</th>
        <th>Salary</th>
        <th>Start Date</th>
        <th>Actions</th>
    </tr>
    <tr>
        <td><img class="profile" alt=""
            src="../assets/profile1.jpg">
        </td>
        <td>Prasanna</td>
        <td>Female</td>
        <td><div class="dept-label">Sales</div></td>
        <td>450000</td>
        <td>12 May 2022</td>
        <td>
            <img id="1" onclick="remove(this)" alt="delete" src="../assets/delete-black-18dp.svg">
            <img id="1" onclick="update(this)" alt="edit" src="../assets/update-black-18dp.svg">
        </td>
    </tr>
    `;
    document.querySelector('#table-display').innerHTML = innerHtml;
}