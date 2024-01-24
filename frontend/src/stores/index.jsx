import { LoadingStoreProvider } from "./LoadingStore";
import { ModalStoreProvider } from "./ModalStore";
import { UserStoreProvider } from "./UserStore";
import { LeaderboardStoreProvider } from "./LeaderboardStore";

export default function StoreWrapper({ children }) {
    return (
        <LoadingStoreProvider>
            <ModalStoreProvider>
                <UserStoreProvider>
                    <LeaderboardStoreProvider>
                        {children}
                    </LeaderboardStoreProvider>
                </UserStoreProvider>
            </ModalStoreProvider>
        </LoadingStoreProvider>
    )
}
