// wrapper.js
import StreamingAvatar from './heygen-player.umd.js';

class HeygenPlayerElement extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    const container = document.createElement('div');
    container.id = "heygen-container";
    this.shadowRoot.appendChild(container);

    // Initialize the avatar
    this.avatar = new StreamingAvatar({
      container,
      sdkToken: this.getAttribute('sdk-token'),
      avatarId: this.getAttribute('avatar-id'),
      kbId: this.getAttribute('kb-id'),
    });

    // Example: listen for avatar events
    this.avatar.on('speech-start', () => {
      console.log('Avatar started speaking');
    });
    this.avatar.on('speech-end', () => {
      console.log('Avatar finished speaking');
    });
  }
}

if (!customElements.get('heygen-player')) {
  customElements.define('heygen-player', HeygenPlayerElement);
}
