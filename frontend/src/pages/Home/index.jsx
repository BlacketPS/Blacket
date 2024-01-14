import HomeContentContainer from "@components/Home/HomeContentContainer";
import FallingBlooksImage from "@components/Home/FallingBlooksImage";
import Background from "@components/Background";
import Divider from "@components/Home/Divider";
import TopText from "@components/Home/TopText";
import WelcomeContentContainer from "@components/Home/WelcomeContentContainer";
import WelcomeText from "@components/Home/WelcomeText";
import WelcomeDescription from "@components/Home/WelcomeDescription";
import WelcomeButtons from "@components/Home/WelcomeButtons";
import PronunciationButton from "@components/Home/PronunciationButton";
import TopButtons from "@components/Home/TopButtons";
import CopyrightInformation from "@components/Home/CopyrightInformation";
import Version from "@components/Home/Version";
import TOSLink from "@components/Home/TOSLink";

export default function Home() {
    document.title = import.meta.env.VITE_INFORMATION_NAME;

    return (
        <>
            <HomeContentContainer>
                <FallingBlooksImage />

                <Background />

                <Divider />

                <TopText />

                <WelcomeContentContainer>
                    <WelcomeText />
                    <WelcomeDescription />

                    <WelcomeButtons />

                    {import.meta.env.VITE_INFORMATION_PRONUNCIATION !== "" && <PronunciationButton />}
                </WelcomeContentContainer>
            </HomeContentContainer>

            <TopButtons />

            <CopyrightInformation />

            <Version />
            <TOSLink />
        </>
    )
}