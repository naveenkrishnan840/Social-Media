import axios from "axios";
import {message} from "antd";
axios.defaults.baseURL = "http://127.0.0.1:8081/";
export const register = ({payload, navigate}) => async dispatch=>  {
    try {
        console.log(axios);
        const data = ["RegisterUser", payload];
        const str_body = JSON.stringify(data)
        // const body = encode(str_body)
        const request = await axios({
            method: "POST",
            url: "social_media",
            headers: { Accept:'application/json',
                            'Content-Type': 'application/json',
                    //    'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].content
                    },
            data:str_body
        });
        // const request = await axios({'/movies?' + body})
        console.log(request)
        if (request["status"] === 200){
            const response = JSON.parse(request["data"])
            if (response[0] === "UserRegistrationSuccess"){
                message.success("Successfully Created Account")
                navigate.push("/signin");
            } else {
                message.info("Already have Account Please Log in")
            }
                
        } else {
            message.error("Submission Failed")
        }
        
    } catch (error) {
        
    }
}

export const SignIn = ({payload, navigate}) => async dispatch=>  {
    try {
        const data = ["LoginUser", payload];
        const str_body = JSON.stringify(data)
        const request = await axios({
            method: "POST",
            url: "social_media",
            headers: {  'Accept':'application/json',
                        'Content-Type': 'application/json'
                    },
            data:str_body
        });
        console.log(request)
        if (request["status"] === 200){
            const response = JSON.parse(request["data"])
            if (response[0] === "UserLogInSuccess"){
                message.success("Successfully Account Login")
                dispatch({
                        type: response[0],  
                    payload: response[1]
                })
                navigate.push("/home")
            } else {
                message.error("Invalid Login")
            }
                
        } else {
            message.error("Submission Failed")
        }
        
    } catch (error) {
        
    }
}

export const listOfAllUsers = ({user}) => async dispatch=>  {
    try {
        const data = ["GetAllUsers", {"user_id": user}];
        const str_body = JSON.stringify(data)
        const request = await axios({
            method: "POST",
            url: "social_media",
            headers: {  'Accept':'application/json',
                        'Content-Type': 'application/json'
                    },
            data:str_body
        });
        console.log(request)
        
        if (request["status"] === 200){
            const response = JSON.parse(request["data"]);
            dispatch({
                    type: response[0],  
                payload: response[1]
            });
        } else {
            message.error("Something Went Wrong")
        }
        
    } catch (error) {
        
    }
}

export const sendRequest = (user) => async dispatch=>  {
    try {
        const data = ["SendRequest", user];
        const str_body = JSON.stringify(data)
        const request = await axios({
            method: "POST",
            url: "social_media/send_request_check",
            headers: {  'Accept':'application/json',
                        'Content-Type': 'application/json'
                    },
            data:str_body
        });
        
        console.log(request)
        
        if (request["status"] === 200){
            const response = JSON.parse(request["data"])
            if (response[0] === "SendRequestSuccess"){
                message.success("Friend Request Successfully submitted");
                listOfAllUsers(user);

            } else if (response[0] === "SendRequestAlreadyExist"){
                message.info("Friend Request Already Accepted");
            } 
            else {
                message.error("Friend Request Pending")
            }
                
        } else {
            message.error("Submission Failed")
        }
        
    } catch (error) {
        
    }
}

export const changeStatus = (user) => async dispatch=>  {
    try {
        const data = ["ChangeStatus", user];
        const str_body = JSON.stringify(data)
        const request = await axios({
            method: "POST",
            url: "social_media",
            headers: {  'Accept':'application/json',
                        'Content-Type': 'application/json'
                    },
            data:str_body
        });
        
        console.log(request)
        
        if (request["status"] === 200){
            const response = JSON.parse(request["data"])
            if (response[0] === "StatusChanged"){
                message.success("Friend Request Status Changed");
                listOfAllUsers(user);
            }
                
        } else {
            message.error("Submission Failed")
        }
        
    } catch (error) {
        
    }
}


export const getPendingUsers = (user) => async dispatch=>  {
    try {
        const data = ["GetPendingUsers", user];
        const str_body = JSON.stringify(data)
        const request = await axios({
            method: "POST",
            url: "social_media",
            headers: {  'Accept':'application/json',
                        'Content-Type': 'application/json'
                    },
            data:str_body
        });
        
        console.log(request)
        
        if (request["status"] === 200){
            const response = JSON.parse(request["data"])
            dispatch({type:response[0], payload: response[1]})
                
        } else {
            message.error("Submission Failed")
        }
        
    } catch (error) {
        
    }
}


export const getAcceptUsers = (user) => async dispatch=>  {
    try {
        const data = ["GetAcceptUsers", user];
        const str_body = JSON.stringify(data)
        const request = await axios({
            method: "POST",
            url: "social_media",
            headers: {  'Accept':'application/json',
                        'Content-Type': 'application/json'
                    },
            data:str_body
        });
        
        console.log(request)
        
        if (request["status"] === 200){
            const response = JSON.parse(request["data"])
            dispatch({type:response[0], payload: response[1]})
                
        } else {
            message.error("Submission Failed")
        }
        
    } catch (error) {
        
    }
}
