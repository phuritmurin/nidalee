import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import Header from "./Header";
import {gapi} from "gapi-script";
import {GoogleLogin, GoogleLoginResponse, GoogleLogout} from "react-google-login";
import ProfileContent from "./ProfileContent";

const clientId = '972740358500-k96q35vgangseogmf2f9amuqalahminj.apps.googleusercontent.com';

const App = () => {

    const [profile, setProfile] = useState<GoogleLoginResponse['profileObj'] | null>(null)

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            })
        }
        gapi.load("client:auth2", initClient);
    }, []);

    const logOut = () => {
        setProfile(null)
    }

    const onSuccess = (res: any) => {
        setProfile(res.profileObj)
        console.log('success', res)
    }

    const onFailure = (res: any) => {
        console.log('failed', res)
    }

    return (
        <div className="text-3xl mx-auto max-w-6xl">
            <Header/>
            <h2>React Google Login</h2>
            <br/><br/>
            {profile ? (
                <div>
                    <ProfileContent {...profile} />
                    <GoogleLogout clientId={clientId} buttonText={"Logout"} onLogoutSuccess={logOut}/>
                </div>
            ) : <GoogleLogin clientId={clientId} buttonText={"Sign In"} onSuccess={onSuccess} onFailure={onFailure}
                             cookiePolicy={'single_host_origin'} isSignedIn={true}/>}

            <div className="my-10">Nidalee Content</div>
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById("app"));
