
import styles from './App.module.css';
import { batch, createEffect, createMemo, createSignal, For } from 'solid-js';
import { createStore } from "solid-js/store"

const FNAME_GROUP_TO_OPTIONS = {
  "Male": ["James", "Robert", "John", "Michael", "David", "William", "Richard", "Joseph", "Thomas", "Charles", "Christopher", 
    "Daniel", "Matthew", "Anthony", "Mark", "Donald", "Steven", "Paul", "Andrew", "Joshua", "Kenneth", "Kevin", "Brian", 
    "George", "Timothy", "Ronald", "Edward", "Jason", "Jeffrey", "Ryan", "Jacob", "Gary", "Nicholas", "Eric", 
    "Jonathan", "Larry", "Justin", "Scott", "Brandon", "Ben", "Sam", "Greg", "Alexander", "Frank", "Patrick", 
    "Raymond", "Jack", "Tyler", "Aaron", "Henry"],
  "Female": ["Mary", "Kate", "Patricia", "Jenny", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen", 
    "Lisa", "Nancy", "Betty", "Margaret", "Ashley", "Kimberly", "Emily", "Michelle", "Amanda", "Lucy", "Melissa", 
    "Stephanie", "Rebecca", "Laura", "Amy", "Anna", "Emma", "Nicole", "Samantha", "Christine", "Isabelle", "Olivia", 
    "Julie", "Lauren", "Victoria", "Cheryl", "Hannah", "Jacqueline", "Madison", "Abby", "Alice", "Grace", "Sophia", 
    "Amber", "Daniella", "Marie", "Charlotte", "Alexis", "Kayla"],
  "ALL": ["James", "Robert", "John", "Michael", "David", "William", "Richard", "Joseph", "Thomas", "Charles", "Christopher", 
    "Daniel", "Matthew", "Anthony", "Mark", "Donald", "Steven", "Paul", "Andrew", "Joshua", "Kenneth", "Kevin", "Brian", 
    "George", "Timothy", "Ronald", "Edward", "Jason", "Jeffrey", "Ryan", "Jacob", "Gary", "Nicholas", "Eric", 
    "Jonathan", "Larry", "Justin", "Scott", "Brandon", "Ben", "Sam", "Greg", "Alexander", "Frank", "Patrick", 
    "Raymond", "Jack", "Tyler", "Aaron", "Henry", "Mary", "Kate", "Patricia", "Jenny", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen", 
    "Lisa", "Nancy", "Betty", "Margaret", "Ashley", "Kimberly", "Emily", "Michelle", "Amanda", "Lucy", "Melissa", 
    "Stephanie", "Rebecca", "Laura", "Amy", "Anna", "Emma", "Nicole", "Samantha", "Christine", "Isabelle", "Olivia", 
    "Julie", "Lauren", "Victoria", "Cheryl", "Hannah", "Jacqueline", "Madison", "Abby", "Alice", "Grace", "Sophia", 
    "Amber", "Daniella", "Marie", "Charlotte", "Alexis", "Kayla"]
}

var LNameStr = ["MacKenzie", "Andrew", "Crook", "Wang", "Zhang", "Zhao", "Mohammad", "Hernandez", "Rodriguez", "Hassain", "Smith", 
  "Williams", "Hollingworth", "Sharma", "Gomez", "Matthews", "Lee", "Miller", "Wilson", "Taylor", "Anderson", 
  "Jackson", "Anwar", "Peters", "White", "Harris", "Lewis", "Hwang", "Robinson", "Young", "Green", "Johnson", 
  "Brown", "Jones", "Garcia", "Wilson", "Moore", "Jackson", "Martin", "Thompson", "Sanchez", "Clark", "Walker", 
  "Allen", "Nguyen", "Hill", "Adams", "Hall", "Roberts", "Evans"]

