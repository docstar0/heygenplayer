/* eslint-disable */
/* @ts-nocheck */
console.log('[heygen-loader2] loader file loaded');

(function(){
  // 🔗 Your GitHub Pages bundle URL:
  const BUNDLE_URL = 'https://docstar0.github.io/heygenplayer/heygen-player.umd.js';

  function loadExternalOnce(src){
    return new Promise((resolve, reject) => {
      const id = 'heygen-player-external2';
      if (document.getElementById(id)) {
        console.log('[heygen-loader2] external script already present');
        return resolve();
      }
      console.log('[heygen-loader2] injecting external script', src);
      const s = document.createElement('script');
      s.id = id;
      s.src = src;
      s.async = true;
      s.defer = true;
      s.onload = () => {
        console.log('[heygen-loader2] external bundle loaded');
        if (window.HeyGenPlayer) {
          console.log('[heygen-loader2] ✅ window.HeyGenPlayer found!');
          resolve();
        } else {
          console.error('[heygen-loader2] ❌ window.HeyGenPlayer still missing after load');
          reject(new Error('HeyGenPlayer not attached to window'));
        }
      };
      s.onerror = () => {
        console.error('[heygen-loader2] ❌ failed to load external bundle');
        reject(new Error('Failed to load external bundle: ' + src));
      };
      document.head.appendChild(s);
    });
  }

  // Placeholder CE shown immediately; upgraded when external bundle defines HeyGenPlayer
  class HeygenPlaceholder2 extends HTMLElement {
    constructor(){
      super();
      this.attachShadow({mode:'open'});
      this.shadowRoot.innerHTML = `
        <style>
          :host { display:block; min-height:300px; background:#000; color:#9ee; outline:2px dashed #4ade80; }
          .box { height:100%; display:flex; align-items:center; justify-content:center; font:14px system-ui; }
        </style>
        <div class="box">⏳ Loading HeyGen player (loader2)…</div>
      `;
      loadExternalOnce(BUNDLE_URL)
        .then(() => {
          console.log('[heygen-loader2] upgrading <heygen-player> element now…');
          // Replace placeholder with real CE logic (if defined in bundle)
          if (window.HeyGenPlayer && window.HeyGenPlayer.create) {
            console.log('[heygen-loader2] HeyGenPlayer.create available');
            // At this point, Wix page code can call into window.HeyGenPlayer
          } else {
            console.warn('[heygen-loader2] window.HeyGenPlayer present but no create()');
          }
        })
        .catch(err => {
          this.shadowRoot.innerHTML =
            `<div style="padding:12px;background:#200;color:#f99;border:1px solid #400;font:12px system-ui">
              ❌ Loader2 error: ${err && err.message || err}
             </div>`;
        });
    }
  }

  try {
    console.log('[heygen-loader2] defining heygen-player (placeholder2)');
    customElements.define('heygen-player', HeygenPlaceholder2);
    console.log('[heygen-loader2] placeholder2 defined');
  } catch (e) {
    console.error('[heygen-loader2] define placeholder failed:', e);
  }
})();
