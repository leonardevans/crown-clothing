import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils.js";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component.jsx";

const Signin = () => {
    useEffect( () => {
        
        const response = async ()=>{
            return await getRedirectResult(auth);
        }

        if (response.user) {
            const userDocRef = createUserDocumentFromAuth(response.user);
        }

    }, []);

    const logGoogleUserPopup = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }


    return(
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGoogleUserPopup}>
                Sign In With Google Pop up
            </button>

            <SignUpForm/>

            {/* <button onClick={signInWithGoogleRedirect}>
                Sign In With Google Redirect
            </button> */}
        </div>
    )
}

export default Signin;