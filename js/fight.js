let token = localStorage.getItem('token');
let user;
if(token) {
    Ajax.post('localhost:3333/login', {user_id: token}, function(res){
        user = res.user;
    });
} else {
    console.log("U r not allowed here");
}

const startFightBtn = document.querySelector('.start-fight');

startFightBtn.onclick = function(){
    
}