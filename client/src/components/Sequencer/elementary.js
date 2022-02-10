// Welcome to the starting template! Follow along with the comments below
// to get a brief sense of working with Elementary. Documentation is available
// here: https://docs.elementary.audio/
import {ElementaryWebAudioRenderer as core, el} from 'https://cdn.skypack.dev/@nick-thompson/elementary@v0.10.8';

const ctx = new (window.AudioContext || window.webkitAudioContext)();

// After we've imported and set up our context, we install a load event listener
// so that once the audio backend is ready we can kick off our render
core.on('load', function() {
  // Before actually rendering anything we put a click handler on the button so that
  // this example doesn't start making noise automatically
  document.getElementById('clickMe').addEventListener('click', async function(e) {
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    // Finally we render a tiny arpeggio example with sine tones. Start here
    // to remix and explore Elementary!
    let arp = [1, 5, 7, 8, 10, 12, 8, 7, 5].map(x => 440 * Math.pow(2, (x - 1) / 12));
    let env = el.adsr(0.008, 0.25, 0, 0, el.train(7));

    core.render(
      el.mul(0.25, env, el.cycle(el.seq({seq: arp}, el.train(7)))),
      el.mul(0.25, env, el.cycle(el.seq({seq: arp}, el.train(7)))),
    );
  });
});

// After installing our load event handler, we initialize the core renderer
// which will spin up the audio backend with the web audio context and fire
// our load event above when ready.
(async function main() {
  let node = await core.initialize(ctx, {
    numberOfInputs: 0,
    numberOfOutputs: 1,
    outputChannelCount: [2],
  });

  node.connect(ctx.destination);
})();