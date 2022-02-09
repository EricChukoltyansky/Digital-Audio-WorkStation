import { listen } from "express/lib/application";
import * as Tone from "tone";
import {ElementaryPluginRenderer as core, el} from '@elemaudio/core';

function sineTone(t) {
  return el.sin(el.mul(2 * Math.PI, t));
}

core.on('load', function() {
  let tone = sineTone(el.phasor(440));
  core.render(tone);
});

const autoPanner = new Tone.AutoPanner("4n").toDestination().start();

const autoWah = new Tone.AutoWah(50, 6, -30).toDestination();
autoWah.Q.value = 6;

const reverb = new Tone.Reverb(0.4).toDestination();
const delay = new Tone.FeedbackDelay(0.1);

// const chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination().start();

const Synth1 = new Tone.PolySynth().toDestination();
const Synth2 = new Tone.PolySynth().toDestination();
const Synth3 = new Tone.PolySynth().toDestination();
const Synth4 = new Tone.PolySynth().toDestination();
const Synth5 = new Tone.PolySynth().toDestination();
const Synth6 = new Tone.PolySynth().toDestination();
const Synth7 = new Tone.PolySynth().chain(reverb, delay).toDestination();
const Synth8 = new Tone.PolySynth().chain(reverb, delay).toDestination();
const Synth9 = new Tone.PolySynth().chain(reverb, delay).toDestination();
const baseDrum = new Tone.MembraneSynth().toDestination();


export {Synth1, Synth2, Synth3, Synth4, Synth5, Synth6, Synth7, Synth8, Synth9, baseDrum}