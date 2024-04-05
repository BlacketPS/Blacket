/**
 * @file The Home page view. This view is responsible for displaying the home page, displaying the welcome message and the buttons to navigate to the login and register pages.
 */

import {
    HeaderContainer,
    FallingBlooks,
    Divider,
    TopText,
    WelcomeContainer,
    WelcomeText,
    WelcomeDescription,
    WelcomeButtons,
    PronunciationButton,
    TopButtons,
    Copyright,
    Version,
    TOSLink
} from "@components/Home";

/**
 * The Home page view.
 * @returns {JSX.Element} The Home page view.
 */
export default function Home() {
    return (<>
        <HeaderContainer>
            <FallingBlooks />

            <Divider />

            <TopText />

            <WelcomeContainer>
                <WelcomeText />
                <WelcomeDescription />

                <WelcomeButtons />

                {import.meta.env.VITE_INFORMATION_PRONUNCIATION !== "" && <PronunciationButton />}
            </WelcomeContainer>
        </HeaderContainer>

        <TopButtons />

        <Copyright />

        <Version />
        <TOSLink />
    </>)
}
