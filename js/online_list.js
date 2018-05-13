var onlineListDiv = document.getElementsByClassName("online_tape")[0]

setInterval(Ajax.get("http://127.0.0.1:3333/online", function(res) {
    if (document.getElementsByClassName("online-list")[0]) document.getElementsByClassName("online-list")[0].remove();
    var onlineList = document.createElement("ul");
    onlineList.classList.add("online-list");
    var response = JSON.parse(res);
    console.log(response);
    if (response.status === "ok") {
        response.users.forEach(function (item) {
            var newLi = document.createElement("li");
            newLi.textContent = item.username;
            onlineList.appendChild(newLi);
        });
    }
    onlineListDiv.appendChild(onlineList);
}), 5000)

