async function fetchAndPopulateLeaderboard() {
    try {
      const response = await axios.get("http://localhost:3000/users"); 
      const leaderboardData = response.data; 
      const leaderboardBody = document.getElementById('leaderboard-body');
      leaderboardBody.innerHTML = '';
      leaderboardData.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <th scope="row">${index + 1}</th>
          <td>${entry.name}</td>
          <td>${entry.totalExpenses}</td>
        `;
        leaderboardBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  async function isPremium(){
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:3000/users/isPremium", {
      headers: { Authorization: token },
    });
    if (res.data.ispremiumuser) {
      LeaderboardBtn.removeAttribute("onclick");
      LeaderboardBtn.setAttribute("href","/leaderboard");
      reportBtn.setAttribute("href","/reports");
    }else{
  
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
  document.addEventListener("DOMContentLoaded", isPremium);
  document.addEventListener('DOMContentLoaded',fetchAndPopulateLeaderboard);
  