import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import UserAPI from '../../UserAPI'
import Toast from '../../Toast'
import { RandomiseAnimation } from "../../animations/animation"

class GuideView {
  init(){
    document.title = 'Guide'    
    this.render()    
    Utils.pageIntroAnim()
  }

  async updateCurrentUser(e){
    e.preventDefault()
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')
    try{
      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, { newUser: false}, 'json')
      console.log('user updated')
      console.log(updatedUser)
      const submitBtn = document.querySelector('.submit-btn')
    }catch(err){
      Toast.show(err, 'error')
    }
    submitBtn.removeAttribute('loading')
  }

  render(){
    const template = html`
      <div class="calign">
        <div class="carousel">
          <div class="guide-left-arrow" @click=${() => gotoRoute('/')}>
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle r="26" transform="matrix(1 8.74228e-08 8.74228e-08 -1 26 26)" fill="white"/>
              <path d="M37.1673 28.1247L19.4194 28.1247L27.5715 36.2768L25.5007 38.333L13.834 26.6663L25.5007 14.9997L27.5569 17.0559L19.4194 25.208L37.1673 25.208L37.1673 28.1247Z" fill="#353A46"/>
            </svg>
          </div>
          <div class="guide-left-right" @click=${() => gotoRoute('/guide3')}>
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle r="26" transform="matrix(-1 0 0 1 26 26)" fill="white"/>
            <path d="M14.8327 24.0418H32.5806L24.4285 15.8897L26.4993 13.8335L38.166 25.5002L26.4993 37.1668L24.4431 35.1106L32.5806 26.9585H14.8327V24.0418Z" fill="#353A46"/>
          </svg>
          </div>
          <div class="guide-box">
            <div class="guide-box-left">
              <div class="icon-n-label">
                <svg width="48" height="48" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5 0C2.23858 0 0 2.23858 0 5V29C0 31.7614 2.23858 34 5 34H29C31.7614 34 34 31.7614 34 29V5C34 2.23858 31.7614 0 29 0H5ZM12 9C12 10.6569 10.6569 12 9 12C7.34315 12 6 10.6569 6 9C6 7.34315 7.34315 6 9 6C10.6569 6 12 7.34315 12 9ZM28 9C28 10.6569 26.6569 12 25 12C23.3431 12 22 10.6569 22 9C22 7.34315 23.3431 6 25 6C26.6569 6 28 7.34315 28 9ZM9 28C10.6569 28 12 26.6569 12 25C12 23.3431 10.6569 22 9 22C7.34315 22 6 23.3431 6 25C6 26.6569 7.34315 28 9 28ZM28 25C28 26.6569 26.6569 28 25 28C23.3431 28 22 26.6569 22 25C22 23.3431 23.3431 22 25 22C26.6569 22 28 23.3431 28 25ZM17 20C18.6569 20 20 18.6569 20 17C20 15.3431 18.6569 14 17 14C15.3431 14 14 15.3431 14 17C14 18.6569 15.3431 20 17 20Z" fill="#424C70"/>
                </svg>
                <h1>Randomise Characters</h1> 
              </div>
              <div class="guide-para">
                <p>You can either edit your character to fit what you imagined or let us do the work by pressing the randomise button</p>
              </div>
            </div>
            <div class="guide-box-right">
              <div class="animation-container">
                <div id="foo" class="guide2-ani"></div>
              </div>
            </div>
          </div>
          <div class="carousel-nav">
            <span class="carousel-btn" @click=${() => gotoRoute('/')}></span>
            <span class="carousel-btn carousel-btn--selected"></span>
            <span class="carousel-btn" @click=${() => gotoRoute('/guide3')}></span>
          </div>
        </div>
      
        <sl-button size="large" type="primary" class="submit-btn" @click=${() => gotoRoute('/signin')}>Okay got it!</sl-button>
        <sl-button size="large" type="primary" class="submit-btn" @click=${this.updateCurrentUser.bind(this)}>Don't show again</sl-button>
      </div>      
    `
    render(template, App.rootEl);
    const foo = document.getElementById("foo");
    RandomiseAnimation(foo);
    render(template, App.rootEl)
  }
}


export default new GuideView()