var imgStr = [' https://cdn.myanimelist.net/images/anime/1223/96541.jpg', ' https://cdn.myanimelist.net/images/anime/9/9453.jpg', 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?cs=srgb&dl=pexels-pixabay-417173.jpg&fm=jpg', 'https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?cs=srgb&dl=pexels-eberhard-grossgasteiger-691668.jpg&fm=jpg', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2']
var ageStr = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 
  46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 
  74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88]
var locationStr = ["Space", "Hell", "City", "Woods", "Suburbs", "Desert", "Farm", "Rainforest", "Tropical Island", "The Future"]
var jobStr = ["Dentist", "Nurse", "Pharmacist", "Doctor", "Software Developer", "Web Developer", "Occupational Therapist", 
  "Vet", "Computer Programmer", "Psychologist", "High School Teacher", "Primary School Teacher", 
  "Kindergarten Teacher", "Engineer", "Retail Manager", "Fast Food Worker", "Supermarket Worker", 
  "Retail Worker", "Lawyer", "Accountant", "Radiologist", "Radio Host", "TV Host", "Actor", "Librarian", 
  "Hairdresser", "Esthetician", "Security Guard", "Police Officer", "Social Worker", "Architect", 
  "Real Estate Agent", "Artist", "Mechanic", "Plumber", "Electrician", "Carpenter", "Builder", "Bus Driver", 
  "Chef", "Bartender", "Barista", "Receptionist", "Cleaner", "Truck Driver", "Sports Coach", "Scientist", 
  "Paramedic", "University Student", "Pilot", "Surgeon", "Politician", "Soldier", "Personal Trainer", "Singer", 
  "Journalist", "Postman", "Flight Attendant", "Magician", "Firefighter", "Secret Agent", "Florist", "Baker", 
  "Social Media Influencer", "Hacker", "Interior Designer", "Photographer", "Graphic Designer", "Detective", 
  "Archaeologist", "Butcher", "Criminal", "Circus worker", "Clairvoyant", "Comedian", "Composer", "Lifeguard", 
  "Coroner", "Dancer", "Drug dealer", "Farmer", "Fashion designer", "Film Director", "Homemaker", "Unemployed", 
  "Hypnotherapist", "Illustrator", "Inventor", "Judge", "Stripper", "Meteorologist", "Midwife", "Miner", "Model", 
  "Mortician", "Musician", "Nun", "Pickpocket", "Pop Star", "Priest", "Racing driver", "Retired", "Sportsperson", 
  "Surgeon", "Tarot Reader", "Tattoo Artist", "Podcast Host", "Astronaut"]

var t1Str = ['t', 'r', 'a', 'i']
var t2Str = ['T', 'R', 'A', 'I']

function getRandomFName(group) {
  const options = FNAME_GROUP_TO_OPTIONS[group];
  return options[Math.floor(Math.random() * options.length)]
}
function getRandomLName() {
  return LNameStr[Math.floor(Math.random() * imgStr.length)]
}
function getRandomImg() {
  return imgStr[Math.floor(Math.random() * imgStr.length)]
}
function getRandomTrait1() {
  return t1Str[Math.floor(Math.random() * t1Str.length)]
}
function getRandomTrait2() {
  return t2Str[Math.floor(Math.random() * t2Str.length)]
}
function getRandomAge() {
  return ageStr[Math.floor(Math.random() * t2Str.length)]
}
function getRandomLocation() {
  return locationStr[Math.floor(Math.random() * t2Str.length)]
}
function getRandomJob() {
  return locationStr[Math.floor(Math.random() * jobStr.length)]
}


function generateRandomProfile() {
  return {
    namef: getRandomFName("ALL"),
    namel: getRandomLName("ALL"),
    cover: getRandomImg(),
    description: "desc",
    trait1: getRandomTrait1(),
    trait2: getRandomTrait2(),
    age: getRandomAge(),
    location: getRandomLocation(),
    job: getRandomJob()
  }
}

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}


