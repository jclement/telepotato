radio.onReceivedNumber(function (receivedNumber) {
    potatoLife = receivedNumber
})
input.onButtonPressed(Button.A, function () {
    if (hasPotato == 1) {
        passPotato()
    }
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "haspotato") {
        lastPotato = clock
        availablePotato = 0
        hasPotato = 0
    }
    if (receivedString == "potato") {
        availablePotato = 1
    }
})
function spawnPotato () {
    if (clock - lastPotato > 5) {
        radio.sendString("potato")
        potatoLife = randint(100, 300)
        radio.sendNumber(potatoLife)
        soundExpression.hello.play()
    }
}
function passPotato () {
    radio.sendString("potato")
    availablePotato = 0
    hasPotato = 0
    basic.clearScreen()
}
function takePotato () {
    if (availablePotato == 1) {
        radio.sendString("haspotato")
        availablePotato = 0
        hasPotato = 1
        basic.showLeds(`
            . . # # .
            . # # # .
            . # # # .
            . # # # .
            . # # . .
            `)
    }
}
let availablePotato = 0
let clock = 0
let lastPotato = 0
let hasPotato = 0
let potatoLife = 0
radio.setGroup(189)
basic.forever(function () {
    takePotato()
    spawnPotato()
    basic.pause(randint(50, 300))
})
basic.forever(function () {
    clock += 1
    basic.pause(500)
})
basic.forever(function () {
    if (hasPotato == 1) {
        lastPotato = clock
        radio.sendString("haspotato")
        potatoLife += -1
        radio.sendNumber(potatoLife)
        if (potatoLife < 0) {
            basic.showIcon(IconNames.Ghost)
            soundExpression.sad.play()
            availablePotato = 0
            hasPotato = 0
        }
    }
    basic.pause(100)
})
basic.forever(function () {
    led.toggle(0, 0)
    basic.pause(potatoLife / 10)
})
