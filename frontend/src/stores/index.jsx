import { LoadingStoreProvider } from "./LoadingStore";
import { ModalStoreProvider } from "./ModalStore";
import { UserStoreProvider } from "./UserStore";
import { LeaderboardStoreProvider } from "./LeaderboardStore";

export default function StoreWrapper({ children }) {
    return (
        <LoadingStoreProvider>
            <UserStoreProvider>
                <ModalStoreProvider>
                    <LeaderboardStoreProvider>
                        {children}
                    </LeaderboardStoreProvider>
                </ModalStoreProvider>
            </UserStoreProvider>
        </LoadingStoreProvider>
    )
}
