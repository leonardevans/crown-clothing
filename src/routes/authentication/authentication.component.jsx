import SignUpForm from "../../components/sign-up-form/sign-up-form.component.jsx";
import SignInForm from "../../components/sign-in-form/sign-in-form.component.jsx";

import './authentication.styles.scss';

const Authentication = () => {
    return(
        <div className="authentication-container">
            <SignInForm/>
            <SignUpForm/>

            {/* <button onClick={signInWithGoogleRedirect}>
                Sign In With Google Redirect
            </button> */}
        </div>
    )
}

export default Authentication;