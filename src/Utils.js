import gsap from 'gsap'
import App from "./App"

class Utils {

  isMobile(){
    let viewportWidth = window.innerWidth
    if(viewportWidth <= 768){
      return true
    }else{
      return false
    }
  }


  pageIntroAnim(){
    const pageContent = document.querySelector('.page-content')
    if(!pageContent) return
    gsap.fromTo(pageContent, {opacity: 0, y: -12}, {opacity: 1, y: 0, ease: 'power2.out', duration: 0.3})
  }
}

export async function get(url) {
  return await fetch(`${App.apiBase}${url}`, {
    headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}`}
  });
}

export async function post(url, body, contentType = "application/json") {
  return await fetch(`${App.apiBase}${url}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": contentType
    },
    body: body
  });
}

export default new Utils()