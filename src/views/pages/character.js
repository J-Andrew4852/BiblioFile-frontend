import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils, { post } from '../../Utils'
import CharactersAPI from '../../CharactersAPI'
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
import jumble from "../../../static/images/jumbleIcon.svg";

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
LOCATION_TO_COLOUR = {
  "Clouds": "#EAFAFF",
  "Desert": "#FBDF97",
  "Farm": "#DDEFDD",
  "Field": "#E6ECDB",
  "Space": "#DEE5FF",
  "Woods": "#E8FDC6",
}

class CharacterView {
  async init(){
    document.title = 'Character Character'        
    Utils.pageIntroAnim()
    this.characterId = new URLSearchParams(window.location.search).get("character_id");
    this.character = await CharactersAPI.getCharacter(this.characterId)
    console.log(this.character.backgroundImage)
    // window.onload = function() {
    //       window.location.reload();
    // }
    // window.addEventListener('popstate', function (event) {
    //   console.log('working has changed')
    // });
    this.chart = document.getElementById("chart");
    // this.render();
    console.log(this.character)
    this.render()
  }

  updateFields = async (pairs) => {
    const fields = Object.fromEntries(pairs);
    this.character = await (await post(`/characters/${this.characterId}/fields`, JSON.stringify(fields))).json();
    // window.location.reload()
    this.render();
    // location.reload();
  }

