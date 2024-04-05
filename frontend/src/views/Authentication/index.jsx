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
    // Use all necessary hooks.
    const { setLoading } = useLoading();
    const { user } = useUser();
    const { createModal } = useModal();

    if (user) return <Navigate to="/dashboard" />;

    // Be able to authenticate.
    const login = useLogin();
    const register = useRegister();

    // All necessary states for the form and errors.
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [accessCode, setAccessCode] = useState("");

    const [checked, setChecked] = useState(false);

    const [error, setError] = useState(null);

    /**
     * Submits the form to log in or register.
     * @returns {Promise<void>} The result of the login or register attempt.
     */
    const submitForm = async () => {
        // Verify the user has input all necessary information properly.
        if (username === "") return setError("Where's the username?");
        if (password === "") return setError("Where's the password?");

        if (!/^[a-zA-Z0-9_-]+$/.test(username)) return setError("Username can only contain letters, numbers, underscores, and dashes.");

        // Is the user logging in or registering?
        if (type === "Login") {
            setLoading("Logging in");

            login(username, password, null)
                .then(res => {
                    // User has OTP enabled? Prompt for OTP.
                    if (res === "codeRequired") createModal(<OtpModal username={username} password={password} />);
                    else navigate("/dashboard");
                })
                .catch(err => err?.data?.message ? setError(err.data.message) : setError("Something went wrong."))
                .finally(() => setLoading(false));
        }
        else if (type === "Register") {
            if (!checked) return setError("You must agree to our Privacy Policy and Terms of Service.");
            
            setLoading("Registering");

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
