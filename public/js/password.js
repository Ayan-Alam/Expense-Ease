document.getElementById("forgotPassword").addEventListener('click',async function(){
    try {
        const email = document.getElementById("email").value;
        const res = await axios.post("http://localhost:3000/password/email", {
          email: email,
        });
        alert(res.data.message);
        window.location.href = "/";
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
        window.location.reload();
      }
})

