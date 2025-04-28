import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('right-sidebar')
export class RightSidebar extends LitElement {
  static styles = css`
    aside {
      background-color: #1e1e1e;
      color: white;
      padding: 1rem;
      width: 250px;
      height: calc(100vh - 60px);
      position: fixed;
      top: 60px;
      right: 0;
      overflow-y: auto;
      box-sizing: border-box;
    }
    h2 {
      margin-top: 0;
    }
  `;

  render() {
    return html`
      <aside>
        <h2>Trending</h2>
        <ul>
          <li>Post 1</li>
          <li>Post 2</li>
          <li>Post 3</li>
        </ul>
      </aside>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'right-sidebar': RightSidebar;
  }
}