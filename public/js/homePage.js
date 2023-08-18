document.addEventListener('DOMContentLoaded',function(){
const expenseForm = document.getElementById("expense-form");
const expenseTableBody = document.getElementById("expense-table-body");
    axios.get("http://localhost:3000/expense/getExpense")
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
    axios.delete(`http://localhost:3000/expense/deleteExpense/${id}`)
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
  }
  


    