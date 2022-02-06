import * as Tone from "tone";

const pluckSynth1 = new Tone.PluckSynth().toDestination();
const pluckSynth2 = new Tone.PluckSynth().toDestination();
const pluckSynth3 = new Tone.PluckSynth().toDestination();
const baseDrum = new Tone.MembraneSynth().toDestination();


export {pluckSynth1, pluckSynth2, pluckSynth3, baseDrum}