function getProfile(id) {
  const localStorageKey = `profile-${id}`;
  const savedJson = localStorage.getItem(localStorageKey);
  const saved = savedJson && JSON.parse(savedJson);

  return saved ?? {
    ...generateRandomProfile(),
    id: uuidv4()
  }
}

function Profile(props) {

  const [profile, setProfile] = props.profile;

  function randomize() {
    batch(() => {
      for (const [key, value] of Object.entries(generateRandomProfile())) {
        setProfile(key, value);
      }
    })
  }

  return (
    <>
    <div class={styles.avatar}>
      <h2>{profile.namef}</h2>
      <sl-avatar shape="rounded"
        image={profile.cover}
      ></sl-avatar>
      <sl-button class={styles.movecharbtn} variant="default" size="small" pill onClick={props.onClick}>
        <sl-icon name="plus" label="Add"></sl-icon>
      </sl-button>
      <button onClick={randomize}>regenerate</button>
    </div>
    </>
  )
}

function ProfileListItem(props) {
  return (
    <>
    <div class={styles.avatar}>
      <h2>{props.profile.namef}</h2>
      <sl-avatar shape="rounded"
        image={props.profile.cover}
      ></sl-avatar>
      <sl-button variant="default" size="small" pill onClick={props.onClick}>
        <sl-icon name="plus" label="Add"></sl-icon>
        View
      </sl-button>
    </div>
    </>
  );
}

function ProfileList(props) {
  return (
    <For each={props.profiles}>{
      (profile) => (
        <li>
          <ProfileListItem
            profile={profile}
            onClick={() => props.onClick(profile.id)}
          />
        </li>
      )}
    </For>
  )
}

function App() {
  let drawer;
  const [profileId, setProfileId] = createSignal(null);

  const saved = [];
  const [profiles, setProfiles] = createStore(saved.map(getProfile));

  const activeProfile = createMemo(() => {
    if (profileId() != null) return profiles.find(p => p.id === profileId());
  })

  createEffect(() => {
    for (const profile of profiles) {
      localStorage.setItem(`profile-${profile.id}`, JSON.stringify(profile))
    }
  })

  function addProfile() {
    setProfiles([
      ...profiles,
      getProfile()
    ])
  }

  return (
    <>
      <div class={styles.charbar}>
        <sl-button variant="default" size="large" circle class={styles.charaddbtn} onClick={addProfile}>
          <sl-icon name="plus" label="Add"></sl-icon>
        </sl-button>
        <ProfileList profiles={profiles} onClick={setProfileId} />
      </div>
      <p>Active profile: {profileId()}: {JSON.stringify(activeProfile() ?? {})}</p>
      <Show when={activeProfile()}>
        <div class={styles.gridcontainer}>
          <div class={styles.charpic}>
            <img src={activeProfile().cover}/>
          </div>
          <div class={styles.charfname}>
            <h2>{activeProfile().namef}</h2>
          </div>
          <div class={styles.charlname}>
            <h2>{activeProfile().namel}</h2>
          </div>
          <div class={styles.item1}>
          <sl-select value={activeProfile().trait1}>
            <For each={t1Str}>
              {value => (
                <sl-menu-item value={value}>{value}</sl-menu-item>
              )}
            </For>
          </sl-select>
          </div>
          <div class={styles.item2}>
            
          </div>
          <div class={styles.genebtn}>
            <sl-button>Generate</sl-button>
          </div>
          <div class={styles.editbtn}>
            <sl-button>Edit</sl-button>
          </div>
          <div class={styles.savebtn}>
            <sl-button>Save</sl-button>
          </div>
          <sl-drawer ref={drawer} label="Drawer" class="drawer-overview">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.

            <sl-button onClick={() => {
              drawer.hide();
            }} slot="footer" variant="primary">Close</sl-button>
          </sl-drawer>

          <sl-button onClick={() => {
            drawer.show();
          }}>Open Drawer</sl-button>
        </div>
      </Show>
    </>
  );
}

export default App;
