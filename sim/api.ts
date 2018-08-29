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
     * TODO
     * CURRENTLY NOT WORKING - why?
     * Get pepper to move.
     */
    //% blockId=pepperMoveAround block="move pepper %x meters forward and %y sideways."
    export function moveAsync(x: number, y: number) {
        if (motion_service != null) {
            motion_service.moveTo(x, y, 0.0);
        }
        return Promise.delay(1000);    
    }

    /**
     * TODO
     * CURRENTLY NOT WORKING - why?
     * Get pepper to turn.
     */
    //% blockId=pepperSpinAround block="spin pepper %z degrees"
    export function turnAsync(z: number) {
        if (motion_service != null) {
            motion_service.moveTo(0, 0, z);
        }
        return Promise.delay(1000);    
    }


    /**
     * Detect age.
     */
    //% blockId=pepperDetectAge block="detect age"
    export function detectAgeAsync() {
        var subscriptionKey = "85a0f7c4242b45a9a6cfa5843b97e0f3";

        var uriBase =
            "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

        // Request parameters.
        var params="returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes[]=age"

        // Display the image.
        var sourceImageUrl = hardcoded_image_url;

	var xhr = new XMLHttpRequest();
	var url = uriBase + "?" + params;
	xhr.open('POST', url, false);
	var data = '{"url": ' + '"' + sourceImageUrl + '"}';
	xhr.setRequestHeader("Content-Type","application/json");
	xhr.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
	xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
		if (text_to_speech != null) {
	   		//text_to_speech.say("Testing cognitive services");
            		var resp = JSON.stringify(response[0].faceAttributes.age)
			resp = "You look" + resp + "years old"
                        pxsim.text_to_speech.say(resp);
       		}
            }
	
        }
    	};
	xhr.send(data);
        return Promise.delay(2000);
    }

        /**
     * Detect gender.
     */
    //% blockId=pepperDetectGender block="detect gender"
    export function detectGenderAsync() {
        var subscriptionKey = "85a0f7c4242b45a9a6cfa5843b97e0f3";

        var uriBase =
            "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

        // Request parameters.
        var params="returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes[]=gender"

        // Display the image.
        var sourceImageUrl = hardcoded_image_url;
       	

	var xhr = new XMLHttpRequest();
	var url = uriBase + "?" + params;
	xhr.open('POST', url, false);
	var data = '{"url": ' + '"' + sourceImageUrl + '"}';
	xhr.setRequestHeader("Content-Type","application/json");
	xhr.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
	xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
		if (text_to_speech != null) {
	   		//text_to_speech.say("Testing cognitive services");
            		var resp = JSON.stringify(response[0].faceAttributes.gender)
			resp = "You look like a " + resp
                        pxsim.text_to_speech.say(resp);
       		}
            }
	
        }
    	};
	xhr.send(data);
        return Promise.delay(2000);
    }


    /**
     * Detect emotion.
     */
    //% blockId=pepperDetectEmotion block="detect emotion"
    export function detectEmotionAsync() {
        var subscriptionKey = "85a0f7c4242b45a9a6cfa5843b97e0f3";

        var uriBase =
            "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

        // Request parameters.
        var params="returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes[]=emotion"

        // Display the image.
        var sourceImageUrl = hardcoded_image_url;
       	

	var xhr = new XMLHttpRequest();
	var url = uriBase + "?" + params;
	xhr.open('POST', url, false);
	var data = '{"url": ' + '"' + sourceImageUrl + '"}';
	xhr.setRequestHeader("Content-Type","application/json");
	xhr.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
	xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
		if (text_to_speech != null) {
            		//var resp = JSON.stringify(response[0].faceAttributes.emotion)
			var resp = JSON.parse(xhr.responseText)
			var maxValue = 0;
			var maxEmotion = "";
			var tes = resp[0].faceAttributes.emotion
			for (var key in tes)
			{
     			if (tes[key] > maxValue)
     			{
         		 maxValue = tes[key];   
			 maxEmotion = key;
     			}
			}
			
			resp = "You look like you're the reflection of " + maxEmotion + " today"
                        pxsim.text_to_speech.say(resp);
       		}
            }
	
        }
    	};
	xhr.send(data);
        return Promise.delay(2000);
    }

    /**
     * Get pepper to nod head.
     */
    //% blockId=pepperNodHead block="nod head yes"
    export function nodHeadAsync() {
        if (motion_service != null) {
            motion_service.setAngles(["HeadPitch"], [.5],.3);
            setTimeout(()=>motion_service.setAngles(["HeadPitch"], [-.25],.3),800);
            setTimeout(()=>motion_service.setAngles(["HeadPitch"], [.5],.3),1600);
            setTimeout(()=>motion_service.setAngles(["HeadPitch"], [-.25],.3),2400);
        }
        return Promise.delay(1000);    
    }

    /**
     * Get pepper to shake head.
     */
    //% blockId=pepperShakeHead block="shake head no"
    export function shakeHeadAsync() {
        if (motion_service != null) {
            motion_service.setAngles(["HeadYaw"], [1.2],.4);
            setTimeout(()=>motion_service.setAngles(["HeadYaw"], [-1.2],.4),750);
            setTimeout(()=>motion_service.setAngles(["HeadYaw"], [1.2],.4),1500);
            setTimeout(()=>motion_service.setAngles(["HeadYaw"], [-1.2],.4),2250);
            setTimeout(()=>motion_service.setAngles(["HeadYaw"], [0],.4),3000);
        }
        return Promise.delay(1000);    
    }

    /**
     * Get pepper to lift right arm and say hi.
     */
    //% blockId=pepperSayHi block="say hi"
    export function sayHiAsync() {
        if (motion_service != null) {
            motion_service.setAngles(["LShoulderRoll", "LElbowYaw","LElbowRoll"], [1.53,-2,-1.4],.5);
            //motion_service.setAngles(["LShoulderPitch", "LElbowRoll"], [1.5,-1.4],.5);
            motion_service.openHand("LHand");
            setTimeout(()=>motion_service.closeHand("LHand"), 250);
            setTimeout(()=>motion_service.openHand("LHand"), 500);
            setTimeout(()=>motion_service.closeHand("LHand"), 750);
            setTimeout(()=>motion_service.openHand("LHand"), 1000);
        }
        return Promise.delay(1000);    
    }

    /**
     * TODO
     * USELESS, NOT DOING WHAT INTENDED
     * Set dialog trigger
     */
    //% blockId=pepperDialogReact block="for %secs seconds, start dialog"
    export function setDialogTriggerAsync(timeout: number) {
        if (dialog_service != null && al_memory != null) {
            var subscriptionName = "Test_Dialog";
            var topicContent = "topic: ~mytopic()\n"
                "language: enu\n"
                "proposal: hello\n"
                "u:(hi) nice to meet you\n";
            var topicName = dialog_service.loadTopicContent(topicContent);
            dialog_service.activateTopic(topicName);
            dialog_service.subscribe(subscriptionName);
            al_memory.subscriber("Dialog/NotUnderstood").then(function(subscriber: any) {
                subscriber.signal.connect(function(state: any) {
                    console.log(state);
                });
            });
            setTimeout(()=>{dialog_service.unsubscribe(subscriptionName); dialog_service.deactivateTopic(topicName); dialog_service.unloadTopic(topicName);}, timeout * 1000);
        }
        return Promise.delay(1000);
    }

    /**
     * Set trigger word and respond with a reaction sentence for a set period of time
     */
    //% blockId=pepperReact block="for %secs seconds, react to %word with %reaction"
    export function setReactionAsync(timeout: number, word: string, reaction: string) {
        if (speech_recognition != null && al_memory != null) {
            var subscriptionName = "Test_ASR";
            speech_recognition.setVocabulary([word], true);
            speech_recognition.subscribe(subscriptionName);
            al_memory.subscriber("WordRecognized").then(function(subscriber: any) {
                subscriber.signal.connect(function(state: any) {
                    var confidence = state[1];
                    if (text_to_speech != null && confidence > 0.40) {
                        speech_recognition.pause(true);
                        text_to_speech.say(reaction);
                        setTimeout(()=>speech_recognition.pause(false), 1000);
                    }
                    console.log(state);
                });
            });
            setTimeout(()=>{speech_recognition.unsubscribe(subscriptionName); speech_recognition.removeAllContext()}, timeout * 1000);
        }
        return Promise.delay(1000);
    }

    /**
     * onHeard
     */
    //% blockId=onHeard block="on hearing %word"
    export function onHeard(word: string, handler: RefAction) {
        let b = board();
        if (speech_recognition != null && al_memory != null) {
            var subscriptionName = "Test_ASR";
            speech_recognition.setVocabulary([word], true);
            speech_recognition.subscribe(subscriptionName);
            al_memory.subscriber("WordRecognized").then(function(subscriber: any) {
                subscriber.signal.connect(function(state: any) {
                    var confidence = state[1];
                    if (text_to_speech != null && confidence > 0.50) {
                        b.bus.queue("Pepper", "WordRecognized");
                    }
                    console.log(state);
                });
            });
            //setTimeout(()=>{speech_recognition.unsubscribe(subscriptionName); speech_recognition.removeAllContext()}, timeout * 1000);
        }

        b.bus.listen("Pepper", "WordRecognized", handler);
    }

    /**
     * Unsubscribe any speech recognition engines
     */
    //% blockId=pepperUnsubscribe block="unsubscribe"
    export function unsubscribeAsync() {
        if (speech_recognition != null) {
            speech_recognition.unsubscribe("Test_ASR");
            speech_recognition.removeAllContext();
        }
        return Promise.delay(1000);    
    }

    /**
     * Rasta animation, oh yeah!
     */
    //% blockId=pepperSwitchLeds block="turn %on LEDs %area"
    export function switchLEDsAsync(on: OnOff, area: LEDArea) {
        if (leds_service != null) {
            var ledGroup;
            switch(area) {
                case LEDArea.Eyes:
                    ledGroup = "FaceLeds";
                    break;
                case LEDArea.Ears:         
                    ledGroup = "EarLeds";
                    break;
                case LEDArea.Shoulders:
                    leds_service.createGroup("ShoulderLeds", ["ChestBoard/Led/Red/Actuator/Value",
                                                            "ChestBoard/Led/Green/Actuator/Value",
                                                            "ChestBoard/Led/Blue/Actuator/Value"]);
                    ledGroup = "ShoulderLeds";
                    break;
                default:
                    break;
            }
            if (on == 0) {
                leds_service.on(ledGroup);
            } else {
                leds_service.off(ledGroup);
            }
        }
        return Promise.delay(1000);
    }

    /**
     * Rasta animation, oh yeah!
     */
    //% blockId=pepperRasta block="rasta for %secs seconds!!"
    export function rastaAsync(time: number) {
        if (leds_service != null) {
            leds_service.rasta(time);
        }
        return Promise.delay(1000);    
    }

    /**
     * Get pepper to animate eyes.
     */
    //% blockId=pepperAnimateEyes block="animate eyes %color for %secs seconds"
    export function animateEyesAsync(color: Color, time: number) {
        var colorValue: any;
        switch(color) {
            case Color.Red:
                colorValue = 0x00FF0000;
                break;
            case Color.Green:
                colorValue = 0x0000FF00;
                break;
            case Color.Blue:
                colorValue = 0x000000FF;
                break;
            default:
                break;
        }
        if (leds_service != null) {
            leds_service.rotateEyes(colorValue, 1.5, time);
        }
        return Promise.delay(1000);    
    }

    /**
     * Get pepper to animate eyes.
     */
    //% blockId=pepperAnimateEyesRandom block="animate eyes for %secs seconds"
    export function animateEyesRandomAsync(time: number) {
        if (leds_service != null) {
            leds_service.randomEyes(time);
        }
        return Promise.delay(1000);    
    }

    /**
     * Get pepper to open a hand.
     * @param hand right ("RHand") or left ("LHand") hand to open
     */
    //% blockId=pepperOpenHand block="open %hand hand"
    export function openHandAsync(hand: PepperSide) {
        if (motion_service != null) {
            motion_service.openHand(hand == 0? "RHand": "LHand");
        }
        return Promise.delay(1000);    
    }

    /**
     * Get pepper to close a hand.
     * @param hand right ("RHand") or left ("LHand") hand to close
     */
    //% blockId=pepperCloseHand block="close %hand hand"
    export function closeHandAsync(hand: PepperSide) {
        if (motion_service != null) {
            motion_service.closeHand(hand == 0? "RHand": "LHand");
        }
        return Promise.delay(1000);    
    }

    /**
     * Get pepper to move an arm up.
     */
    //% blockId=pepperMoveArmUp block="move %side arm up"
    export function moveArmUpAsync(side: PepperSide) {
        if (motion_service != null) {
            //motion_service.wakeUp();
            var joint = side == 0? "RShoulderPitch" : "LShoulderPitch";
            motion_service.setAngles(joint, -.8, 0.8);
        }
        return Promise.delay(1000);    
    }

    /**
     * Get pepper to move an arm to the side.
     */
    //% blockId=pepperMoveArmSide block="move %side arm side"
    export function moveArmSideAsync(side: PepperSide) {
        if (motion_service != null) {
            //motion_service.wakeUp();
            var joint = side == 0? "RShoulderRoll" : "LShoulderRoll";
            var radians = side == 0? -1.2: 1.2;
            motion_service.setAngles(joint, radians, 0.8);
        }
        return Promise.delay(1000);    
    }

    /**
     * Get pepper to shamelessly dab for a few seconds.
     */
    //% blockId=pepperDab block="dab %direction"
    export function dabAsync(direction: PepperSide) {
        if (motion_service != null) {
            //motion_service.wakeUp();
            if (direction == 0) {
                // right side dab
                motion_service.setAngles(["RShoulderRoll","LShoulderPitch","LShoulderRoll","LElbowYaw","LElbowRoll", "HeadYaw"], [-1.45,-.5,.13,-.58,-1.56, 1], 0.5);
                // setTimeout(()=>motion_service.setAngles("LShoulderPitch", -.5, 0.5), 4000);
                // setTimeout(()=>motion_service.setAngles("LShoulderRoll", 0.13, 0.5), 7000);
                // setTimeout(()=>motion_service.setAngles("LElbowYaw", -.58, 0.5), 10000);
                // setTimeout(()=>motion_service.setAngles("LElbowRoll", -1.56, 0.5), 13000);
            } else {
                // left side dab
                motion_service.setAngles(["LShoulderRoll","RShoulderPitch","RShoulderRoll","RElbowYaw","RElbowRoll", "HeadYaw"], [1.54, -.7, -.12, .17, 1.56, -1], 0.5);
                // setTimeout(()=>motion_service.setAngles("RShoulderPitch", -.7, 0.5), 4000);
                // setTimeout(()=>motion_service.setAngles("RShoulderRoll", -0.12, 0.5), 7000);
                // setTimeout(()=>motion_service.setAngles("RElbowYaw", .17, 0.5), 10000);
                // setTimeout(()=>motion_service.setAngles("RElbowRoll", 1.56, 0.5), 13000);
            }
        }
        return Promise.delay(1000);    
    }

    /**
     * Get pepper to reset to a predefined posture.
     */
    //% blockId=pepperSetPosture block="set posture to %posture"
    export function setPostureAsync(posture: RobotPosture) {
        var postureString: string;
        switch(posture) {
            case RobotPosture.Stand:
                postureString = "Stand";
                break;
            case RobotPosture.StandInit:
                postureString = "StandInit";
                break;
            case RobotPosture.StandZero:
                postureString = "StandZero";
                break;
            default:
                break;
        }
        if (posture_service != null) {
            posture_service.goToPosture(postureString, 0.5);
        }
        return Promise.delay(1000);
    }

    /**
     * Tell pepper to rest
     */
    //% blockId=pepperSleep block="send pepper to sleep"
    export function sendToSleepAsync() {
        if (motion_service != null) {
            motion_service.rest();
        }
        return Promise.delay(1000);
    }

    /**
     * Wake pepper up
     */
    //% blockId=pepperWake block="wake up pepper"
    export function wakeUpAsync() {
        if (motion_service != null) {
            motion_service.wakeUp();
        }
        return Promise.delay(1000);
    }

    /**
     * Set autonomous mode on/off
     */
    //% blockId=pepperAutonomous block="set autonomous life %on"
    export function setAutonomousModeAsync(on: boolean) {
        if (autonomous_service != null) {
            autonomous_service.setExpressiveListeningEnabled(on);
        }
        return Promise.delay(3000);
    }

    /**
     * Get pepper to stop moving.
     */
    //% blockId=pepperStopMove block="stop moving"
    export function stopMoveAsync() {
        if (motion_service != null) {
            motion_service.killAll();
        }
        return Promise.delay(1000);    
    }

    /**
     * stop Pepper current action
     */
    //% blockId=pepperStopSpeechAction block="stop current speech action"
    export function stopCurrentSpeechActionAsync() {
        if (text_to_speech != null) {
            text_to_speech.stopAll();
        }
        return Promise.delay(1000);
    }

    /**
     * Get pepper to speak.
     * @param message the message to speak.
     * @param address the address of the pepper robot.
     */
    //% blockId=pepperSpeak block="speak %message"
    export function speakAsync(message: string) {
        if (text_to_speech != null) {
            text_to_speech.say(message);
        }
        return Promise.delay(1000);    
    }

    /**
     * TODO: connect to backend to get file over from Pepper via scp
     * Capture audio from Pepper's microphones.
     */
    //% blockId=pepperCaptureAudio block="capture audio for %time seconds "
    export function captureAudioFileAsync(time: number) {
        var channels = [0, 0, 1, 0];
        if (audio_recorder_service != null) {
            audio_recorder_service.startMicrophonesRecording("/home/nao/audio.wav", "wav", 16000, channels);
            setTimeout(()=>audio_recorder_service.stopMicrophonesRecording(), (time*1000));
        }
        return Promise.delay(1000);
    }

    
    /**
     * TODO: NOT IMPLEMENTED
     * Capture photo with Pepper
     */
    //% blockId=pepperCapturePhoto block="take a photo"
    export function capturePhotoAsync() {
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