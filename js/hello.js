document.getElementsByClassName("name")[0].textContent = window.localStorage.getItem("username");

document.getElementsByClassName("in")[0].onclick = function () {
    document.location.href="./battles.html";
};

document.getElementsByClassName("not-me")[0].onclick = function () {
    window.localStorage.clear();
    document.location.href="./register.html";
};