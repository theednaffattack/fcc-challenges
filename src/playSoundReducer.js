import Sound from "react-sound";

import { bankOne } from "./bankOne";

// console.log(JSON.stringify(bankOne, null, 2));
// console.log(bankOne.filter(sound => sound.keyValue === "Q"));

import Heater1 from "./audio/bankOne/Heater-1.mp3";
import Heater_2 from "./audio/bankOne/Heater-2.mp3";
import Heater_3 from "./audio/bankOne/Heater-3.mp3";
import Heater_4 from "./audio/bankOne/Heater-4_1.mp3";
import Heater_6 from "./audio/bankOne/Heater-6.mp3";
import Cev_H2 from "./audio/bankOne/Cev_H2.mp3";
import Dsc_Oh from "./audio/bankOne/Dsc_Oh.mp3";
import Kick_n_Hat from "./audio/bankOne/Kick_n_Hat.mp3";
import RP4_KICK_1 from "./audio/bankOne/RP4_KICK_1.mp3";

export let playSoundReducer = event => {
  event.preventDefault();

  let { key } = event;

  switch (key.toUpperCase()) {
    case "Q":
      this.setState(
        (prevState, props) => ({
          keyPressed: key,
          currentSong: Heater1,
          playStatus: "PLAYING"
        }),
        () => {
          this.audioRef.currentTime = 0;
          this.audioRef.play().catch(error => console.log(error.message));
        }
      );
      break;
    case "W":
      this.setState(
        () => ({
          keyPressed: key,
          currentSong: Heater_2,
          playStatus: "PLAYING"
        }),
        () => {
          this.audioRef.currentTime = 0;
          this.audioRef.play().catch(error => console.log(error.message));
        }
      );
      break;
    case "E":
      this.setState(
        () => ({
          keyPressed: key,
          currentSong: Heater_3,
          playStatus: "PLAYING"
        }),
        () => {
          this.audioRef.currentTime = 0;
          this.audioRef.play().catch(error => console.log(error.message));
        }
      );
      break;
    case "A":
      this.setState(
        (state, props) => ({
          keyPressed: key,
          currentSong: Heater_4,
          playStatus: "PLAYING"
        }),
        () => {
          this.audioRef.currentTime = 0;
          this.audioRef.play().catch(error => console.log(error.message));
        }
      );
      break;
    case "S":
      this.setState(
        (state, props) => ({
          keyPressed: key,
          currentSong: Heater_6,
          playStatus: "PLAYING"
        }),
        () => {
          this.audioRef.currentTime = 0;
          this.audioRef.play().catch(error => console.log(error.message));
        }
      );
      break;
    case "D":
      this.setState(
        () => ({
          keyPressed: key,
          currentSong: Cev_H2,
          playStatus: "PLAYING"
        }),
        () => {
          this.audioRef.currentTime = 0;
          this.audioRef.play().catch(error => console.log(error.message));
        }
      );
      break;
    case "Z":
      this.setState(
        () => ({
          keyPressed: key,
          currentSong: Dsc_Oh,
          playStatus: "PLAYING"
        }),
        () => {
          this.audioRef.currentTime = 0;
          this.audioRef.play().catch(error => console.log(error.message));
        }
      );
      break;
    case "X":
      this.setState(
        () => ({
          keyPressed: key,
          currentSong: Kick_n_Hat,
          playStatus: "PLAYING"
        }),
        () => {
          this.audioRef.currentTime = 0;
          this.audioRef.play().catch(error => console.log(error.message));
        }
      );
      break;
    case "C":
      this.setState(
        () => ({
          keyPressed: key,
          currentSong: RP4_KICK_1,
          playStatus: "PLAYING"
        }),
        () => {
          this.audioRef.currentTime = 0;
          this.audioRef.play().catch(error => console.log(error.message));
        }
      );
      break;

    default:
      this.setState(() => ({
        keyPressed: "",
        currentSong: "",
        playStatus: "PAUSED"
      }));
      break;
  }
};
