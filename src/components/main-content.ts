import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('main-content')
export class MainContent extends LitElement {
  @state() posts: string[] = [];
  @state() loading = false;

  static styles = css`
    main {
      margin: 0 auto;
      padding: 1rem;
      max-width: 800px;
    }
    .post {
      background-color: #1e1e1e;
      color: white;
      margin-bottom: 1rem;
      padding: 1rem;
      border-radius: 4px;
    }
    .loading {
      text-align: center;
      color: white;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._loadPosts();
    window.addEventListener('scroll', this._handleScroll.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this._handleScroll.bind(this));
  }

  async _loadPosts() {
    if (this.loading) return;
    this.loading = true;

    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newPosts = Array.from({ length: 10 }, (_, i) => `Post ${this.posts.length + i + 1}`);
    this.posts = [...this.posts, ...newPosts];

    this.loading = false;
  }

  _handleScroll() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const bottomPosition = document.body.offsetHeight - 100;

    if (scrollPosition >= bottomPosition) {
      this._loadPosts();
    }
  }

  render() {
    return html`
      <main>
        ${this.posts.map((post) => html`<div class="post">${post}</div>`)}
        ${this.loading ? html`<p class="loading">Loading...</p>` : ''}
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'main-content': MainContent;
  }
}