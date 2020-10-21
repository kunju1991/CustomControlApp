// jQuery.sap.require("custom.controls.demo.control.SpeechRecognitionInputControl");
sap.ui.controller("custom.controls.demo.controller.CustomControlView", {
	onInit:function(){
		window.SpeechRecognition = window.SpeechRecognition || 
									window.webkitSpeechRecognition || 
									window.mozSpeechRecognition || 
									window.msSpeechRecognition ||
									null;
		this.recognition = new window.SpeechRecognition();
	},
	onButtonPress: function (evt) {
		// var x = new custom.controls.demo.control.SpeechRecognitionInputControl();
		// var oLayout = this.getView().byId("thisPage");
		// oLayout.addContent(x);
		var transcription = this.getView().byId("idInput");
		var log = this.getView().byId("idLog");
		this.recognition.lang = 'en-US';
		// recognition.interimResults = false;
		this.recognition.maxAlternatives = 5;
		this.recognition.continuous = true;

		// recognition.onresult = function (event) {
		// 	console.log('You said: ', event.results[0][0].transcript);
		// };
		
		// Start recognising
        this.recognition.onresult = function(event) {
          transcription.setValue('');

          for (var i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              transcription.setValue(event.results[i][0].transcript + ' (Confidence: ' + event.results[i][0].confidence + ')');
            } else {
              transcription.setValue(event.results[i][0].transcript);
            }
          }
        };

		this.recognition.start();
		
        // Listen for errors
        this.recognition.onerror = function(event) {
          log.setValue(event.error);
          transcription.setValue('');
        };
	},
	onButtonStop:function(){
		this.recognition.stop();
		if(event.error){
			this.recognition.onresult(event);
		}
	}
});