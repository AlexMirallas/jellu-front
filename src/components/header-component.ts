import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('header-component')
export class HeaderComponent extends LitElement {
  // --- Properties ---
  // These would typically be passed down from a parent component (like my-app)
  // or managed by a state management solution.
  @property({ type: Boolean }) isLoggedIn = false; // Default to logged out
  @property({ type: String }) username = 'User';
  @property({ type: String }) avatarUrl = 'https://via.placeholder.com/40'; // Placeholder avatar

  // --- Styles ---
  static styles = css`
    :host {
      display: block; /* Ensures the component takes up block space */
      width: 100%;
    }

    header {
      background-color: #1a1a1b; /* Reddit-like dark header */
      color: #d7dadc; /* Light text color */
      padding: 0 1rem; /* Padding left/right */
      height: 50px; /* Fixed height */
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #343536; /* Subtle border */
      box-sizing: border-box;
    }

    .header-left {
      display: flex;
      align-items: center;
    }

    .logo-link {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: inherit; /* Inherit text color */
      margin-right: 1.5rem; /* Space between logo and search */
    }

    .logo {
      /* Add your logo styles here if you have one */
      height: 30px;
      margin-right: 0.5rem;
      /* background-color: #ff4500; /* Example placeholder */
      /* border-radius: 50%; */
    }

    .site-name {
      font-size: 1.2rem;
      font-weight: bold;
    }

    .header-center {
      flex-grow: 1; /* Allows search bar to take available space */
      max-width: 600px; /* Limit search bar width */
      margin: 0 1rem; /* Spacing around search bar */
    }

    .search-bar {
      width: 100%;
      padding: 0.5rem 1rem;
      border-radius: 20px; /* Rounded search bar */
      border: 1px solid #343536;
      background-color: #272729;
      color: #d7dadc;
      font-size: 0.9rem;
      outline: none;
    }
    .search-bar:focus {
      border-color: #d7dadc;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 1rem; /* Spacing between items */
    }

    .login-button, .icon-button {
      background-color: transparent;
      color: #d7dadc;
      border: 1px solid #d7dadc;
      padding: 0.4rem 1rem;
      border-radius: 20px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: bold;
      transition: background-color 0.2s, color 0.2s;
    }
    .login-button:hover, .icon-button:hover {
      background-color: #272729;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer; /* Maybe opens a dropdown later */
    }

    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid #343536;
    }

    .username {
      font-size: 0.9rem;
      font-weight: 500;
    }

    /* Basic icon styling (replace with actual icons later) */
    .icon-button::before {
      /* Placeholder for icons */
      content: '🔔'; /* Example: Bell for notifications */
      margin-right: 0.3rem;
      font-size: 1.1em;
    }
    .chat-button::before {
      content: '💬'; /* Example: Speech bubble for chat */
    }
  `;

  // --- Template ---
  render() {
    return html`
      <header>
        <!-- Left Section: Logo + Name -->
        <div class="header-left">
          <a href="/" class="logo-link" @click=${this._handleLinkClick}>
            <img src="/path/to/logo.svg" alt="Jellu Logo" class="logo">
            <div class="site-name">Jellu</div>
          </a>
        </div>

        <!-- Center Section: Search Bar -->
        <div class="header-center">
          <input
            type="search"
            class="search-bar"
            placeholder="Search Jellu"
            @input=${this._handleSearchInput}
            @keypress=${this._handleSearchEnter}
          />
        </div>

        <!-- Right Section: Auth/User Info -->
        <div class="header-right">
          ${this.isLoggedIn
            ? html`
                <button class="icon-button notifications-button" @click=${this._handleNotificationsClick} title="Notifications"></button>
                <button class="icon-button chat-button" @click=${this._handleChatClick} title="Chat"></button>
                <div class="user-info" @click=${this._handleUserMenuClick}>
                  <img src=${this.avatarUrl} alt="User Avatar" class="avatar">
                  <span class="username">${this.username}</span>
                  <!-- Add dropdown icon later? -->
                </div>
              `
            : html`
                <button class="login-button" @click=${this._handleLoginClick}>
                  Log In
                </button>
              `}
        </div>
      </header>
    `;
  }

  // --- Event Handlers ---
  private _handleLinkClick(e: Event) {
    // Basic SPA navigation handling (prevents full page reload)
    // You might use a router later for more robust handling
    e.preventDefault();
    window.history.pushState({}, '', '/');
    // Dispatch an event if needed for the router
    this.dispatchEvent(new PopStateEvent('popstate'));
  }

  private _handleSearchInput(e: InputEvent) {
    const query = (e.target as HTMLInputElement).value;
    // console.log('Search query:', query);
    // Implement search logic or dispatch event
  }

  private _handleSearchEnter(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      const query = (e.target as HTMLInputElement).value;
      console.log('Perform search for:', query);
      // Implement search submission
    }
  }

  private _handleLoginClick() {
    // Dispatch event for the parent component (my-app) to handle
    this.dispatchEvent(new CustomEvent('open-login-modal', { bubbles: true, composed: true }));
  }

  private _handleNotificationsClick() {
    console.log('Navigate to notifications/activity');
    // window.location.href = '/activity'; // Or use router/dispatch event
  }

  private _handleChatClick() {
    console.log('Open chat module');
    // Dispatch event to open chat
  }

  private _handleUserMenuClick() {
    console.log('Open user dropdown menu');
    // Implement dropdown logic
  }
}

// --- TypeScript Declaration ---
// Ensures TypeScript knows about the custom element tag name
declare global {
  interface HTMLElementTagNameMap {
    'header-component': HeaderComponent;
  }
}