import { LitElement, html, css } from '@polymer/lit-element'
import {anchorRoute, gotoRoute} from './../Router'
import Auth from './../Auth'
import App from './../App'
import logo from "../../static/images/logo.svg";

customElements.define('va-app-header', class AppHeader extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      title: {
        type: String
      },
      user: {
        type: Object
      },
      editable: {
        type: Boolean
      },
      onTitleChanged: {
        type: Function
      },
      backUrl: {
        type: String
      }
    }
  }

  firstUpdated(){
    super.firstUpdated()
    this.navActiveLinks()    
  }

  navActiveLinks(){	
    const currentPath = window.location.pathname
    const navLinks = this.shadowRoot.querySelectorAll('.app-top-nav a, .app-side-menu-items a')
    navLinks.forEach(navLink => {
      if(navLink.href.slice(-1) == '#') return
      if(navLink.pathname === currentPath){			
        navLink.classList.add('active')
      }
    })
  }

  hamburgerClick(){  
    const appMenu = this.shadowRoot.querySelector('.app-side-menu')
    appMenu.show()
  }
  
  menuClick(e){
    e.preventDefault()
    const pathname = e.target.closest('a').pathname
    const appSideMenu = this.shadowRoot.querySelector('.app-side-menu')
    // hide appMenu
    appSideMenu.hide()
    appSideMenu.addEventListener('sl-after-hide', () => {
      // goto route after menu is hidden
      gotoRoute(pathname)
    })
  }

  handleChange = (e) => {
    if (this.editable && this.onTitleChanged) {
      this.onTitleChanged(e.currentTarget.value);
    }
  }

  render(){    
    return html`
    <style>      
    * {
    box-sizing: border-box;
  }
  .app-header {
    position: fixed;
    top: 0;
    right: 6%;
    left: 6%;
    height: var(--app-header-height);
    color: var(--brand-color);
    display: flex;
    z-index: 9;
    align-items: center;
  }
  
  
  .app-header-main {
    flex-grow: 1;
    display: flex;
    align-items: center;
  }
  
  .app-header-main::slotted(h1){
    color: var(--brand-color);
  }
  
  .app-logo a {
    color: var(--brand-color);
    text-decoration: none;
    font-weight: bold;
    font-size: 2em;
    padding: 2em;
    display: inline-block;        
  }
  
  .app-logo img {
    width: 120px;
  }
  
  .hamburger-btn::part(base) {
    color: var(--brand-color);
  }
  
  .app-top-nav {
    display: flex;
    height: 100%;
    align-items: center;
  }
  
  .app-top-nav a {
    display: flex;
    padding: 0.5em;
    text-decoration: none;
    color: var(--brand-color);
    font-size: 1.5em;
    font-weight: 500;
  }
  
  .app-side-menu-items {
    padding: 20vh 0 10vh 3vw;
  }
  .app-side-menu-items a {
    display: block;
    padding: 1em;
    text-decoration: none;
    font-size: 3.5em;
    color: var(--brand-color);
  }
  
  .app-side-menu-logo {
    width: 400px;
    margin-bottom: 2em;
    position: absolute;
    top: 1em;
    left: 1.5em;
    padding: 5vh 0 10vh 4vw;
  }
  
  .hover-line {
    background-color: var(--brand-color);;
    width: 5%;
    height: 3px;
    border-radius: 5px;  
    position: absolute;
    transition: width 0.3s ease;
    margin-top: 3em;
  }
  .app-header-main:hover > div {
    width: 15%;
  }
  
  .page-title {
    color: var(--app-header-txt-color);
    margin-right: 0.5em;
    font-size: var(--app-header-title-font-size);
    font-weight: var(--app-header-title-font-weight);
  }
  
  .back-button {
    padding: 20px 2em 10px 0;
    cursor: pointer;
  }

  /* active nav links */
  .app-top-nav a.active,
  .app-side-menu-items a.active {
    font-weight: bold;
  }

  .profile-tag {
    color: black;
    font-size: 0.6em;
    margin: 0.5em 1.5em 0 0;
  }

      /* RESPONSIVE - MOBILE ------------------- */
      @media all and (max-width: 768px){       
        
        .app-top-nav {
          display: none;
        }
      }

    </style>

    <header class="app-header">
    <div class="back-button">
      <a href="${this.backUrl}">
        <svg width="42" height="42" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M52 26C52 40.3594 40.3594 52 26 52C11.6406 52 0 40.3594 0 26C0 11.6406 11.6406 0 26 0C40.3594 0 52 11.6406 52 26Z" fill="#F8D57E"/>
          <path d="M37.1668 24.0418H19.4189L27.571 15.8897L25.5002 13.8335L13.8335 25.5002L25.5002 37.1668L27.5564 35.1106L19.4189 26.9585H37.1668V24.0418Z" fill="white"/>
        </svg>
      </a>
    </div>

      
      <div class="app-header-main">
        ${this.title ? 
            this.editable ?
                  html`
                <input class="page-title" style="border: none; background: transparent;" type="text" @change="${this.handleChange}" ?readonly="${!this.editable}" value="${this.title}" />
              `
            : html`<h1 class="page-title">${this.title}</h1>`
            : ""}
        <div class=hover-line></div>
        <slot></slot>
      </div>

      <nav class="app-top-nav">        
        <svg style="font-size: 2.5em; margin: 0.1em 0.5em 0 0; cursor: pointer;" class="hamburger-btn" @click="${this.hamburgerClick}" width="42" height="31" viewBox="0 0 42 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M42 28.5H8M42 15.5H0M42 2.5H16" stroke="#353A46" stroke-width="5"/>
        </svg>
      </nav>
    </header>

    <sl-drawer class="app-side-menu" class="drawer-custom-size" style="--size: 35vw;" placement="right">
      <img class="app-side-menu-logo" src="${logo}">

      <nav class="app-side-menu-items">
        <a href="/stories" @click="${this.menuClick}">Stories</a>
        <a href="/profile" @click="${this.menuClick}">Profile</a>
        <a href="#" @click="${() => Auth.signOut()}">Sign Out</a>
      </nav>  
    </sl-drawer>
    `
  }
  
})

