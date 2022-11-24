import App from './../../App'
import Auth from './../../Auth'
import {html, render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../../Router'
import Utils from './../../Utils'
import { gsap } from 'gsap'
import StoriesAPI from '../../StoriesAPI'
import cloud from "../../../static/images/background-clouds.png";
import desert from "../../../static/images/background-desert.png";
import farm from "../../../static/images/background-farm.png";
import field from "../../../static/images/background-field.png";
import space from "../../../static/images/background-space.png";
import woods from "../../../static/images/background-woods.png";


var imageStr = [cloud, desert, farm, field, space, woods]
let backgroundImage = getRandomImg()
function getRandomImg() {
  return imageStr[Math.floor(Math.random() * imageStr.length)];
}

class StoriesView {
  async init(){
    this.stories = [];
    document.title = 'Stories'    
    this.render()    
    Utils.pageIntroAnim()
    this.stories = await StoriesAPI.getUserStores(Auth.currentUser._id)
    this.render();
    console.log(Auth.currentUser)
    getRandomImg()
  }
  async generateStory() {
    const a = await StoriesAPI.generateStory(Auth.currentUser._id, {
      title: "New Story"
    }, "json");
    this.stories = await StoriesAPI.getUserStores(Auth.currentUser._id)
    this.render();
    console.log(Auth.currentUser)
    getRandomImg()
  }

  render(){
    const template = html`
      <va-app-header title="Stories" user="${JSON.stringify(Auth.currentUser)}" backUrl="/"></va-app-header>
      <div class="page-content calign">   
        <div class="list-container">
          ${this.stories.map(story => html`
            <div class="list-item" @click="${() => gotoRoute(`/story?story_id=${story._id}`)}">
              <div class="story-pic">
                <img class="story-background" src='${backgroundImage}'>
              </div>
              <h3>${story.title}</h3>
              <p>25/11/2022</p>
            </div>
            `)}
            <div @click="${() => this.generateStory()}" class="adder">
              <svg width="52" height="52" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
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


export default new StoriesView()