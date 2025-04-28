import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

// Import all necessary components
import './components/header-component.js';
import './components/left-sidebar.js';
import './components/right-sidebar.js';
import './components/main-content.js';
import './components/modal-login-component.js';
import './components/login-form.js'; 

@customElement('my-app')
export class MyApp extends LitElement {
  @state() private _isLoginModalOpen = false;

  static styles = css`
    :host {
      display: block;
      /* Ensure layout context for fixed/sticky elements */
      position: relative;
      min-height: 100vh;
    }
    /* Add global layout adjustments if needed */
    main-content {
      padding-top: 60px; /* Header height */
      padding-left: 270px; /* Left sidebar width + space */
      padding-right: 270px; /* Right sidebar width + space */
    }
  `;

  render() {
    return html`
      <header-component @open-login-modal=${this._openLoginModal}></header-component>

      <left-sidebar></left-sidebar>
      <main-content></main-content>
      <right-sidebar></right-sidebar>

      <modal-login-component
        .isOpen=${this._isLoginModalOpen}
        @close=${this._closeLoginModal}
      >
        <h2>Login</h2>
        <login-form @login-success=${this._closeLoginModal}></login-form>
        <!-- Add @login-success listener if login-form dispatches it -->
      </modal-login-component>
    `;
  }

  private _openLoginModal() {
    this._isLoginModalOpen = true;
  }

  private _closeLoginModal() {
    this._isLoginModalOpen = false;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-app': MyApp;
  }
}