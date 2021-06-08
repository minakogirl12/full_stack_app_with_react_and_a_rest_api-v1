import config from './config'

//class to manage access to the API

export default class Data{
    /**
     * api method fetches data from the REST API, code originally from Treehouse coursework
     * @param {*} path The url path, requires 
     * @param {*} method GET, POST, PUT, DELETE etc, default GET method
     * @param {*} body Body of the request, default null body
     * @param {*} requiresAuth Boolean variable if path requires authentication, default false
     * @param {*} credentials Object that contains the user information for authentication, default null
     * @returns JSON response from the API
     */
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;
      
        const options = {
          method,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        };
    
        if (body !== null) {
          options.body = JSON.stringify(body);
        }
    
        //checks if authentication is required
        if(requiresAuth){
          //encode the uesr credentials
          const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`); //btoa method creates a base-64 ACSII string from a string, separate each property with a semicolon
    
          //add Authorization property to headers
          options.headers['Authorization'] = `Basic ${encodedCredentials}`; //set authorization type to Basic followed by the enocdedCredentials
        }
        return fetch(url, options);
      }

      /**
       *  
       * @param {*} emailAddress
       * @param {*} password 
       * @returns authenticated user information
       */
    async getUser(emailAddress, password){
        //GET route requires authentication
        const response = await this.api(`/users`, 'GET', null, true, {emailAddress, password});
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }

    /**
     * 
     * @param {*} user Object that contains user information
     * @returns empty array on successfull creation
     */
    async createUser(user){
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
            return data.errors;
            });
        }
        else {
            throw new Error();
        }
    }

    /**
     * 
     * @returns All the courses
     */
    async getCourses(){
        const response = await this.api(`/courses`, 'GET');
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }

    /**
     * 
     * @param {*} courseId 
     * @returns Information of a single course in an JSON object
     */
    async getCourse(courseId){
        const response = await this.api(`/courses/${courseId}`, 'GET');
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }

    /**
     * Creates a new
     * @param {*} username 
     * @param {*} password 
     * @param {*} course Object containing course information
     * @returns empty array on successful course creation
     */
    async createCourse(username, password, course){
        //PSOT route requires authentication
        const response = await this.api(`/courses`, 'POST', course, true, {username, password});
        if (response.status === 201) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
                });
        }
        else {
            throw new Error();
        }
    }

    /**
     * 
     * @param {*} course 
     * @returns empty array on successful update of course
     */
    async updateCourse(course, username, password){
        //PUT route requires authentication
        const response = await this.api(`/courses/${course.id}`, 'PUT', course, true, {username, password});
        if (response.status === 201) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
                });
        }
        else {
            throw new Error();
        }
    }

    /**
     * 
     * @param {*} courseId 
     * @returns empty array on successful deletion
     */
    async deleteCourse(courseId, username, password){
         //PUT route requires authentication
         const response = await this.api(`/courses/${courseId}`, 'DELETE', null, true, {username, password});
         if (response.status === 201) {
             return [];
         }
         else if (response.status === 400) {
             return response.json().then(data => {
                 return data.errors;
                 });
         }
         else {
             throw new Error();
         }
    }
    

}