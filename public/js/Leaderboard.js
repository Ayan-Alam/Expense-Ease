async function fetchAndPopulateLeaderboard() {
    try {
      const response = await axios.get({N}); 
      const leaderboardData = response.data; 
  
      const leaderboardBody = document.getElementById('leaderboard-body');
  
      
      leaderboardBody.innerHTML = '';
  
      
      leaderboardData.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <th scope="row">${index + 1}</th>
          <td>${entry.Name}</td>
          <td>${entry.Expenses}</td>
        `;
        leaderboardBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  document.addEventListener('DOMContentLoaded',fetchAndPopulateLeaderboard);
  