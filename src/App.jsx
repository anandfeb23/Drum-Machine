import React, { useState } from "react";
import "./App.css";
import Drum from "./DrumPad";

const audioClips = [
  {
    keyTrigger: "Q",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    description: "Heater 1",
  },
  {
    keyTrigger: "W",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    description: "Heater 2",
  },
  {
    keyTrigger: "E",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    description: "Heater 3",
  },
  {
    keyTrigger: "A",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    description: "Heater 4",
  },
  {
    keyTrigger: "S",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    description: "Clap",
  },
  {
    keyTrigger: "D",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    description: "Open HH",
  },
  {
    keyTrigger: "Z",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    description: "Kick n' Hat",
  },
  {
    keyTrigger: "X",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    description: "Kick",
  },
  {
    keyTrigger: "C",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    description: "Closed HH",
  },
];

function App() {
  const [power, setPower] = useState(true);
  const [volume, setVolume] = useState(1);
  const [bank, setBank] = useState("bank1");

  const playAudio = (e) => {
    if (!power) return;

    const clip = audioClips.find(
      (clip) => clip.keyTrigger === e.key.toUpperCase()
    );
    if (!clip) return;

    const audioElement = document.getElementById(clip.keyTrigger);
    if (audioElement) {
      audioElement.volume = volume; // Set volume
      audioElement.play().catch(console.error);
      document.getElementById("drum-" + clip.keyTrigger)?.focus();
      document.getElementById("display").innerText = clip.description;
    } else {
      console.error(`Audio element with id "${clip.keyTrigger}" not found.`);
    }
  };

  const handlePowerSwitch = () => {
    setPower((prevPower) => !prevPower);
    if (power) {
      // Clear display and stop any playing sound
      document.getElementById("display").innerText = "";
      audioClips.forEach((clip) => {
        const audioElement = document.getElementById(clip.keyTrigger);
        if (audioElement) {
          audioElement.pause();
          audioElement.currentTime = 0;
        }
      });
    }
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const handleBankSwitch = () => {
    setBank((prevBank) => (prevBank === "bank1" ? "bank2" : "bank1"));
  };

  return (
    <div className="container" id="drum-machine" onKeyDown={playAudio}>
      <h1>FCC Drum Machine</h1>
      <div className="controls">
        <button onClick={handlePowerSwitch}>
          {power ? "Power Off" : "Power On"}
        </button>
        <button onClick={handleBankSwitch}>
          {bank === "bank1" ? "Switch to Bank 2" : "Switch to Bank 1"}
        </button>
        <label htmlFor="volume-slider">Volume</label>
        <input
          id="volume-slider"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          disabled={!power}
        />
      </div>
      <div className="whole-drum">
        {audioClips.map((clip) => (
          <Drum
            audioClip={clip}
            key={clip.keyTrigger}
            power={power}
            volume={volume}
          />
        ))}
      </div>
      <div id="display"></div>
    </div>
  );
}

export default App;
