const dateInput = document.getElementById('dateValue');
const monthInput = document.getElementById('monthValue');
const tbodyDaily = document.getElementById('dailyExpensesTable');
const tfootDaily = document.getElementById('tfootDailyId');
const tbodyMonthly = document.getElementById('monthlyExpensesTable');
const tfootMonthly = document.getElementById('tfootMonthly');
async function isPremium() {
    const token = localStorage.getItem("token");
    const res = await axios.get("users/isPremium", {
      headers: { Authorization: token },
    });
    if (res.data.ispremiumuser) {
      LeaderboardBtn.removeAttribute("onclick");
      LeaderboardBtn.setAttribute("href","/leaderboard");
      reportBtn.setAttribute("href","/reports");
    }else{
  
    }
  }

async function getDailyReport(e) {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const date = new Date(dateInput.value);
      const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${date.getFullYear()}`;
  
      let totalAmount = 0;
      const res = await axios.post(
        "reports/daily",
        {
          date: formattedDate,
        },
        { headers: { Authorization: token } }
      );
      tbodyDaily.innerHTML = "";
      tfootDaily.innerHTML = "";

      res.data.forEach((expense) => {
      totalAmount += expense.amount;

      const tr = document.createElement("tr");
      tr.setAttribute("class", "trStyle");
      tbodyDaily.appendChild(tr);

      const th = document.createElement("th");
      th.setAttribute("scope", "row");
      th.appendChild(document.createTextNode(expense.date));

      const td1 = document.createElement("td");
      td1.appendChild(document.createTextNode(expense.category));

      const td2 = document.createElement("td");
      td2.appendChild(document.createTextNode(expense.description));

      const td3 = document.createElement("td");
      td3.appendChild(document.createTextNode(expense.amount));

      tr.appendChild(th);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
    });

    const tr = document.createElement("tr");
    tr.setAttribute("class", "trStyle");
    tfootDaily.appendChild(tr);

    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");

    td3.setAttribute("id", "dailyTotal");
    td4.setAttribute("id", "dailyTotalAmount");
    td3.appendChild(document.createTextNode("Total"));
    td4.appendChild(document.createTextNode(totalAmount));

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
  }catch (err){
    console.log(err);
  }
}
async function getMonthlyReport(e) {
  try {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const month = new Date(monthInput.value);
    const formattedMonth = `${(month.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;

    let totalAmount = 0;
    const res = await axios.post(
      "reports/monthly",
      {
        month: formattedMonth,
      },
      { headers: { Authorization: token } }
    );

    tbodyMonthly.innerHTML = "";
    tfootMonthly.innerHTML = "";

    res.data.forEach((expense) => {
      totalAmount += expense.amount;

      const tr = document.createElement("tr");
      tr.setAttribute("class", "trStyle");
      tbodyMonthly.appendChild(tr);

      const th = document.createElement("th");
      th.setAttribute("scope", "row");
      th.appendChild(document.createTextNode(expense.date));

      const td1 = document.createElement("td");
      td1.appendChild(document.createTextNode(expense.category));

      const td2 = document.createElement("td");
      td2.appendChild(document.createTextNode(expense.description));

      const td3 = document.createElement("td");
      td3.appendChild(document.createTextNode(expense.amount));

      tr.appendChild(th);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
    });

    const tr = document.createElement("tr");
    tr.setAttribute("class", "trStyle");
    tfootMonthly.appendChild(tr);

    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");

    td3.setAttribute("id", "monthlyTotal");
    td4.setAttribute("id", "monthlyTotalAmount");
    td3.appendChild(document.createTextNode("Total"));
    td4.appendChild(document.createTextNode(totalAmount));

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
  } catch (error) {
    console.log(error);
  }
}
document.getElementById("logout").addEventListener('click', async function(){
  try {
    localStorage.clear();
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
})
document.getElementById('dailyDownload').addEventListener('click',async function(){
  try{
  const token = localStorage.getItem("token");
  const res = await axios.get("download-report", { headers: { "authorization": token } })
            if (res.status == 200) {
                var a = document.createElement("a");
                a.href = res.data.fileURL;
                a.download = 'myexpenses.csv';
                a.click();
            }else{
              throw new Error(res.data.message)
            }
            
  }catch (err){
    console.log(err);
  }
});
document.addEventListener("DOMContentLoaded", isPremium);
document.getElementById("monthbtn").addEventListener('click',getMonthlyReport);
document.getElementById("dailybtn").addEventListener('click',getDailyReport);