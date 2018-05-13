let token = localStorage.getItem('token');
let user;
if (token) {
    Ajax.get('http://localhost:3333/whoami?user_id=' + token, function (res) {
        res = JSON.parse(res);
        user = res.user;
    });
} else {
    window.location = "./register.html";
}
let combat;
let playerHealth = 30;
let enemyHealth = 30;
let turnResolveStatus = "";
let hitButtons = document.querySelectorAll('.hit');
let blockButtons = document.querySelectorAll('.block');
let controlsPnl = document.querySelector('.controls-pnl');
let searchPnl = document.querySelector('.searching');
let waitingPnl = document.querySelector('.waiting');
let playerHp = document.querySelector('.your-hp');
let enemyHp = document.querySelector('.enemy-hp');
let statusPnl = document.querySelector('.status-pnl');

const startFightBtn = document.querySelector('.start-fight');

startFightBtn.onclick = function(){
    Ajax.post('http://localhost:3333/fight', {user_id: token}, function(res){
        res = JSON.parse(res);
        if(res.status == 'ok'){
            combat = res.combat;
            checkForOpponentReadyState();
            startFightBtn.classList.add('hidden');
            searchPnl.classList.remove('hidden');
        }
    });
}

function checkForOpponentReadyState(){
    Ajax.get('http://localhost:3333/status?user_id=' + token + "&combat_id=" + combat.id, function(res){
        res = JSON.parse(res);
        if(res.combat.status === 'pending'){
            setTimeout(checkForOpponentReadyState, 1000);
        }else if(res.combat.status === 'progress'){
            showControls();
        }
    });
}

function showControls(){
    searchPnl.classList.add('hidden');
    controlsPnl.classList.remove('hidden');
}

const turnBtn = document.querySelector('.turn-btn');
turnBtn.onclick = function(){
    let hit = 1;
    let blocks = [1, 2];
    hitButtons.forEach(hitBtn => {
        if(hitBtn.checked) {
            hit = +hitBtn.value;
        }
    });
    blockButtons.forEach(blockBtn => {
        if (blockBtn.checked) {
            blocks = [+blockBtn.value, (+blockBtn.value + 1) % 5 == 0 ? 1 : (+blockBtn.value + 1) % 5 ];
        }
    });
    console.log(hit, blocks);

    let turn = {
        hit: hit,
        blocks: blocks
    }

    Ajax.post('http://localhost:3333/turn', {user_id: token, combat_id: combat.id, turn: JSON.stringify(turn)}, function(res){
        res = JSON.parse(res);
        combat = res.combat;
        if (res.combat.status === "finished") {
            controlsPnl.classList.add('hidden');
            waitingPnl.classList.add('hidden');
            statusPnl.classList.remove('hidden');
            if (res.combat.you.health > res.combat.enemy.health) {
                statusPnl.textContent = "Вы победили!";
            } else if (res.combat.you.health < res.combat.enemy.health) {
                statusPnl.textContent = "Вы проиграли!";
            } else {
                statusPnl.textContent = "Ничья!";
            }
            return;
        }
        if(res.combat.turn_status){
            playerHealth = res.combat.you.health;
            enemyHealth = res.combat.enemy.health;
            playerHp.textContent = res.combat.you.username + ":" + playerHealth;
            enemyHp.textContent = res.combat.enemy.username + ":" + enemyHealth;
            let didHit = false;
            res.combat.results[res.combat.results.length - 1].forEach(item => {
                if(item.origin.id === token){
                    didHit = !item.blocked;
                }
            });
            let status = "Вы " + (didHit ? "попали!" : "не пробили блок!");
            statusPnl.textContent = status;
            statusPnl.classList.remove('hidden');
        } else {
            setTimeout(checkForOpponentMove, 1000);
            controlsPnl.classList.add('hidden');
            waitingPnl.classList.remove('hidden');
            statusPnl.classList.add('hidden');
        }
    });
}

function checkForOpponentMove(){
    Ajax.get('http://localhost:3333/status?user_id=' + token + "&combat_id=" + combat.id, function(res) {
        res = JSON.parse(res);
        combat = res.combat;
        if (res.combat.status === "finished") {
            controlsPnl.classList.add('hidden');
            waitingPnl.classList.add('hidden');
            statusPnl.classList.remove('hidden');
            if (res.combat.you.health > res.combat.enemy.health) {
                statusPnl.textContent = "Вы победили!";
            } else if (res.combat.you.health < res.combat.enemy.health) {
                statusPnl.textContent = "Вы проиграли!";
            } else {
                statusPnl.textContent = "Ничья!";
            }
            return;
        }
        if(combat.turn_status) {
            waitingPnl.classList.add('hidden');
            controlsPnl.classList.remove('hidden');
            playerHealth = combat.you.health;
            enemyHealth = combat.enemy.health;
            playerHp.textContent = res.combat.you.username + ":" + playerHealth;
            enemyHp.textContent = res.combat.enemy.username + ":" + enemyHealth;
            let didHit = false;
            res.combat.results[res.combat.results.length - 1].forEach(item => {
                if (item.origin.id === token) {
                    didHit = !item.blocked;
                }
            });
            let status = "Вы " + (didHit ? "попали!" : "не пробили блок!");
            statusPnl.textContent = status;
            statusPnl.classList.remove('hidden');
        } else {
            setTimeout(checkForOpponentMove, 1000);
        }
    });
}