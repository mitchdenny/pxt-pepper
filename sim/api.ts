/// <reference path="../libs/core/enums.d.ts"/>

namespace pxsim.hare {
    /**
     * This is hop
     */
    //% blockId="sampleHop" block="hop %hop on color %color=colorNumberPicker"
    //% hop.fieldEditor="gridpicker"
    export function hop(hop: Hop, color: number) {

    }

    //% blockId=sampleOnLand block="on land"
    //% optionalVariableArgs
    export function onLand(handler: (height: number, more: number, most: number) => void) {

    }
}

namespace pxsim.azai
{
    /**
     * Recognize image.
     */
    //% blockId=azaiRecognizeImage block="recognize image"
    export function recognizeImageAsync() {
        return Promise.delay(1000);
    }

    /**
     * Detect text.
     */
    //% blockId=azaiDetectText block="detect text"
    export function detectTextAsync() {
        return Promise.delay(1000);
    }

    /**
     * Detect emotions.
     */
    //% blockId=azaiDetectEmotions block="detect emotions"
    export function detectEmotionsAsync() {
        return Promise.delay(1000);
    }

    /**
     * Detect obstacle.
     */
    //% blockId=azaiDetectObstacle block="detect obstacle"
    export function detectObstacleAsync() {
        return Promise.delay(1000);
    }

}

namespace pxsim.pepper {
    /**
     * Get pepper to speak.
     * @param message the message to speak.
     * @param address the address of the pepper robot.
     */
    //% blockId=pepperSpeak block="speak %message on %address"
    export function speakAsync(message: string, address: string) {
        return Promise.delay(1000);
    }

    /**
     * Set Pepper's lights
     */
    //% blockId=pepperSetLights block="set lights"
    export function setLightsAsync() {
        return Promise.delay(1000);
    }

    /**
     * Capture image from Pepper's eyes.
     */
    //% blockId=pepperCaptureImage block="capture image"
    export function captureImageAsync() {
        return Promise.delay(1000);
    }

    /**
     * Turn left.
     */
    //% blockId=pepperTurnLeft block="turn left"
    export function turnLeftAsync() {
        return Promise.delay(1000);
    }

    /**
     * Turn right.
     */
    //% blockId=pepperTurnRight block="turn right"
    export function turnRightAsync() {
        return Promise.delay(1000);
    }

    /**
     * Roll forward.
     */
    //% blockId=pepperRollForward block="roll forward"
    export function rollForwardAsync() {
        return Promise.delay(1000);
    }

    /**
     * Roll backward.
     */
    //% blockId=pepperRollBackward block="roll backward"
    export function rollBackwardAsync() {
        return Promise.delay(1000);
    }
}

namespace pxsim.turtle {


    /**
     * Moves the sprite forward
     * @param steps number of steps to move, eg: 1
     */
    //% weight=90
    //% blockId=sampleForward block="forward %steps"
    export function forwardAsync(steps: number) {
        return board().sprite.forwardAsync(steps)
    }

    /**
     * Moves the sprite forward
     * @param direction the direction to turn, eg: Direction.Left
     * @param angle degrees to turn, eg:90
     */
    //% weight=85
    //% blockId=sampleTurn block="turn %direction|by %angle degrees"
    //% angle.min=-180 angle.max=180
    export function turnAsync(direction: Direction, angle: number) {
        let b = board();

        if (direction == Direction.Left)
            b.sprite.angle -= angle;
        else
            b.sprite.angle += angle;
        return Promise.delay(400)
    }

    /**
     * Triggers when the turtle bumps a wall
     * @param handler 
     */
    //% blockId=onBump block="on bump"
    export function onBump(handler: RefAction) {
        let b = board();

        b.bus.listen("Turtle", "Bump", handler);
    }
}

namespace pxsim.loops {

    /**
     * Repeats the code forever in the background. On each iteration, allows other code to run.
     * @param body the code to repeat
     */
    //% help=functions/forever weight=55 blockGap=8
    //% blockId=device_forever block="forever" 
    export function forever(body: RefAction): void {
        thread.forever(body)
    }

    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=functions/pause weight=54
    //% block="pause (ms) %pause" blockId=device_pause
    export function pauseAsync(ms: number) {
        return Promise.delay(ms)
    }
}

function logMsg(m:string) { console.log(m) }

namespace pxsim.console {
    /**
     * Print out message
     */
    //% 
    export function log(msg:string) {
        logMsg("CONSOLE: " + msg)
        // why doesn't that work?
        board().writeSerial(msg + "\n")
    }
}

namespace pxsim {
    /**
     * A ghost on the screen.
     */
    //%
    export class Sprite {
        /**
         * The X-coordiante
         */
        //%
        public x = 100;
         /**
         * The Y-coordiante
         */
        //%
        public y = 100;
        public angle = 90;
        
        constructor() {
        }
        
        private foobar() {}

        /**
         * Move the thing forward
         */
        //%
        public forwardAsync(steps: number) {
            let deg = this.angle / 180 * Math.PI;
            this.x += Math.cos(deg) * steps * 10;
            this.y += Math.sin(deg) * steps * 10;
            board().updateView();

            if (this.x < 0 || this.y < 0)
                board().bus.queue("TURTLE", "BUMP");

            return Promise.delay(400)
        }
    }
}

namespace pxsim.sprites {
    /**
     * Creates a new sprite
     */
    //% blockId="sampleCreate" block="createSprite"
    export function createSprite(): Sprite {
        return new Sprite();
    }
}