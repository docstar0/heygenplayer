/* eslint-disable */
/* @ts-nocheck */
console.log('[heygen-loader2] loader file loaded');

(function(){
  // 🔗 Test GitHub Pages bundle URL:
  const BUNDLE_URL = 'https://docstar0.github.io/heygenplayer/heygen-player.umd.js';

  function loadExternalOnce(src){
    return new Promise((resolve, reject) => {
      const id = 'heygen-player-external2';
      if (document.getElementById(id)) return resolve();
      const s = document.createElement('script');
      s.id = id;
      s.src = src;
      s.async = true;
      s.defer = true;
      s.onload = () => { 
        console.log('[heygen-loader2] external bundle loaded'); 
        resolve(); 
      };
      s.onerror = () => reject(new Error('Failed to load external bundle: ' + src));
      document.head.appendChild(s);
    });
  }

  // Placeholder CE
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
      loadExternalOnce(BUNDLE_URL).catch(err => {
        this.shadowRoot.innerHTML = '<div style="padding:12px;background:#200;color:#f99;border:1px solid #400;font:12px system-ui">❌ ' +
          (err && err.message || err) + '</div>';
      });
    }
  }

  try {
    console.log('[heygen-loader2] defining heygen-player2 (placeholder)');
    customElements.define('heygen-player2', HeygenPlaceholder2);
    console.log('[heygen-loader2] placeholder defined');
  } catch (e) {
    console.error('[heygen-loader2] define placeholder failed:', e);
  }
})();
