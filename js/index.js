

function DoCalculation(caller) {
    let PlayerFighters = document.getElementById("PlayerFighters")
    console.log(`${caller.id} value changed to ${PlayerFighters.value}`)
    return
}

function ToggleDefenderProduction() {
    let shouldHide = !document.getElementById("DefenderProductionToggle").checked
    let parent = document.getElementById("DefenderProductionContent")
    let children = parent.children
    console.log(`Setting children hidden=${shouldHide}`)
    for (let i = 0; i < children.length; i++) {
        console.log(`Child ${i + 1}: ${children[i]}`)
        if (shouldHide) { children[i].style.display = 'none'; }
        else { children[i].style.display = 'block'; }
    }
}