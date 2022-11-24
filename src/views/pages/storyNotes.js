import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import { get, post } from "../../Utils"


function debounce(func, timeout) {
  let handler = null;
  return (...args) => {
    if (handler) {
      clearTimeout(handler);
    }
    handler = setTimeout(() => func(...args), timeout);
  }
}

class StoryNotesView {
  async init(){
    document.title = 'Story Notes'    
    this.render()    
    Utils.pageIntroAnim()
    this.storyId = new URLSearchParams(window.location.search).get("story_id");
    this.note = (await (await get(`/story/${this.storyId}/note`)).json()).body;
    this.render();
  }

  saveNote = async (event) => {
    const text = event.target.value;
    const response = await post(`/story/${this.storyId}/note`, JSON.stringify({ note: text }));
    if (response.status === 200) {
      // alert("Saved ok");
    }
  }

  render(){
    const template = html`
      <va-app-header title="Story Notes" user="${JSON.stringify(Auth.currentUser)}" backUrl="/stories"></va-app-header>
      <div class="page-content">        
        <div class="sub-nav">
          <div class="csubnav point" @click=${() => gotoRoute(`/story?story_id=${this.storyId}`)}><h2>Characters</h2><div class="hover-line"></div></div>
          <div class="nsubnav"><h2>Notes</h2><div class="nstatic-line"></div></div>
        </div>
        <div class="notes-area">
          <div class="notes-top-bar fit1">
            <div class="divider-line"></div>
          </div>
          <sl-textarea @input=${debounce(this.saveNote, 600)} class="notes-section" value="${this.note}" resize="auto" placeholder="Start writing here..." size="large" rows="30"></sl-textarea>
        </div>
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new StoryNotesView()