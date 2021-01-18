import axios from 'axios';
const baseUrl = "http://localhost:4000";

class Services{

    static login(username,password){ 
        alert(username+password);      
        return axios.post(baseUrl+"/users/login",{
            username,
            password
        }, { withCredentials:true })
    }

    static registration(username,password,confirmpassword,acno){
        return axios.post(baseUrl+"/users/register",{
            username,
            password,
            confirmpassword,
            acno
        })
    }

    static getTasks(){      
        return axios.post(baseUrl+"/users/list",{withCredentials:true })
    }
    static getUsers1(){
      
        return axios.get(baseUrl+"/users",{withCredentials:true })
    }
    
    static deleteUser(){
        return axios.get(baseUrl+"/users/delete",{withCredentials:true })
    }
    

    static deleteAllItems(itemName){
        return axios.post(baseUrl+"/users/deleteAllItems",{
            itemName
        })
    }


    static createItem(itemName){
        return axios.post(baseUrl+"/users/createItem",{
            itemName
        })
    }
    
}

export default Services;