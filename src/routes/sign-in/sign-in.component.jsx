import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils.js";

const Signin = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return(
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGoogleUser}>
                Sign In With Google Pop up
            </button>
        </div>
    )
}

export default Signin;