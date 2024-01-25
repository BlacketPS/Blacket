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
