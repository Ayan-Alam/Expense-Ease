document.addEventListener('DOMContentLoaded',function(){
const expenseForm = document.getElementById("expense-form");
const token = localStorage.getItem("token");
const expenseTableBody = document.getElementById("expense-table-body");
    axios.get("http://localhost:3000/expense/getExpense",{ headers: { Authorization: token } })
    .then((res)=>{console.log(res.data)
        res.data.forEach((e)=>{
            const amount = e.amount;
            const description = e.description;
            const category = e.category;
            const date = e.createdAt.slice(0,10);
            const newRow = `
            <tr>
              <td>${date}</td>
              <td>${amount}</td>
              <td>${description}</td>
              <td>${category}</td>
              <td><button class="btn btn-danger btn-sm" onclick="deleteRow(this,'${e.id}')">Delete</button></td>
            </tr>
          `;
         expenseTableBody.insertAdjacentHTML("beforeend", newRow);
         expenseForm.reset();
        })
    }).catch((err)=>{console.log(err)});
  })
  function deleteRow(button,id) {
    const token = localStorage.getItem("token");
    axios.delete(`http://localhost:3000/expense/deleteExpense/${id}`, { headers: { Authorization: token } })
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
  }

document.getElementById('addlogin').addEventListener('click', function(){
  const amount = document.getElementById("amount");
  const description = document.getElementById("description");
  const category = document.getElementById("category");
  const categoryValue = category.value;
  const descriptionValue = description.value.trim();
  const amountValue = amount.value.trim();
  if (categoryValue == "Select Category") {
    alert("Select the Category!");
    window.location.href ='/expense/userDashboard';
  }
  if (!descriptionValue) {
    alert("Add the Description!");
    window.location.href ='/expense/userDashboard';
  }
  if (!parseInt(amountValue)) {
    alert("Please enter the valid amount!");
    window.location.href ='/expense/userDashboard';
  }
  const token = localStorage.getItem("token");
  const res = axios
      .post(
        "http://localhost:3000/expense/addExpense",
        {
          category: categoryValue,
          description: descriptionValue,
          amount: parseInt(amountValue),
        },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        if (res.status == 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  })

  


    