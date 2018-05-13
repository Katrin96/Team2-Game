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
        var str = Object.keys(params).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
        }).join('&');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(str);
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                callback(this.responseText);
            }
        }
    }
}