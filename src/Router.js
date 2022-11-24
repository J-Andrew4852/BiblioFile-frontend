// import views
import fourOFourView from './views/pages/404'
import signinView from './views/pages/signin'
import signupView from './views/pages/signup'
import profileView from './views/pages/profile'
import editProfileView from './views/pages/editProfile'
import guide1View from './views/pages/guide1'
import guide2View from './views/pages/guide2'
import guide3View from './views/pages/guide3'
import storyNotesView from './views/pages/storyNotes'
import storiesView from './views/pages/stories'
import storyCharactersView from './views/pages/storyCharacters'
import characterView from './views/pages/character'
import characterNotesView from './views/pages/characterNotes'

// define routes
const routes = {
	'/': guide1View,
	'/guide2': guide2View,
	'/guide3': guide3View,
	'404' : fourOFourView,
	'/signin': signinView,
	'/signup': signupView,
	'/profile': profileView,
	'/editProfile': editProfileView,
	'/story/notes': storyNotesView,
	'/stories': storiesView,
	'/story': storyCharactersView,
	'/character': characterView,
	'/characterNotes': characterNotesView
}

class Router {
	constructor(){
		this.routes = routes
	}
	
	init(){
		// initial call
		this.route(window.location.pathname)

		// on back/forward
		window.addEventListener('popstate', () => {
			this.route(window.location.pathname)
		})
	}
	
	route(fullPathname){
		// extract path without params
		const pathname = fullPathname.split('?')[0]
		const route = this.routes[pathname]
		
		if(route){
			// if route exists, run init() of the view
			this.routes[window.location.pathname].init()
		}else{			
			// show 404 view instead
			this.routes['404'].init()			
		}
	}

	gotoRoute(pathname){
		window.history.pushState({}, pathname, window.location.origin + pathname);
		this.route(pathname)
	}	
}

// create appRouter instance and export
const AppRouter = new Router()
export default AppRouter


// programmatically load any route
export function gotoRoute(pathname){
	AppRouter.gotoRoute(pathname)
}


// allows anchor <a> links to load routes
export function anchorRoute(e){
	e.preventDefault()	
	const pathname = e.target.closest('a').pathname
	AppRouter.gotoRoute(pathname)
}
