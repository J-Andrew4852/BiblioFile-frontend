import App from './App'
import Auth from './Auth'
import Toast from './Toast'

// const makeApi = (base, configuration) => (method, url, data) => fetch(`$[base}/${url}`, {
//   ...configuration(),
//   method
// })

// const api = makeApi(App.apiBase, () => {
//   headers: {
//     Authorization: `Bearer: ${auth}`
//   }
// })

// const data = await api("GET", "/dfdfdd");

class NotesAPI {
  
  async updateNotes(userId, userData, dataType = 'form'){
    // validate
    if(!userId || !userData) return
    
    let responseHeader
    
    // form data
    if(dataType == 'form'){
      // fetch response header normal (form data)
      responseHeader = {
        method: "PUT",        
        headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}`},
        body: userData
      }
      
    // json data
    }else if(dataType == 'json'){
      responseHeader = {
        method: "PUT",        
        headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, "Content-Type" : "application/json"},
        body: JSON.stringify(userData)
      }
    }
  
    // make fetch request to backend
    const response = await fetch(`${App.apiBase}/user/${userId}`, responseHeader)
  
    // if response not ok
    if(!response.ok){
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem updating user')
    }
  
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }
  async getUserStores(userId){
    // validate
    if(!userId) return
    
    // fetch the json data
    const response = await fetch(`${App.apiBase}/users/${userId}/notes`, {
      headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}`}
    })

    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem getting user')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data

  }
  async addNotes(userId, userData, dataType = 'form'){
    // validate
    if(!userId || !userData) return
    
    let responseHeader
    
    // form data
    if(dataType == 'form'){
      // fetch response header normal (form data)
      responseHeader = {
        method: "POST",        
        headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}`},
        body: userData
      }
      
    // json data
    }else if(dataType == 'json'){
      responseHeader = {
        method: "POST",        
        headers: { "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, "Content-Type" : "application/json"},
        body: JSON.stringify(userData)
      }
    }
  
    // make fetch request to backend
    const response = await fetch(`${App.apiBase}/users/${userId}/notes`, responseHeader)
  
    // if response not ok
    if(!response.ok){
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem updating user')
    }
  
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }
}

export default new NotesAPI()