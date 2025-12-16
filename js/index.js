function DoCalculation(caller) {
    if (caller != null)
    {
        // for debugging
        console.log(`${caller.name} value changed to ${caller.value}`)
    }
    // get all parameters from elements
    let PlayerFighters = Number(document.getElementById("player-fighters").value)
    let PlayerWeapons = Number(document.getElementById("player-weapons").value)
    let EnemyFighters = Number(document.getElementById("enemy-fighters").value)
    let EnemyWeapons = Number(document.getElementById("enemy-weapons").value)
    let Stance = document.querySelector('input[name="stance"]:checked').value;
    let ProductionRate = Number(document.getElementById("defender-production-rate").value)
    let ProductionProgress = Number(document.getElementById("defender-production-progress").value)
    let StarDistance = Number(document.getElementById("star-distance").value)
    let DoProduction = document.getElementById("production-toggle").checked
    // log values to console (for debugging)
    console.log(`
player-fighters: ${PlayerFighters},
player-weapons: ${PlayerWeapons},
enemy-fighters: ${EnemyFighters},
enemy-weapons: ${EnemyWeapons},
stance: ${Stance},
defender-production-rate: ${ProductionRate}, 
defender-production-progress: ${ProductionProgress}, 
star-distance: ${StarDistance}
do-production: ${DoProduction}`)

    // hide perfect attack output if defending, as it does not apply
    let perfectParent = document.getElementById("perfect-min-fighters-total").parentElement
    if (Stance == "attack") { perfectParent.style.display = 'flex' }
    else if (Stance == 'defend') { perfectParent.style.display = 'none' }

    if (Stance == 'attack') {
        // ensure values are in correct range
        let af = (PlayerFighters >= 1) ? PlayerFighters : 1
        let df = (EnemyFighters >= 1) ? EnemyFighters : 1
        let aw = (PlayerWeapons >= 1) ? PlayerWeapons : 1
        let dw = (EnemyWeapons >= 1) ? EnemyWeapons : 1

        // ships produced during transit
        if (DoProduction) {
            let produced = Math.floor(ProductionProgress + (ProductionRate * StarDistance))
            df += produced
        }

        // calculate minimum attacking fighters needed for generic attack
        let minFighters = Math.max(1, Math.ceil((df / aw) * dw + 1))

        // calculate minimum attacking fighters needed for perfect attack
        let perfectMinFighters = minFighters + Math.max(1, Math.ceil((df - aw) / (aw + 1)) * (dw - 1) + 1)

        // combat simulation for generic attack
        // simulated to ensure it is always correct and not subject to my idiocy
        let victor = null
        while (true) {
            // enemy (defender) turn
            af -= dw
            if (af <= 0) {
                af = 0
                victor = 'Enemy'
                break
            }
            // player (attacker) turn
            df -= aw
            if (df <= 0) {
                df = 0
                victor = 'Player'
                break
            }
        }

        // output results to HTML
        document.getElementById("fight-result").innerText = victor + ' wins with ' + (victor == 'Player' ? af : df) + ' fighters remaining.'
        document.getElementById("min-fighters").innerText = minFighters
        document.getElementById("perfect-min-fighters-total").innerText = 'Total: ' + perfectMinFighters
        document.getElementById("perfect-min-fighters-attacking").innerText = 'Attacking: ' + minFighters
        document.getElementById("perfect-min-fighters-defending").innerText = 'Defending: ' + (perfectMinFighters - minFighters)
    }
    else if (Stance == 'defend') {
        // ensure values are in correct range
        let af = (PlayerFighters >= 1) ? PlayerFighters : 1
        let df = (EnemyFighters >= 1) ? EnemyFighters : 1
        let aw = (PlayerWeapons >= 1) ? PlayerWeapons : 1
        let dw = (EnemyWeapons >= 1) ? EnemyWeapons : 1

        // ships produced during transit
        let produced = 0
        if (DoProduction) {
            produced = Math.floor(ProductionProgress + (ProductionRate * StarDistance))
            df += produced
        }

        // calculate minimum defending fighters needed for generic attack
        let minFighters = Math.max(1, Math.ceil(((af - dw) / dw) * aw + 1))

        // adjust for production
        if (DoProduction) { minFighters -= produced }

        // perfect attack does not apply when defending
        let perfectMinFighters = 0

        // combat simulation for generic defense
        // simulated to ensure it is always correct and not subject to my idiocy
        let victor = null
        while (true) {
            // player (defender) turn
            af -= dw
            if (af <= 0) {
                af = 0
                victor = 'Player'
                break
            }
            // enemy (attacker) turn
            df -= aw
            if (df <= 0) {
                df = 0
                victor = 'Enemy'
                break
            }
        }

        // output results to HTML
        document.getElementById("fight-result").innerText = victor + ' wins with ' + (victor == 'Player' ? df : af) + ' fighters remaining.'
        document.getElementById("min-fighters").innerText = minFighters
        document.getElementById("perfect-min-fighters-total").innerText = perfectMinFighters
    }
}

function ToggleDefenderProduction() {
    let shouldHide = !document.getElementById("production-toggle").checked
    let parent = document.getElementById("production-inputs")
    console.log(`${shouldHide ? 'hiding' : 'showing'} elements`)
    if (shouldHide) { parent.style.display = 'none'; }
    else { parent.style.display = 'grid'; } // it might be better to have a div dedicated to showing or hiding the content
}

// run calculation on page load
window.onload = function()
{
    DoCalculation(null)
}