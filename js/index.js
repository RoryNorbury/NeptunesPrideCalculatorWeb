

function DoCalculation(caller) {
    let PlayerFighters = document.getElementById("player-fighters")
    console.log(`${caller.name} value changed to ${caller.value}`)
    return
}

function ToggleDefenderProduction() {
    let shouldHide = !document.getElementById("production-toggle").checked
    let parent = document.getElementById("production-inputs")
    console.log(`${shouldHide ? 'hiding' : 'showing'} elements`)
    if (shouldHide) { parent.style.display = 'none'; }
    else { parent.style.display = 'grid'; } // it might be better to have a div dedicated to showing or hiding the content
}