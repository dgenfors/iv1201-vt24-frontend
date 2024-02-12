import { useEffect, useState } from 'react';

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
  }

  /**
  * Creates a new user account.
  * @param {UserDto} user - An object containing user information.
  * @returns {Promise<{ success: boolean, existingFields: { username: boolean, email: boolean, personalNumber: boolean } }>} 
  * A Promise that resolves to an object indicating whether the account creation was successful and which fields already exist in the database if unsuccesful.
  */
  async createAccount(user) {
    console.log("create acc")
    try{
      const response = await fetch('http://localhost:3001/register')
    }catch(e){

    }
    // Implementation details omitted
  }

  /**
  * Logs in the user with the provided username and password.
  * @param {string} username - The username of the user.
  * @param {string} password - The password of the user.
  * @returns {Promise<boolean>} A Promise that resolves to a boolean indicating login success.
  */
  async login(username, password) {
    try {
      const response = await fetch('http://localhost:3001/login', {
        mode: 'cors',
        headers: {
          'Authorization': 'Basic ' + btoa(username + ':' + password)
        }
      });
      const data = await response.json();
      console.log(data);
      return data[0].exists;
    } catch (e) {
      console.log(e);
    }
  }

  /**
  * Retrieves a list of available jobs from the database.
  * @returns {Promise<Array<Object>>} A Promise that resolves to an array of objects representing available jobs.
  */
  listOfJobs() {
    // Implementation details omitted
  }

  /**
  * Submits a job application.
  * @param {ApplicationDTO} application - The application to be submitted.
  * @returns {Promise<boolean>} A Promise that resolves to a boolean indicating success (true) or failure (false).
  */
  submitApplication(app) {
    // Implementation details omitted
  }

  /**
  * Retrieves the status of the application for the given username.
  * @param {string} username - The username for which to retrieve the application status.
  * @returns {Promise<"accepted" | "rejected" | "waiting">} A Promise that resolves to a string indicating the status of the application: "accepted", "rejected", or "waiting".
  */
  applicationStatus(user) {
    // Implementation details omitted
  }

  /**
  * Retrieves a list of applications.
  * @returns {Promise<Array<ListAppDTO>>} A Promise that resolves to an array of ListAppDTO objects representing application data.
  */
  listOfApplications() {
    // Implementation details omitted
  }

  /**
  * Sets status of a specific application to accepted or rejected
  * @param {string} username - The username of the person who owns the application to index it
  * @returns {Promise<boolean>} A Promise that resolves to a boolean indicating success (true) or failure (false).
  */
  processApplication(user) {
    // Implementation details omitted
  }

  /**
  * Fetches application data for the given username from the server.
  * @param {string} username - The username for which to fetch application data.
  * @returns {Promise<ApplicationDTO | null>} A Promise that resolves to an ApplicationDTO object representing the user's application data, or null if the user has not submitted an application.
  */
 //Vet inte riktigt vad den ska returna om personen inte har en application inskickad så skrev null for now
  fetchUserData(user) {
    // Implementation details omitted
  }

  //Tror att den här borde tas bort eftersom functionen innan gör exakt samma sak egentligen, OBS vi borde ändra 
  //ListAppDTO till att ha med username eftersom applicationID inte finns i databasen 
  fetchApplicationData() {
    // Implementation details omitted
  }
}

export default ViewModel;