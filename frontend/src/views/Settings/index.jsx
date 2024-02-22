import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { useLoading } from "@stores/LoadingStore";
import { useModal } from "@stores/ModalStore";
import { useUser } from "@stores/UserStore";
import { useFriendRequests } from "@controllers/settings";
import { SidebarBody, PageHeader } from "@components";
import { Container, SettingsContainer, PlanText, UpgradeButton } from "@components/Settings";
import { ClearButton } from "@components/Buttons";
import { ErrorModal } from "@components/Modals";
import { LogoutModal } from "@components/Modals/TopRight";
import { ChangeUsernameModal, ChangePasswordModal, EnableOTPModal, DisableOTPModal } from "@components/Modals/Settings";

export default function Settings() {
    const [modalAnimation, setModalAnimation] = useState(localStorage.getItem("DISABLE_MODAL_ANIMATION") ? false : true);

    const { setLoading } = useLoading();
    const { createModal } = useModal();
    const { user } = useUser();

    const setFriendRequests = useFriendRequests();

    const friendRequestsButton = () => {
        setLoading("Changing settings");
        setFriendRequests(user.settings.friendRequests === "on" ? "mutual" : user.settings.friendRequests === "mutual" ? "off" : user.settings.friendRequests === "off" ? "on" : "on")
            .catch(() => createModal(<ErrorModal>Unable to change settings.</ErrorModal>))
            .finally(() => setLoading(false));
    }

    const modalAnimationButton = () => {
        if (localStorage.getItem("DISABLE_MODAL_ANIMATION")) {
            localStorage.removeItem("DISABLE_MODAL_ANIMATION");
            setModalAnimation(true);
        } else {
            localStorage.setItem("DISABLE_MODAL_ANIMATION", true);
            setModalAnimation(false);
        }
    }

    if (!user) return <Navigate to="/login" />;
    else return (<SidebarBody>
        <PageHeader>Settings</PageHeader>

        <Container>
            <SettingsContainer header={{ icon: "fas fa-user", text: "Profile" }}>
                <div><b>ID:</b> {user.id}</div>
                <div><b>Username:</b> {user.username}</div>
                <div><b>Title:</b> {user.title}</div>
                <div><b>Joined:</b> {`${new Date(user.createdAt).toLocaleDateString()} ${new Date(user.createdAt).toLocaleTimeString()}`}</div>
                <ClearButton onClick={() => createModal(<LogoutModal />)}>Logout</ClearButton>
            </SettingsContainer>

            <SettingsContainer header={{ icon: "fas fa-clipboard-list", text: "Plan" }}>
                <PlanText>Basic</PlanText>
                <UpgradeButton>Upgrade</UpgradeButton>
            </SettingsContainer>

            <SettingsContainer header={{ icon: "fas fa-pencil-alt", text: "Edit Info" }}>
                <ClearButton onClick={() => createModal(<ChangeUsernameModal />)}>Change Username</ClearButton>
                <ClearButton onClick={() => createModal(<ChangePasswordModal />)}>Change Password</ClearButton>
                <ClearButton onClick={() => {
                    if (!user.settings.otpEnabled) createModal(<EnableOTPModal />);
                    else createModal(<DisableOTPModal />);
                }}>{user.settings.otpEnabled ? "Disable" : "Enable"} OTP / 2FA</ClearButton>
            </SettingsContainer>

            <SettingsContainer header={{ icon: "fas fa-cog", text: "General" }}>
                <ClearButton onClick={friendRequestsButton}>Friend Requests: {user.settings.friendRequests.charAt(0).toUpperCase() + user.settings.friendRequests.slice(1)}</ClearButton>
            </SettingsContainer>

            <SettingsContainer header={{ icon: "fas fa-palette", text: "Theme (will be changed)" }}>
                <Tooltip id="modalAnimation" place="right" effect="solid">This will disable the zoom in out animation on popups.</Tooltip>
                <ClearButton data-tooltip-id="modalAnimation" onClick={modalAnimationButton}>Modal Animation: {modalAnimation ? "On" : "Off"}</ClearButton>

                {
                    /*<ClearButton onClick={() => {
                    const style = document.createElement("style");
                    style.id = "theme";
                    style.innerHTML = `:root {
                        --background-opacity: 0.0175;
                        --background-color: #000000;
                        --primary-color: #0b0b0b;
                        --secondary-color: #1b1b1b;
                        --accent-color: #ffffff;
                    }`;
                    document.body.appendChild(style);
                }}>
                    amoled theme (experimental)
                </ClearButton>
                <ClearButton onClick={() => {
                    const style = document.getElementById("theme");
                    if (style) style.remove();
                }}>
                    revert to default theme
                </ClearButton>*/
                }
            </SettingsContainer>

            <SettingsContainer header={{ icon: "fas fa-lock", text: "Privacy" }}>
                <Link to="/terms">Terms of Service</Link>
                <Link to="/privacy">Privacy Policy</Link>
            </SettingsContainer>
        </Container>
    </SidebarBody>)
}