/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>

namespace pxsim {
    export var session: any;
    export var al_memory: any;
    export var audio_recorder_service: any;
    export var motion_service: any;
    export var text_to_speech: any;
    export var posture_service: any;
    export var autonomous_service: any;
    export var leds_service: any;
    export var speech_recognition: any;
    export var dialog_service: any;

    // picture of face hosted on Azure - hardcoded for cognitive services use
    export var hardcoded_image_url = "https://mikeytownface.blob.core.windows.net/faces/sanat.jpg?sp=r&st=2018-07-25T22:18:03Z&se=2019-05-09T06:18:03Z&spr=https&sv=2017-11-09&sig=TZwCaEOKXpRT1bnOgorBI519CD49sGXGML2nGln9W3A%3D&sr=b"

    /**
     * This function gets called each time the program restarts
     */
    initCurrentRuntime = () => {
        runtime.board = new Board();

        session = new QiSession("10.104.160.25:80");
        session.socket().on('connect', function () {
            console.log('QiSession connected!');
            setUpServices();
        }).on('disconnect', function () {
            console.log('QiSession disconnected!');
        });
    };

    function setUpServices() {
        session.service("ALTextToSpeech").done(function (service: any) {
            text_to_speech = service;
            text_to_speech.say("Session is connected and text service is running!");
        }).fail(function (error: any) {
            console.log("An error occurred:" + error);
        });

        session.service("ALAudioRecorder").done(function (service: any) {
            console.log("audio service hooked");
            audio_recorder_service = service;
        }).fail(function (error: any) {
            console.log("An error occurred:" + error);
        });

        session.service("ALMotion").done(function (service: any) {
            console.log("motion service hooked");
            motion_service = service;
        }).fail(function (error: any) {
            console.log("An error occurred:" + error);
        });

        session.service("ALRobotPosture").done(function (service: any) {
            console.log("posture service hooked");
            posture_service = service;
        }).fail(function (error: any) {
            console.log("An error occurred:" + error);
        });

        session.service("ALAutonomousMoves").done(function (service: any) {
            console.log("autonomous service hooked");
            autonomous_service = service;
        }).fail(function (error: any) {
            console.log("An error occurred:" + error);
        });

        session.service("ALLeds").done(function (service: any) {
            console.log("leds service hooked");
            leds_service = service;
        }).fail(function (error: any) {
            console.log("An error occurred:" + error);
        });

        session.service("ALSpeechRecognition").done(function (service: any) {
            console.log("speech recognition service hooked");
            speech_recognition = service;
        }).fail(function (error: any) {
            console.log("An error occurred:" + error);
        });

        session.service("ALMemory").done(function (service: any) {
            console.log("al memory service hooked");
            al_memory = service;
        }).fail(function (error: any) {
            console.log("An error occurred:" + error);
        });

        session.service("ALDialog").done(function (service: any) {
            console.log("dialog service hooked");
            dialog_service = service;
        }).fail(function (error: any) {
            console.log("An error occurred:" + error);
        });
    }

    /**
     * Gets the current 'board', eg. program state.
     */
    export function board() : Board {
        return runtime.board as Board;
    }

    /**
     * Represents the entire state of the executing program.
     * Do not store state anywhere else!
     */
    export class Board extends pxsim.BaseBoard {
        public bus: EventBus;
        public element : SVGSVGElement;
        public spriteElement: SVGCircleElement;
        public hareElement: SVGCircleElement;
        public sprite : Sprite;
        public hare: Sprite;
        
        constructor() {
            super();
            this.bus = new EventBus(runtime);
            this.element = <SVGSVGElement><any>document.getElementById('svgcanvas');
            this.spriteElement = <SVGCircleElement>this.element.getElementById('svgsprite');
            this.hareElement = <SVGCircleElement>this.element.getElementById('svgsprite2');
            this.sprite = new Sprite()
            this.hare = new Sprite();
        }
        
        initAsync(msg: pxsim.SimulatorRunMessage): Promise<void> {
            document.body.innerHTML = ''; // clear children
            document.body.appendChild(this.element);

            return Promise.resolve();
        }       
        
        updateView() {
            this.spriteElement.cx.baseVal.value = this.sprite.x;
            this.spriteElement.cy.baseVal.value = this.sprite.y;

            this.hareElement.cx.baseVal.value = this.hare.x;
            this.hareElement.cy.baseVal.value = this.hare.y;
        }
    }
}