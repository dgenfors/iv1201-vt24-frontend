import CryptoJS from 'crypto-js';
/**
* Represents a ViewModel for managing application state and data.
*/
class ViewModel {
  constructor() {
    /**
    * Indicates whether the user is logged in or not.
    * @type {boolean}
    */
    this.isLoggedIn = false;
    this.roleID = null;
    this.token = null;
  }
  async setRoleID(id){
    /*const roleID = await fetch()
    this.roleID= roleID*/
    this.roleID = id
  }
  hashPassword(password) {
    const hash = CryptoJS.SHA256(password);
    return hash.toString(CryptoJS.enc.Hex);
  }

  async checkRoleID(){
    if(!this.token){
      return {error: "invalid token"}
    }
    try{
      const response = await fetch('https://iv1201-vt24-backend.vercel.app/validate/checkIfLogIn', {
        method: 'POST',
        mode: 'cors',
        credentials: "include",
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });
      const data = await response.json();
      return data;
    }catch(e){
      return {error: "Could not connect to server, please try again later.\n"}
    }
  }
  /**
  * Creates a new user account.
  * @param {UserDTO} user - An object containing user information.
  * @returns {Promise<{ success: boolean, existingFields: { username: boolean, email: boolean, personalNumber: boolean } }>} 
  * A Promise that resolves to an object indicating whether the account creation was successful and which fields already exist in the database if unsuccesful.
  */
  async createAccount(user) {
    const unencrypted = user.password
    user.password= this.hashPassword(user.password)
    try{
      const response = await fetch('https://iv1201-vt24-backend.vercel.app/unauthorized/createAccount', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "omit",
        body: JSON.stringify({ user })
      });
      const data = await response.json();
      console.log("create account:"+JSON.stringify(data))
      if(data.success){
       const logInState = await this.login(user.username, unencrypted)
       console.log(JSON.stringify(logInState))
       return {data, logInState}
      }
      return data;
    }catch(e){
      return {error: "Could not connect to server, please try again later.\n"}
    }
  }

  /**
  * Logs in the user with the provided username and password.
  * @param {string} username - The username of the user.
  * @param {string} password - The password of the user.
  * @returns {Promise<boolean>} A Promise that resolves to a boolean indicating login success.
  */
  async login(username, password) {
    const hashedPassword = this.hashPassword(password)
    try {
      const response = await fetch('https://iv1201-vt24-backend.vercel.app/unauthorized/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({ username, hashedPassword })
      });
      const authHeader = response.headers.get('Authorization')
      if (!authHeader) {
        return {error: "could not login"}
      }
      const token = authHeader.split(' ')[1];
      this.token = token

      const data = await response.json();
      this.roleID = data.role_id
      return data.state;
    } catch (e) {
      return {error: "Could not connect to server, please try again later.\n"}
    }
  }

  /**
  * Submits a job application.
  * @param {ApplicationDTO} application - The application to be submitted.
  * @returns {Promise<boolean>} A Promise that resolves to a boolean indicating success (true) or failure (false).
  */
  async submitApplication(application) {
    try{
      const response = await fetch('https://iv1201-vt24-backend.vercel.app/user/createNewApplication', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        credentials: "include",
        body: JSON.stringify({ application })
      });
      const wasSuccessful = await response.json();
      return wasSuccessful;
    }catch(e){
      console.log('Error when submitting application',e);
      return {error: "Could not connect to server, please try again later.\n"}
    }
  }

  /**
  * Retrieves a list of applications.
  * @returns {Promise<Array<ListAppDTO>>} A Promise that resolves to an array of ListAppDTO objects representing application data.
  */
  async listOfApplications() {
    try {
      const response = await fetch('https://iv1201-vt24-backend.vercel.app/recruiter/allApplications', {
      method: 'GET',
      mode: 'cors',
      credentials: "include",
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
      });
      const data = await response.json();
      console.log(data)
      return data
  } catch (error) {
      console.error('Error fetching list of applications:', error);
     return {error: "Could not connect to server, please try again later.\n"}
  }
  }

  /**
  * Sets status of a specific application to accepted or rejected
  * @param {string} username - The username of the person who owns the application to index it
  * @returns {Promise<boolean>} A Promise that resolves to a boolean indicating success (true) or failure (false).
  */
  processApplication(username) {
  }

  /**
  * Fetches application data for the given username from the server.
  * @param {string} username - The username for which to fetch application data.
  * @returns {Promise<ApplicationDTO | null>} A Promise that resolves to an ApplicationDTO object representing the user's application data, or null if the user has not submitted an application.
  */
 //Vet inte riktigt vad den ska returna om personen inte har en application inskickad så skrev null for now
  fetchUserData(user) {
  }

  fetchApplicationData() {
  }

  /**
  * Retrieves a list of available jobs from the database.
  * @returns {Promise<Array<Object>>} A Promise that resolves to an array of objects representing available jobs.
  */
  listOfJobs() {
  }

    /**
  * Retrieves the status of the application for the given username.
  * @param {string} username - The username for which to retrieve the application status.
  * @returns {Promise<"accepted" | "rejected" | "waiting">} A Promise that resolves to a string indicating the status of the application: "accepted", "rejected", or "waiting".
  */
    applicationStatus(username) {
    }
}

export default ViewModel;