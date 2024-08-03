import React from "react";

const Drum = ({ audioClip, power, volume }) => {
  const playSound = (clip) => {
    if (!power) return;

    const audioElement = document.getElementById(clip.keyTrigger);
    if (audioElement) {
      audioElement.volume = volume;
      audioElement.play().catch(console.error);
      document.getElementById("display").innerText = clip.description;
    } else {
      console.error(`Audio element with id "${clip.keyTrigger}" not found.`);
    }
  };

  return (
    <button
      className="drum-pad"
      id={`drum-${audioClip.keyTrigger}`}
      onClick={() => playSound(audioClip)}
      disabled={!power}
    >
      <audio src={audioClip.url} id={audioClip.keyTrigger} className="clip" />
      {audioClip.keyTrigger}
    </button>
  );
};

export default Drum;
