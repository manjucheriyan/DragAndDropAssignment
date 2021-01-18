const {User}= require("../models/users");

let currentUser;


function getUsers(){
    return User.find({}) 
    .then (users=>{
            return{
                statusCode:200,
                users:users
            }
    })
}



function createItem1(task){
    return User.findOne({
        task
    })
    .then (user=>{
        if(user){
            return{
                statusCode:400,
                message:"task already exists"
            }
        }
        const newUser= new User({
            task
        });
        newUser.save();

        return {
            statusCode:200,
            message:"task created successfully"
        }
    })
    
}

function createItem(task){
    User.deleteMany({ task: { $ne : "" } })
    .then(function(){ 
        const newUser= new User({task });
        newUser.save();
        return {
            statusCode:200,
            message:"task created successfully"
        } 
      
    })    
}


function deleteAllItems(){
    
    return User.deleteMany({ username: { $ne : "" } })
    .then (users=>{
        return{
            statusCode:200,
            message:"Deleted All Items successfully"
        }
    })    
}  
    


function deleteUser(username){
    console.log('DeleteUser Function in Bank.js')
    return User.findOne({
        username
    })
    .then (user=>{
        if(user){
            user.delete();
            return{
                statusCode:200,
                message:"Deleted user successfully"
            }
        }
        return {
            statusCode:200,
            message:"Deletion Failed"
        }
    })

}

function setCurrentUser(username){
    console.log("Express Bank setCurrentUSer"+username)
    currentUser=username;
}

function getCurrentUser(){
    return currentUser;
}


module.exports={
    getUsers:getUsers,
    deleteAllItems:deleteAllItems,
    createItem:createItem,
    createItem1:createItem1,
    setCurrentUser:setCurrentUser,
    getCurrentUser:getCurrentUser,
    deleteUser:deleteUser
    }