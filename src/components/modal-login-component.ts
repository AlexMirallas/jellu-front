import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('modal-login-component')
export class ModalComponent extends LitElement {
  @property({ type: Boolean, reflect: true }) isOpen = false;

  static styles = css`
    :host {
      display: none; /* Hidden by default */
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6); /* Overlay */
      z-index: 100;
      justify-content: center;
      align-items: center;
    }

    /* Show when isOpen is true */
    :host([isOpen]) {
      display: flex;
    }

    .modal-content {
      background-color: #2f2f2f; /* Darker background for modal */
      padding: 2rem;
      border-radius: 8px;
      position: relative;
      min-width: 300px;
      max-width: 90%;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }

    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #aaa;
      cursor: pointer;
    }
    .close-button:hover {
      color: white;
    }
  `;

  render() {
    return html`
      <div class="modal-overlay" @click=${this._handleOverlayClick}>
        <div class="modal-content">
          <button class="close-button" @click=${this.close}>&times;</button>
          <slot></slot> <!-- Content goes here -->
        </div>
      </div>
    `;
  }

  private _handleOverlayClick(e: Event) {
    // Close only if clicking directly on the overlay, not the content inside
    if (e.target === this.shadowRoot?.querySelector('.modal-overlay')) {
      this.close();
    }
  }

  close() {
    this.isOpen = false;
    // Dispatch an event so the parent component knows the modal closed
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'modal-component': ModalComponent;
  }
}