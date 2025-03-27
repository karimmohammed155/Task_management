import { Error_handler_class } from "../utils/error-class.utils.js"

export const authorization=(allowed_roles)=>{
    return(req,res,next)=>{
        const user=req.authUser
        if(!allowed_roles.includes(user.role)){
            return next(new Error_handler_class(
                "authorization error",
                401,
                "you are not allowed to access this route"
            ))
        }
        next()
    }
}