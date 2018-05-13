document.getElementsByClassName("reg")[0].onclick = function () {
    var login = document.getElementsByClassName("login")[0];
    console.log(login.value);
    Ajax.post("http://127.0.0.1:3333/register", {username: login.value}, function(res) {
        var response = JSON.parse(res);
        console.log(response)
        if (response.status === "ok") {
            window.localStorage.setItem("token", response.user.id)
            window.localStorage.setItem("username", response.user.username)
            document.location.href="../battles.html";
        } else {
            login.classList.toggle("wrong")
            setTimeout(() => {login.classList.toggle("wrong")}, 5000)
        }
    });
};