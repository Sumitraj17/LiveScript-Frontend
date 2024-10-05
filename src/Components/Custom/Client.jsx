import React from "react";
import Avatar from 'react-avatar'
const Client=({userName})=>{

    return(
        <div className="flex flex-col justify-center items-center">
            <Avatar name={userName} size={50} round="14px"/>
            <span className="text-sm text-center">{userName}</span>
        </div>
    )
}
export default Client;