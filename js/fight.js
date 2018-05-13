let token = localStorage.getItem('token');
let user;
let combat;
let lives = 30;
let turnResolveStatus = "";
if(token) {
    Ajax.post('localhost:3333/login', {user_id: token}, function(res){
        user = res.user;
    });
} else {
    console.log("U r not allowed here");
}

const startFightBtn = document.querySelector('.start-fight');

startFightBtn.onclick = function(){
    Ajax.post('localhost:3333/fight', {user_id: token}, function(res){
        res = JSON.parse(res);
        if(res.status == 'ok'){
            combat = res.combat;
        }
    });
}

function checkForOpponentReadyState(){
    Ajax.post('localhost:3333/status', {user_id: token, comabt_id: combat.id}, function(res){
        res = JSON.parse(res);
        if(res.combat.status === 'pending'){
            setTimeout(checkForOpponentReadyState, 1000);
        }else if(res.combat.status === 'progress'){

        }
    });
}

function showControls(){

}

const turnBtn = document.querySelector('.turn-btn');
turnBtn.onclick = function(){
    let hit = 1;
    let blocks = [1, 2];

    let turn = {
        hti: hit,
        blocks: blocks
    }

    Ajax.post('localhost:3333/turn', {user_id: token, combat_id: comabt.id, turn: JSON.stringify(turn)}, function(res){
        res = JSON.parse(res);
        
    });
}

checkForOpponentReadyState();