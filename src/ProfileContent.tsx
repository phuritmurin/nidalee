import React from "react";
import {GoogleLoginResponse} from "react-google-login";

export default function ProfileContent(profile: GoogleLoginResponse['profileObj']) {
    return (
        <>
            <img src={profile.imageUrl} alt={"user image"}/>
            <h3>User Logged In</h3>
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
            <br/>
            <br/>
        </>
    )
}