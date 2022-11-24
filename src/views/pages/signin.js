import App from './../../App'
import {html, render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class SignInView {
  init(){
    console.log('SignInView.init')
    document.title = 'Sign In'
    this.render()
    Utils.pageIntroAnim()
  }

  signInSubmitHandler(e){
    e.preventDefault()
    const formData = e.detail.formData
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    
    // sign in using Auth    
    Auth.signIn(formData, () => {
      submitBtn.removeAttribute('loading')
    })
  }

  render(){    
    const template = html`      
      
        <div class="signsplit">
        <div class="splitleft">
          <h1>BiblioFile</h1>
        </div>
          <div class="splitright">
            <div class="sign-back-label" @click=${() => gotoRoute(`/`)}>
              <svg class="sign-back-arrow "width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M52 26C52 40.3594 40.3594 52 26 52C11.6406 52 0 40.3594 0 26C0 11.6406 11.6406 0 26 0C40.3594 0 52 11.6406 52 26Z" fill="#F8D57E"/>
                <path d="M37.1667 24.0416H19.4188L27.5709 15.8895L25.5 13.8333L13.8334 25.4999L25.5 37.1666L27.5563 35.1103L19.4188 26.9583H37.1667V24.0416Z" fill="white"/>
              </svg>
            </div>
            <div class="signinup-box">
              <h1>Sign In</h1>          
              <sl-form class="form-signup dark-theme" @sl-submit=${this.signInSubmitHandler}>          
                <div class="input-group">
                  <sl-input name="email" type="email" placeholder="Email" size="large" required></sl-input>
                </div>
                <div class="input-group">
                  <sl-input name="password" type="password" placeholder="Password" size="large" required toggle-password></sl-input>
                </div>
                <sl-button class="submit-btn" type="primary" size="large" submit style="width: 100%; font-size:2em;">Sign In</sl-button>
              </sl-form>
              <p style="font-size:1.5em;"> No Account? <a href="/signup" @click=${anchorRoute}>Sign Up</a></p>
            </div>
          </div>
        </div>
      
    `
    render(template, App.rootEl)    
  }
}

export default new SignInView()