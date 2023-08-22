async function fetchAndPopulateLeaderboard() {
    try {
      const response = await axios.get("http://localhost:3000/login/alluser"); 
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
  document.addEventListener('DOMContentLoaded',fetchAndPopulateLeaderboard);
  