  render(){
    const template = html`
      <!-- <va-app-header title="${this.character.fname} ${this.character.lname}" user="${JSON.stringify(Auth.currentUser)}" backUrl="/stories"></va-app-header> -->
      <va-app-header title="${this.character.fname} ${this.character.lname}"
        backUrl="/stories"
        ?editable=${true}
        .onTitleChanged=${async (title) => {
          await post(`/characters/${this.storyId}/title`, JSON.stringify({ title  }));
          this.character.title = title;
        }}
         user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="split-background">
        <div style="background-color: ${LOCATION_TO_COLOUR[this.character.location]};"></div>
        <div></div>
      </div>
      <div class="page-content flexer">    
        <div class="character-left">
          <div class="character-portrait">
            <img class="background-image" src="${IMG_URL_TO_ASSET_URL[this.character.backgroundImage]}">
            <img class="character-image" src="${IMG_URL_TO_ASSET_URL[this.character.characterImage]}">
          </div>
          <div class="gender-container ${this.character.gender}">
            <option class="gender-box" value="Male" @click="${e => {
                  this.updateFields([["gender", e.currentTarget.value]]);
                  // console.log(e.currentTarget.value)
                }}">Male</option>
            <option class="gender-box" value="Female" @click="${e => {
                  this.updateFields([["gender", e.currentTarget.value]]);
                  // console.log(e.currentTarget.value)
                }}">Female</option>
          </div>
        </div>
        <div class="character-right calign">
          <div class="sub-nav">
            <div class="csubnav"><h2>Character</h2><div class="cstatic-line"></div></div>
            <div class="nsubnav point" @click=${() => gotoRoute(`/characterNotes?character_id=${this.characterId}`)}><h2>Notes</h2><div class="hover-line"></div></div>
            <img class="jumble-icon" src="${jumble}" @click="${async () => {
            this.character = await (await post(`/characters/${this.character._id}/randomize`, JSON.stringify([
              "gender",
              "fname",
              "lname",
              "age",
              "location",
              "job",
              "personalityTraits",
              "motivation",
              "motivators",
              "kindness",
              "happiness",
              "strength",
              "wisdom",
              "intelligence",
              "stealth"
            ]))).json();
            this.render();
            // location.reload();
          }}">
          </div>
          <div class="gridContainer">
            <div class="character-grid-item" style="background-color: ${LOCATION_TO_COLOUR[this.character.location]};">
              <p class="box-subheader">Basics</p>
              <div class="contentBoxLine"></div>
              <div class="selectorDiv">
                <p>Age:</p>
                <sl-input class="selectorSl" value=${this.character.age} @sl-change="${e => {
                  this.updateFields([["age", e.currentTarget.value]]);
                }}"></sl-input>
              </div>
              <div class="selectorDiv">
                <p>Location:</p>
                <sl-select class="selectorSl location-sl" value=${this.character.location} @sl-change="${e => {
                  this.updateFields([["location", e.currentTarget.value]]);
                }}">
                  <sl-menu-item value="Clouds">Clouds</sl-menu-item>
                  <sl-menu-item value="Desert">Desert</sl-menu-item>
                  <sl-menu-item value="Farm">Farm</sl-menu-item>
                  <sl-menu-item value="Field">Field</sl-menu-item>
                  <sl-menu-item value="Space">Space</sl-menu-item>
                  <sl-menu-item value="Woods">Woods</sl-menu-item>
                </sl-select>
              </div>
              <div class="selectorDiv">
                <p>Job:</p>
                <sl-input class="selectorSl" value=${this.character.job}></sl-input>
              </div>
            </div>
            <div class="character-grid-item" style="background-color: ${LOCATION_TO_COLOUR[this.character.location]};">
            <p class="box-subheader">Personality</p>
              <div class="contentBoxLine"></div>
              <div class="selectorDiv2">
                <sl-input class="selectorSl2" value=${this.character.personalityTraits[0]}></sl-input>
              </div>
              <div class="selectorDiv2">
                <sl-input class="selectorSl2" size="medium" value=${this.character.personalityTraits[1]}></sl-input>
              </div>
              <div class="selectorDiv2">
                <sl-input class="selectorSl2" size="medium" value=${this.character.personalityTraits[2]}></sl-input>
              </div>
            </div>
            <div class="character-grid-item" style="background-color: ${LOCATION_TO_COLOUR[this.character.location]};">
            <p class="box-subheader">Motivations</p>
              <div class="contentBoxLine"></div>
              <div class="selectorDiv2">
                <sl-select class="selectorSl2" value=${this.character.motivation} @sl-change="${e => {
                  this.updateFields([["motivation", e.currentTarget.value]]);
                }}">
                  <sl-menu-item value="Fear">Fear</sl-menu-item>
                  <sl-menu-item value="Evil">Evil</sl-menu-item>
                  <sl-menu-item value="Noble">Noble</sl-menu-item>
                  <sl-menu-item value="Normal">Normal</sl-menu-item>
                </sl-select>
              </div>
              <div class="barChart">
                <p>${this.character.motivators[0]}</p>
                <div class="itemBar">
                  <div class="bar-line1"></div>
                  <div class="bar-line2"></div>
                  <div class="bar-line3"></div>
                  <div class="bar-line4"></div>
                  <div class="valueBar${this.character.bar1}"></div>
                </div>
              </div>
              <div class="barChart">
                <p>${this.character.motivators[1]}</p>
                <div class="itemBar">
                  <div class="bar-line1"></div>
                  <div class="bar-line2"></div>
                  <div class="bar-line3"></div>
                  <div class="bar-line4"></div>
                  <div class="valueBar${this.character.bar2}"></div>
                </div>
              </div>
              <div class="barChart">
                <p>${this.character.motivators[2]}</p>
                <div class="itemBar">
                  <div class="bar-line1"></div>
                  <div class="bar-line2"></div>
                  <div class="bar-line3"></div>
                  <div class="bar-line4"></div>
                  <div class="valueBar${this.character.bar3}"></div>
                </div>
              </div>
            </div>
            <div class="character-grid-item spider-chart-container" style="background-color: ${LOCATION_TO_COLOUR[this.character.location]};">
              <p class="box-subheader">Basics</p>
              <div class="contentBoxLine"></div>
              <div id="chart">
                  <va-spider-chart
  
                   .element="${this.chart}" .qualities="${[
                    {x: "Kindness", value: `${this.character.kindness}`},
                    {x: "Happiness", value: `${this.character.happiness}`},
                    {x: "Wisdom", value: `${this.character.wisdom}`},
                    {x: "Stealth", value: `${this.character.stealth}`},
                    {x: "Intelligence", value: `${this.character.intelligence}`},
                    {x: "Strength", value: `${this.character.strength}`},
                  ]}" ></va-spider-chart>
              </div>
            </div>
          </div>
        </div>
      </div>      
    `
    render(template, App.rootEl);
      
    if (!this.chart) {
      this.chart = document.getElementById("chart");
      this.render();
    }


    // const foo = document.getElementById("foo");
    // solidRender(() => <SolidApp />, foo);
  }
}


export default new CharacterView()