/**
 * @file Defines the Authentication view. This view allows for logging in and registering.
 */

import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useLoading } from "@stores/LoadingStore";
import { useUser } from "@stores/UserStore";
import { useModal } from "@stores/ModalStore";
import { useLogin, useRegister } from "@controllers/auth";
import { HeaderBody, Input } from "@components";
import { Container, Header, AgreeHolder, SubmitButton, ErrorContainer } from "@components/Authentication";
import { OtpModal } from "@components/Modals/Authentication";

/**
 * The Authentication view. This view allows for logging in and registering.
 * @param {Object} props The component's properties.
 * @param {String} props.type The type of authentication to perform.
 * @returns {JSX.Element} The Authentication component.
 */
export default function Authentication({ type }) {
    // Be able to set the loading state.
    const { setLoading } = useLoading();
    // Get the current user information.
    const { user } = useUser();
    // Be able to create modals.
    const { createModal } = useModal();

    // If the user is already logged in, redirect them to the dashboard.
    if (user) return <Navigate to="/dashboard" />;

    // Be able to log in and register.
    const login = useLogin();
    // Be able to register.
    const register = useRegister();

    // The username, password, and access code fields.
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [accessCode, setAccessCode] = useState("");

    // The checked state for the agreement.
    const [checked, setChecked] = useState(false);

    // Has an error occurred?
    const [error, setError] = useState(null);

    // Allow the user to submit the form.
    const submitForm = async () => {
        // If the username or password is empty, set an error.
        if (username === "") return setError("Where's the username?");
        if (password === "") return setError("Where's the password?");

        // If the username is invalid, set an error.
        if (!/^[a-zA-Z0-9_-]+$/.test(username)) return setError("Username can only contain letters, numbers, underscores, and dashes.");

        // Is the user logging in or registering?
        if (type === "Login") {
            // The user has input all the necessary information: attempt to log in!
            
            // Set the loading state and attempt to log in.
            setLoading("Logging in");

            // You can then log in. Make sure to navigate to the dashboard after logging in or display an error if something goes wrong.
            login(username, password, null)
                .then(res => {
                    // If the user needs to input an OTP code, create a modal for it.
                    if (res === "codeRequired") createModal(<OtpModal username={username} password={password} />);
                    else navigate("/dashboard");
                })
                .catch(err => err?.data?.message ? setError(err.data.message) : setError("Something went wrong."))
                .finally(() => setLoading(false));
        }
        else if (type === "Register") {
            // The user has input all the necessary information: attempt to register!
            
            // If the user has not agreed to the terms of service and privacy policy, set an error.
            if (!checked) return setError("You must agree to our Privacy Policy and Terms of Service.");
            
            // Set the loading state and attempt to register.
            setLoading("Registering");

            // You can then register. Make sure to navigate to the dashboard after registering or display an error if something goes wrong.
            register(username, password, accessCode, checked)
                .then(() => navigate("/dashboard"))
                .catch(err => err?.data?.message ? setError(err.data.message) : setError("Something went wrong."))
                .finally(() => setLoading(false));
        }
    }

    return (
        <HeaderBody>
            <Container>
                <Header>{type}</Header>

                <Input icon="fas fa-user" placeholder="Username" type="text" autoComplete="username" maxLength={16} onChange={e => {
                    setUsername(e.target.value);
                    setError(null);
                }} onKeyDown={e => e.key === "Enter" && submitForm()} />

                <Input icon="fas fa-lock" placeholder="Password" type="password" autoComplete="password" onChange={e => {
                    setPassword(e.target.value);
                    setError(null);
                }} onKeyDown={e => e.key === "Enter" && submitForm()} />

                {type === "Register" && <Input icon="fas fa-lock" placeholder="Access Code" type="password" autoComplete="rewriteAccessCode" onChange={e => {
                    setAccessCode(e.target.value);
                    setError(null);
                }} onKeyDown={e => e.key === "Enter" && submitForm()} />}

                {type === "Register" && <AgreeHolder checked={checked} onClick={() => setChecked(!checked) && setError(null)} />}

                <SubmitButton onClick={submitForm}>Let's Go!</SubmitButton>

                {error && <ErrorContainer>{error}</ErrorContainer>}
            </Container>
        </HeaderBody>
    )
}
