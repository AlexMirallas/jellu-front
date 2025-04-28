import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('left-sidebar')
export class LeftSidebar extends LitElement {
  static styles = css`
    aside {
      background-color: #1e1e1e;
      color: white;
      padding: 1rem;
      width: 250px;
      height: calc(100vh - 60px);
      position: fixed;
      top: 60px;
      left: 0;
      overflow-y: auto;
      box-sizing: border-box;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      margin: 0.5rem 0;
    }
    a {
      color: #646cff;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  `;

  render() {
    return html`
      <aside>
        <h2>Subreddits</h2>
        <ul>
          <li><a href="/r/technology">Technology</a></li>
          <li><a href="/r/science">Science</a></li>
          <li><a href="/r/gaming">Gaming</a></li>
          <li><a href="/r/movies">Movies</a></li>
          <li><a href="/r/music">Music</a></li>
        </ul>
      </aside>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'left-sidebar': LeftSidebar;
  }
}