// wrapper.js
//
// Custom Element wrapper around heygen-player.umd.js
// Loads HeyGen bundle + attaches ALL SDK events

(function () {
  // ---------------------------
  // Polyfills
  // ---------------------------
  if (!window.Buffer) {
    window.Buffer = {
      from: (input, encoding) => {
        if (typeof input === "string") {
          if (encoding === "base64") {
            const binary = atob(input);
            const len = binary.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
            return bytes;
          }
          return new TextEncoder().encode(input);
        }
        if (Array.isArray(input)) return new Uint8Array(input);
        return input;
      }
    };
  }

  async function loadHeygenScript() {
    if (window.HeygenPlayer) return;
    await new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://docstar0.github.io/heygenplayer/heygen-player.umd.js"; // hosted UMD bundle
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  // ---------------------------
  // CE wrapper
  // ---------------------------
  class HeygenPlayerElement extends HTMLElement {
    async connectedCallback() {
      try {
        await loadHeygenScript();

        const container = document.createElement("div");
        container.id = "heygen-container";
        container.style.width = "100%";
        container.style.height = "100%";
        this.appendChild(container);

        const token = this.getAttribute("sdk-token");
        const avatarId = this.getAttribute("avatar-id");
        const kbId = this.getAttribute("kb-id");

        if (!window.HeygenPlayer) {
          console.error("[wrapper] HeygenPlayer not found on window");
          container.innerText = "Error loading Heygen Player.";
          return;
        }

        this._player = new window.HeygenPlayer({
          token,
          avatarId,
          kbId,
          container
        });

        console.log("[wrapper] Heygen player initialized");

        this.bindAllEvents(this._player);

      } catch (e) {
        console.error("[wrapper] Failed to load Heygen Player:", e);
        this.innerHTML = "<div style='color:red'>Failed to load player.</div>";
      }
    }

    // ---------------------------
    // Bind ALL SDK events
    // ---------------------------
    bindAllEvents(player) {
      const allEvents = [
        "onReady",
        "onError",
        "onDisconnected",
        "onSpeechStart",
        "onSpeechEnd",
        "onUserJoin",
        "onUserLeave",
        "onTaskCreated",
        "onTaskCompleted",
        "onTaskError",
        "onMessage",
        "onTrackStart",
        "onTrackEnd",
        "onTrackError",
        "onStreamStart",
        "onStreamStop",
        "onConnectionQualityChange"
      ];

      allEvents.forEach(ev => {
        if (typeof player[ev] === "function") {
          player[ev]((...args) => {
            console.log(`[Heygen SDK Event] ${ev}`, ...args);
            this.dispatchEvent(new CustomEvent(ev, { detail: args }));
          });
        }
      });
    }
  }

  if (!customElements.get("heygen-player")) {
    customElements.define("heygen-player", HeygenPlayerElement);
  }
})();
