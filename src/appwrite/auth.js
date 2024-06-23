
import { Client, Account, ID } from "appwrite";
import conf from '../conf/conf.js'

export class AuthService {

    client = new Client(); 
    account; 

    constructor() {
        this.client.setEndpoint(conf.appWriteUrl).setProject(conf.appWriteProjectID)
        this.account = new Account(this.client)
    }

    createUser({email, password, name}) {
        const newUser = this.account.create(ID.unique(), email, password); 
        newUser.then(function(response) {
            console.log(response)
            return this.login({email, password})
        })
        .catch(function (error) {   
            console.log(error)
        })
    }

    login({email, password}) {
        const loggedIn = this.account.createEmailPasswordSession(email, password)
        loggedIn.then(function (response) {
          console.log(response)  
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    getCurrentUser() {
        const currentUser = this.account.get();
        currentUser.then(function (response){
            return response; 
        })
        .catch(function (error) {
            console.log("Error in Get Current user service", error)
        })
    }

    logout() {
        const loggedOut = this.account.deleteSessions();
        loggedOut.then(function (response) {
            console.log(response)
        })
            .catch(function (error) {
            console.log('Error in Logout Appwrite auth service',error)
        })
    } 
}


const authService = new AuthService();

export default authService; 


