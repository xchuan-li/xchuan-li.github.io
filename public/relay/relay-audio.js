(() => {
  "use strict";
  let context;
  let muted = localStorage.getItem("relay-muted") === "true";

  function ctx() {
    if (!context) context = new (window.AudioContext || window.webkitAudioContext)();
    if (context.state === "suspended") context.resume();
    return context;
  }

  function tone(frequency, duration, options = {}) {
    if (muted) return;
    const audio = ctx();
    const start = audio.currentTime + (options.delay || 0);
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.type = options.type || "square";
    oscillator.frequency.setValueAtTime(frequency, start);
    if (options.endFrequency) oscillator.frequency.exponentialRampToValueAtTime(options.endFrequency, start + duration);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(options.volume || 0.035, start + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);
  }

  const patterns = {
    click() { tone(510, .055, { volume: .022 }); },
    transmit() {
      tone(260, .13, { endFrequency: 620, type: "sawtooth", volume: .025 });
      tone(740, .07, { delay: .12, volume: .018 });
    },
    receive() {
      tone(440, .08, { type: "sine", volume: .035 });
      tone(660, .11, { delay: .08, type: "sine", volume: .035 });
    },
    success() {
      tone(392, .1, { type: "sine", volume: .04 });
      tone(523, .1, { delay: .09, type: "sine", volume: .04 });
      tone(659, .16, { delay: .18, type: "sine", volume: .04 });
    },
    open() { patterns.success(); },
    warn() {
      tone(420, .09, { volume: .035 });
      tone(560, .09, { delay: .1, volume: .03 });
      tone(420, .12, { delay: .2, volume: .035 });
    },
    confirm() {
      tone(720, .08, { type: "sine", volume: .04 });
      tone(720, .08, { delay: .14, type: "sine", volume: .04 });
    },
    refuse() {
      tone(170, .22, { endFrequency: 115, type: "sawtooth", volume: .035 });
    },
    error() { patterns.refuse(); }
  };

  function updateButtons() {
    document.querySelectorAll("[data-sound-toggle]").forEach(button => {
      button.textContent = muted ? "Sound off" : "Sound on";
      button.setAttribute("aria-pressed", String(!muted));
    });
  }

  window.RelayAudio = {
    play(name) { (patterns[name] || patterns.click)(); },
    toggle() {
      muted = !muted;
      localStorage.setItem("relay-muted", String(muted));
      if (!muted) patterns.receive();
      updateButtons();
    },
    get muted() { return muted; }
  };

  document.addEventListener("click", event => {
    const toggle = event.target.closest("[data-sound-toggle]");
    if (toggle) {
      window.RelayAudio.toggle();
      return;
    }
    if (event.target.closest("button, a")) patterns.click();
  });
  document.addEventListener("DOMContentLoaded", updateButtons);
})();
