import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import CharactersAPI from '../../CharactersAPI'
import { get, post } from "../../Utils"
import cloud from "../../../static/images/background-clouds.png";
import desert from "../../../static/images/background-desert.png";
import farm from "../../../static/images/background-farm.png";
import field from "../../../static/images/background-field.png";
import space from "../../../static/images/background-space.png";
import woods from "../../../static/images/background-woods.png";
import person1 from "../../../static/images/person-01.png";
import person2 from "../../../static/images/person-02.png";
import person3 from "../../../static/images/person-03.png";
import person4 from "../../../static/images/person-04.png";
import person5 from "../../../static/images/person-05.png";
import person6 from "../../../static/images/person-06.png";
import person7 from "../../../static/images/person-07.png";
import person8 from "../../../static/images/person-08.png";
import person9 from "../../../static/images/person-09.png";
import person10 from "../../../static/images/person-10.png";

const IMG_URL_TO_ASSET_URL = {
  "/images/background-clouds.png": cloud,
  "/images/background-desert.png": desert,
  "/images/background-farm.png": farm,
  "/images/background-field.png": field,
  "/images/background-space.png": space,
  "/images/background-woods.png": woods,
  "/images/person-01.png": person1,
  "/images/person-02.png": person2,
  "/images/person-03.png": person3,
  "/images/person-04.png": person4,
  "/images/person-05.png": person5,
  "/images/person-06.png": person6,
  "/images/person-07.png": person7,
  "/images/person-08.png": person8,
  "/images/person-09.png": person9,
  "/images/person-10.png": person10,
}

function debounce(func, timeout) {
  let handler = null;
  return (...args) => {
    if (handler) {
      clearTimeout(handler);
    }
    handler = setTimeout(() => func(...args), timeout);
  }
}

class CharacterNotesView {
  async init(){
    document.title = 'Character Notes' 
    this.characterId = new URLSearchParams(window.location.search).get("character_id"); 
    this.character = await CharactersAPI.getCharacter(this.characterId)  
    this.note = (await (await get(`/characters/${this.characterId}/note`)).json()).body;
    this.render()    
    Utils.pageIntroAnim()
  }

  saveNote = async (event) => {
    const text = event.target.value;
    const response = await post(`/characters/${this.characterId}/note`, JSON.stringify({ note: text }));
    if (response.status === 200) {
      // alert("Saved ok");
    }
  }

  render(){
    const template = html`
      <va-app-header title="Character Notes" user="${JSON.stringify(Auth.currentUser)}" backUrl="/stories"></va-app-header>
      <div class="split-background"><div style="background-color: ${LOCATION_TO_COLOUR[this.character.location]};"></div><div></div></div>
      <div class="page-content flexer">    
        <div class="character-left">
          <div class="character-portrait">
            <img class="background-image" src="${IMG_URL_TO_ASSET_URL[this.character.backgroundImage]}">
            <img class="character-image" src="${IMG_URL_TO_ASSET_URL[this.character.characterImage]}">
          </div>
        </div>
        <div class="character-notes-right calign">
          <div class="sub-nav">
            <div class="csubnav point" @click=${() => gotoRoute(`/character?character_id=${this.characterId}`)}><h2>Character</h2><div class="hover-line"></div></div>
            <div class="nsubnav"><h2>Notes</h2><div class="nstatic-line"></div></div>
          </div>
          <div class="notes-area">
            <div class="notes-top-bar fit2">
              <div class="divider-line"></div>
            </div>
            <sl-textarea size="large" value="${this.note}" @input=${debounce(this.saveNote, 600)} class="character-notes-section" resize="auto" placeholder="Start writing here..." rows="35"></sl-textarea>
          </div>
        </div>
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new CharacterNotesView()