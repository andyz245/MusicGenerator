
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

    componentWillReceiveProps(nextProps) {
        console.log("updated with " + nextProps.audioData);
        console.log(this.props.audioData);
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
        console.log("source is " + this.props.audioData);
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
            console.log("playing");
        }
    }

    render() {
        return (
            <div className="Play">
                <audio src={this.props.audioData} crossorigin="anonymous"></audio>
                <button data-playing="false" role="switch" aria-checked="false" onClick={this.handleClick}>
                <span>Play/Pause</span>
                </button>
            </div>
        )
    }
}