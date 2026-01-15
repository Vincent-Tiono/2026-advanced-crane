radio.onReceivedString(function (receivedString) {
    STAT = receivedString
    basic.showString(STAT)
    if (STAT == "R") {
        targetDist = 15
    } else if (STAT == "G") {
        targetDist = 10
    } else if (STAT == "B") {
        targetDist = 5
    } else if (STAT == "RESET") {
        targetDist = 0
    }
})
function receiverDrive (speed: number, dir: number) {
    RoboticsWorkshop.DDMmotor(
    AnalogPin.P16,
    speed,
    DigitalPin.P15,
    dir
    )
}
let currentDist = 0
let targetDist = 0
let STAT = ""
radio.setGroup(188)
basic.forever(function () {
    if (targetDist > 0) {
        currentDist = RoboticsWorkshop.ping(
        DigitalPin.P8,
        DigitalPin.P1,
        PingUnit.Centimeters
        )
        // Hysteresis / Deadzone logic for smoothness
        if (currentDist > targetDist + 2) {
            // Move Backward toward goal
            receiverDrive(200, 0)
        } else if (currentDist < targetDist - 2) {
            // Move Forward away from goal
            receiverDrive(200, 1)
        } else {
            // Perfect distance, Brake
            receiverDrive(0, 1)
        }
    } else {
        // Idle
        receiverDrive(0, 1)
    }
})
