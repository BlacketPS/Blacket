import { Navigate, Link } from "react-router-dom";
import { useLoading } from "@stores/LoadingStore";
import { useUser } from "@stores/UserStore";
import { useFriendRequests } from "@controllers/settings";
import { SidebarBody, PageHeader } from "@components";
import { Container, SettingsContainer, PlanText, UpgradeButton } from "@components/Settings";
import { ClearButton } from "@components/Buttons";

export default function Settings() {
    const { setLoading } = useLoading();
    const { user } = useUser();

    const setFriendRequests = useFriendRequests();

    const friendRequestsButton = () => {
        setLoading("Changing settings");
        setFriendRequests(user.settings.friendRequests === "on" ? "mutual" : user.settings.friendRequests === "mutual" ? "off" : user.settings.friendRequests === "off" ? "on" : "on")
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
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
            </SettingsContainer>

            <SettingsContainer header={{ icon: "fas fa-clipboard-list", text: "Plan" }}>
                <PlanText>Basic</PlanText>
                <UpgradeButton>Upgrade</UpgradeButton>
            </SettingsContainer>

            <SettingsContainer header={{ icon: "fas fa-pencil-alt", text: "Edit Info" }}>
                <ClearButton>Change Username</ClearButton>
                <ClearButton>Change Password</ClearButton>
                <ClearButton>{user.settings.otpSecret ? "Disable" : "Enable"} OTP / 2FA</ClearButton>
            </SettingsContainer>

            <SettingsContainer header={{ icon: "fas fa-cog", text: "General" }}>
                <ClearButton onClick={friendRequestsButton}>Friend Requests: {user.settings.friendRequests.charAt(0).toUpperCase() + user.settings.friendRequests.slice(1)}</ClearButton>
            </SettingsContainer>

            <SettingsContainer header={{ icon: "fas fa-lock", text: "Privacy" }}>
                <Link to="/terms">Terms of Service</Link>
                <Link to="/privacy">Privacy Policy</Link>
            </SettingsContainer>
        </Container>
    </SidebarBody>)
}