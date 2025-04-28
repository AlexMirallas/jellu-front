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

   private async _handleSubmit(e: Event) {
    e.preventDefault();
    console.log('Logging in with:', { username: this.username, password: this.password });
    try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include cookies in the request
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });
  
        if (!response.ok) {
          const error = await response.json();
          this.errorMessage = error.message || 'Login failed';
          return;
        }
  
        const data = await response.json();
        console.log('Login successful:', data);
        this.errorMessage = '';
  // Redirect or update UI after successful login
      } catch (error) {
        console.error('Error during login:', error);
        this.errorMessage = 'An error occurred. Please try again.';
      }
    // Add logic to send login request to the backend
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'login-form': LoginForm;
  }
}