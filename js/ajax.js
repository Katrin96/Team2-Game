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
        xhr.send(params);
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                callback(this.responseText);
            }
        }
    }
}