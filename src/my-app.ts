import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { provide } from '@lit/context'; // Import provide
import { authContext, AuthContextData } from './contexts/auth-context.js'; // Import context

// Import components
import './components/header-component.js';
import './components/left-sidebar.js';
import './components/right-sidebar.js';
import './components/main-content.js';
import './components/modal-login-component.js'; // Assuming this is your modal wrapper
import './components/login-form.js';

@customElement('my-app')
export class MyApp extends LitElement {
  // --- State for the Provider ---
  @state() private _isLoggedIn = false;
  @state() private _username: string | null = null;
  @state() private _avatarUrl: string | null = 'https://via.placeholder.com/40'; // Default placeholder

  // --- Provide the context ---
  // The property holds an object matching the AuthContextData interface
  @provide({ context: authContext })
  @state() // Make the provider property itself reactive if needed, though usually updating its contents is enough
  private _authContextData!: AuthContextData; // Initialized in constructor

  // --- Modal State ---
  @state() private _isLoginModalOpen = false;

  // --- Constructor ---
  constructor() {
    super();
    // Initialize context data after methods are bound
    this._authContextData = {
      isLoggedIn: this._isLoggedIn,
      username: this._username,
      avatarUrl: this._avatarUrl,
      login: this._handleLoginSuccess,
      logout: this._handleLogout,
    };
  }

  // --- Styles ---
  static styles = css`
    :host {
      display: block;
      position: relative;
      min-height: 100vh;
    }
    main-content {
      padding-top: 50px; /* Adjusted to header height */
      padding-left: 270px;
      padding-right: 270px;
    }
  `;

  // --- Render ---
  render() {
    // Pass the state down to header-component via properties (Option 1)
    // Alternatively, header-component could consume the context directly (Option 2)
    return html`
      <header-component
        .isLoggedIn=${this._isLoggedIn}
        .username=${this._username ?? 'User'}
        .avatarUrl=${this._avatarUrl ?? 'https://via.placeholder.com/40'}
        @open-login-modal=${this._openLoginModal}
        @logout-request=${this._handleLogout}
      ></header-component>

      <left-sidebar></left-sidebar>
      <main-content></main-content>
      <right-sidebar></right-sidebar>

      <modal-login-component
        .isOpen=${this._isLoginModalOpen}
        @close=${this._closeLoginModal}
      >
        <h2>Login</h2>
        <!-- Listen for login-success from the form -->
        <login-form @login-success=${this._handleLoginSuccess}></login-form>
      </modal-login-component>
    `;
  }

  // --- Context Update Logic ---
  // Method called when login is successful (e.g., from login-form event)
  // Bound method to ensure 'this' is correct when passed in context
  private _handleLoginSuccess = (
    // Expect event detail or direct user data
    eventOrUserData: CustomEvent<{ user: { username: string; avatarUrl?: string } }> | { username: string; avatarUrl?: string }
  ) => {
    let userData: { username: string; avatarUrl?: string };
    if (eventOrUserData instanceof CustomEvent) {
      userData = eventOrUserData.detail.user;
    } else {
      userData = eventOrUserData;
    }

    console.log('MyApp handling login success:', userData);
    this._isLoggedIn = true;
    this._username = userData.username;
    this._avatarUrl = userData.avatarUrl || this._avatarUrl; // Keep placeholder if no avatar provided
    this._updateContextData(); // Update the provided context object
    this._closeLoginModal(); // Close modal on success
  };

  // Method called for logout (e.g., from header-component event)
  // Bound method
  private _handleLogout = () => {
    console.log('MyApp handling logout');
    this._isLoggedIn = false;
    this._username = null;
    this._avatarUrl = 'https://via.placeholder.com/40'; // Reset avatar
    this._updateContextData(); // Update the provided context object
    // Add logic here to clear cookies/tokens by calling backend logout endpoint
  };

  // Helper to update the context data object immutably
  private _updateContextData() {
    this._authContextData = {
      ...this._authContextData, // Keep existing methods (login/logout)
      isLoggedIn: this._isLoggedIn,
      username: this._username,
      avatarUrl: this._avatarUrl,
    };
  }

  // --- Modal Logic ---
  private _openLoginModal() {
    this._isLoginModalOpen = true;
  }

  private _closeLoginModal() {
    this._isLoginModalOpen = false;
  }
}

// Declare global for my-app if not already done
declare global {
  interface HTMLElementTagNameMap {
    'my-app': MyApp;
  }
}