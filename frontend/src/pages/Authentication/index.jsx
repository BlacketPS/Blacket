import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useLoading } from "@stores/LoadingStore";
import { useUser } from "@stores/UserStore";
import useLogin from "@controllers/Authentication/useLogin";
import useRegister from "@controllers/Authentication/useRegister";
import Background from "@components/Background";
import { Header } from "@components/Header";
import BodyContainer from "@components/Authentication/BodyContainer";
import ContainerHeader from "@components/Authentication/ContainerHeader";
import Input from "@components/Authentication/Input";
import AgreeHolder from "@components/Authentication/AgreeHolder";
import SubmitButton from "@components/Authentication/SubmitButton";
import Error from "@components/Authentication/Error";

export default function Authentication({ type }) {
    document.title = `${type} | ${import.meta.env.VITE_INFORMATION_NAME}`;

    const { setLoading } = useLoading();
    const { user } = useUser();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState(null);

    const login = useLogin();
    const register = useRegister();

    const submitForm = async () => {
        if (username === "") return setError("Where's the username?");
        if (password === "") return setError("Where's the password?");
        if (password.length < 8) return setError("Your password must be at least 8 characters long.");
        if (!/\d/.test(password)) return setError("Your password must have at least 1 number.");
        if (!/[A-Z]/.test(password)) return setError("Your password must have at least 1 uppercase letter.");
        if (!/[a-z]/.test(password)) return setError("Your password must have at least 1 lowercase letter.");
        if (/^[a-z0-9]+$/i.test(password)) return setError("Your password must contain a special character.");
        if (type === "Login") {
            setLoading("Logging in");
            login(username, password).then(() => setLoading(false) && navigate("/dashboard")).catch(err => {
                setLoading(false);
                if (err?.response?.data?.message) setError(err.response.data.message);
                else setError("Something went wrong.");
            });
        }
        else if (type === "Register") {
            if (!checked) return setError("You must agree to our Privacy Policy and Terms of Service.");
            setLoading("Registering");
            register(username, password, checked).then(() => setLoading(false) && navigate("/dashboard")).catch(err => {
                setLoading(false);
                if (err?.response?.data?.message) setError(err.response.data.message);
                else setError("Something went wrong.");
            });
        }
    }

    if (user) return <Navigate to="/dashboard" />;
    else return (
        <>
            <Background />

            <Header right={{
                link: type === "Login" ? "/register" : "/login",
                text: type === "Login" ? "Register" : "Login"
            }} />

            <BodyContainer>
                <ContainerHeader>{type}</ContainerHeader>

                <Input icon="fas fa-user" placeholder="Username" type="text" autoComplete="username" maxLength={16} onChange={(e) => {
                    setUsername(e.target.value);
                    se
                    tError(null);
                }} onKeyDown={e => e.key === "Enter" && submitForm()} />

                <Input icon="fas fa-lock" placeholder="Password" type="password" autoComplete="password" onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                }} onKeyDown={e => e.key === "Enter" && submitForm()} />

                {type === "Register" && <AgreeHolder checked={checked} onClick={() => setChecked(!checked) && setError(null)} />}

                <SubmitButton onClick={submitForm}>Let's Go!</SubmitButton>

                {error && <Error error={error} />}
            </BodyContainer>
        </>
    )
}   