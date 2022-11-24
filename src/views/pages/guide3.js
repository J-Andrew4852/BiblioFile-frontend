import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import UserAPI from '../../UserAPI'
import Toast from '../../Toast'
import { EditAnimation } from "../../animations/animation"


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
          <div class="guide-left-arrow" @click=${() => gotoRoute('/guide2')}>
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle r="26" transform="matrix(1 8.74228e-08 8.74228e-08 -1 26 26)" fill="white"/>
              <path d="M37.1673 28.1247L19.4194 28.1247L27.5715 36.2768L25.5007 38.333L13.834 26.6663L25.5007 14.9997L27.5569 17.0559L19.4194 25.208L37.1673 25.208L37.1673 28.1247Z" fill="#353A46"/>
            </svg>
          </div>
          <div class="guide-left-right" @click=${() => gotoRoute('/')}>
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle r="26" transform="matrix(-1 0 0 1 26 26)" fill="white"/>
            <path d="M14.8327 24.0418H32.5806L24.4285 15.8897L26.4993 13.8335L38.166 25.5002L26.4993 37.1668L24.4431 35.1106L32.5806 26.9585H14.8327V24.0418Z" fill="#353A46"/>
          </svg>
          </div>
          <div class="guide-box">
            <div class="guide-box-left">
              <div class="icon-n-label">
                <svg width="24" height="24" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 26.9176V34H7.08235L27.9706 13.1118L20.8882 6.02944L0 26.9176ZM33.4476 7.63477C34.1841 6.89821 34.1841 5.70837 33.4476 4.97181L29.0282 0.552423C28.2916 -0.184141 27.1018 -0.184141 26.3652 0.552423L22.909 4.00861L29.9914 11.091L33.4476 7.63477V7.63477Z" fill="#424C70"/>
                </svg>
                <h1>Create Stories</h1> 
              </div>
              <div class="guide-para">
                <p>Edit everything from the character’s personality traits to what motivates them</p>
                <p>Click the pen icon to edit components </p>
              </div>
            </div>
            <div class="guide-box-right">
              <div class="animation-container">
                <div id="foo" class="guide3-ani"></div>
              </div>
            </div>
          </div>
          <div class="carousel-nav">
            <span class="carousel-btn" @click=${() => gotoRoute('/')}></span>
            <span class="carousel-btn" @click=${() => gotoRoute('/guide2')}></span>
            <span class="carousel-btn carousel-btn--selected"></span>
          </div>
        </div>
      
        <sl-button type="primary" @click=${() => gotoRoute('/signin')}>Okay got it!</sl-button>
        <sl-button type="primary" class="submit-btn" @click=${this.updateCurrentUser.bind(this)}>Don't show again</sl-button>
      </div>      
    `
    render(template, App.rootEl);
    const foo = document.getElementById("foo");
    EditAnimation(foo);
    render(template, App.rootEl)
  }
}


export default new GuideView()