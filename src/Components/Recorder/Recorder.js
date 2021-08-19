import React, {Component} from 'react';
import './Recorder.css';
import MusicPlayer from "./MusicPlayer.js";

export default class Recorder extends Component {

    record = document.querySelector('.record');
    stop = document.querySelector('.stop');
    soundClips = document.querySelector('.sound-clips');
    mediaRecorder = null;
    chunks = [];

    constructor(props) {
        super(props);

        this.state = {
            recording: false,
            audio: 'null',
            recordings: []
        };
    }

    componentDidMount() {
        /*fetch('http://127.0.0.1:5000/')
        .then(res => res.json())
        .then((data) => {
            this.setState({ recordings: data })
        })
        .catch(console.log)*/

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            let self = this;
            console.log('getUserMedia supported.');
            navigator.mediaDevices.getUserMedia (
               // constraints - only audio needed for this app
               {
                  audio: true
               })
         
               // Success callback
               .then(function(stream) {
                    console.log("Success")
                    self.mediaRecorder = new MediaRecorder(stream);

                    self.mediaRecorder.ondataavailable = function(e) {
                        self.chunks.push(e.data);
                    }

                    self.mediaRecorder.onstop = function(e) {
                        const blob = new Blob(self.chunks, { 'type' : 'audio/ogg; codecs=opus' });
                        const audioURL = window.URL.createObjectURL(blob);
                        
                        console.log(self.chunks);
                        self.setState({audio:audioURL});
                        console.log("at " + self.state.audio);

                        var xhr = new XMLHttpRequest();
                        xhr.open("POST", 'http://127.0.0.1:5000/upload', true);
                        //xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.send(blob);
                    }
               })
         
               // Error callback
               .catch(function(err) {
                  console.log('The following getUserMedia error occurred: ' + err);
               }
            );
         } else {
            console.log('getUserMedia not supported on your browser!');
         }
    }

    handleClick = () => {
        if (this.state.recording === false) {
            this.mediaRecorder.start();
            console.log(this.mediaRecorder.state);
            console.log("recorder started");
            this.state.recording = true;

            let self = this;

        } else {
            this.mediaRecorder.stop();
            console.log(this.mediaRecorder.state);
            console.log("recorder stopped");
            this.state.recording = false;

            console.log("recorder stopped");
          
            const clipName = prompt('Enter a name for your sound clip?','My unnamed clip');
        }
    }

    render() {
        return (
            <div className="Recorder">
                <button role="switch" aria-checked="false" onClick={this.handleClick}>
                <span>Record Audio</span>
                </button>
                <section class="sound-clips">

                </section>
                <MusicPlayer audioData = {this.state.audio} />
            </div>
        )
    }

}