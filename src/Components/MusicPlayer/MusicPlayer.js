
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './MusicPlayer.css';

export default class MusicPlayer extends Component {

    audioElement = null;
    audioContext = new AudioContext();

    constructor(props) {
        super(props);

        this.state = {
            playing: false
          };
    }

    componentDidMount() {
        // get the audio element
        this.audioElement = document.querySelector('audio');
    
        // pass it into the audio context
        var track = this.audioContext.createMediaElementSource(this.audioElement);  
    
        track.connect(this.audioContext.destination);
    }

    handleClick = () => {
        console.log(this.audioElement);
        // check if context is in suspended state (autoplay policy)
        if (this.audioContext.state === 'suspended') {
            console.log("Here");
            this.audioContext.resume();
        }

        console.log(this.audioContext);

        // play or pause track depending on state
        console.log(this.state.playing);
        if (this.state.playing) {
            this.audioElement.pause();
            this.state.playing = false;
        } else {
            this.audioElement.play();
            this.state.playing = true;
        }
    }

    render() {
        return (
            <div className="Play">
                <audio src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/858/outfoxing.mp3" crossorigin="anonymous"></audio>
                <button data-playing="false" role="switch" aria-checked="false" onClick={this.handleClick}>
                <span>Play/Pause</span>
                </button>
            </div>
        )
    }
}