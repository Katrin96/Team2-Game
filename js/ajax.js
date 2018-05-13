const Ajax = {
    get: function(link, callback){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', link, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                callback(this.responseText);
            }
        }
    },
    post: function (link, params, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', link, true);
<<<<<<< HEAD
        var str = Object.keys(params).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
        }).join('&');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(str);
=======
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
>>>>>>> bd369ec6daf24074cbaaac9c7f4b70ab7f504600
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                callback(this.responseText);
            }
        }
    }
}