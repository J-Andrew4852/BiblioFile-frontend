import App from './../../App'
import Auth from './../../Auth'
import {html, render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../../Router'
import Utils from './../../Utils'
import { gsap } from 'gsap'
import CharactersAPI from '../../CharactersAPI'
import { get, post } from '../../Utils';
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

IMG_URL_TO_ASSET_URL = {
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

class StoryCharacterView {
  async init(){
    this.characters = [];
    document.title = 'Story Character'    
    Utils.pageIntroAnim();
    this.storyId = new URLSearchParams(window.location.search).get("story_id");
    this.story = await (await (await get(`/stories/${this.storyId}`)).json());
    this.characters = await CharactersAPI.getUserStores(this.storyId)
    this.render();
  }
  async generateCharacter() {
    const b = await CharactersAPI.generateCharacter(this.storyId, {
    
    }, "json");
    this.characters = await CharactersAPI.getUserStores(this.storyId);
    this.render();
    console.log(this.characters)
  }
  render(){
    const template = html`
      <va-app-header title="${this.story.title}"
        backUrl="/stories"
        ?editable=${true}
        .onTitleChanged=${async (title) => {
          await post(`/stories/${this.storyId}/title`, JSON.stringify({ title  }));
          this.story.title = title;
        }}
         user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content calign">
        <div class="sub-nav">
          <div class="csubnav"><h2>Characters</h2><div class="cstatic-line"></div></div>
          <div class="nsubnav point" @click=${() => gotoRoute(`/story/notes?story_id=${this.storyId}`)}><h2>Notes</h2><div class="hover-line"></div></div>
        </div>       
        <div class="list-container lc-character">
          ${this.characters.map(character => html`
          <div class="list-item" @click=${() => gotoRoute(`/character?character_id=${character._id}`)}>
            <div class="character-image-box">
              <div class="character-back-pic">
                <img class="story-background-image" src="${IMG_URL_TO_ASSET_URL[character.backgroundImage]}">
              </div>
              <div class="character-pic">
                <img class="story-character-image" src="${IMG_URL_TO_ASSET_URL[character.characterImage]}">
              </div>
            </div>
            <h3>${character.fname} ${character.lname}</h3>
            <p>${character.job}<br></br>${character.age} ${character.gender}</p>
          </div>
            `)}
            <div @click="${() => this.generateCharacter()}" class="adder">
              <svg width="52" height="52"" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 17C0 7.61116 7.61116 0 17 0H53C62.3888 0 70 7.61116 70 17V53C70 62.3888 62.3888 70 53 70H17C7.61116 70 0 62.3888 0 53V17Z" fill="#F8D57E"/>
                <path d="M21 38V32H50V38H21Z" fill="#424C70"/>
                <path d="M32 21H38V50H32V21Z" fill="#424C70"/>
              </svg>
            </div>
        </div>
      </div>      
    `
    render(template, App.rootEl)
  }
}

export default new StoryCharacterView()