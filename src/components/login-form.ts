import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('login-form')
export class LoginForm extends LitElement {
  @property({ type: String }) username = '';
  @property({ type: String }) password = '';
  @property({type: String}) errorMessage = '';

  static styles = css`
    form {
      display: flex;
      flex-direction: column;
      max-width: 300px;
      margin: 2rem auto;
    }
    input {
      margin-bottom: 1rem;
      padding: 0.5rem;
      font-size: 1rem;
    }
    button {
      padding: 0.5rem;
      font-size: 1rem;
      background-color: #646cff;
      color: white;
      border: none;
      cursor: pointer;
    }
    button:hover {
      background-color: #535bf2;
    }
  `;

  private async _handleSubmit(e: Event) {
    e.preventDefault();
    this.errorMessage = ''; // Clear previous errors

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          username: this.username, 
          password: this.password,
        }),
      });

      const data = await response.json(); // Always try to parse JSON

      if (!response.ok) {
        this.errorMessage = data.message || 'Login failed';
        return;
      }

      console.log('Login successful:', data);

      // --- Dispatch success event with user data ---
      this.dispatchEvent(new CustomEvent('login-success', {
        detail: {
          // Assuming the backend login response includes user info
          // Adjust based on your actual API response structure
          user: data.user || { username: this.username /* fallback */ }
        },
        bubbles: true,
        composed: true,
      }));
      // --- ---

    } catch (error) {
      console.error('Error during login:', error);
      this.errorMessage = 'An error occurred. Please try again.';
    }
  }

  render() {
    return html`
      <form @submit=${this._handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          .value=${this.username}
          @input=${(e: Event) => (this.username = (e.target as HTMLInputElement).value)}
        />
        <input
          type="password"
          placeholder="Password"
          .value=${this.password}
          @input=${(e: Event) => (this.password = (e.target as HTMLInputElement).value)}
        />
        <button type="submit">Login</button>
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'login-form': LoginForm;
  }
}