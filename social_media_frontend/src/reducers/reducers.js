const initailState = {
        user_id: "",
        email_id: "",
        users_list: [],
        pending_users: [],
        accept_users: []
}


export default function (state=initailState, action) {
    const {type, payload} = action;

    switch (type) {
        case "UserLogInSuccess":{
            return {
                ...state,
                user_id: payload["user_id"],
                user_name: payload["user_name"],
                email_id: payload["email_id"]
                }
            }
        case "GetAllUsersSuccess":
            return {
                ...state,
                users_list: payload
            } 
        case "GetPendingUsersSuccess":
            return {
                ...state,
                pending_users: payload
            }
        case "GetAcceptUsersSuccess":
            return {
                ...state,
                accept_users: payload
            }
        default:
            return state
    }
}    