import { LoadingStoreProvider } from "./LoadingStore";
import { UserStoreProvider } from "./UserStore";
import { ModalStoreProvider } from "./ModalStore";

export default function StoreWrapper({ children }) {
    return (
        <LoadingStoreProvider>
            <UserStoreProvider>
                <ModalStoreProvider>
                    {children}
                </ModalStoreProvider>
            </UserStoreProvider>
        </LoadingStoreProvider>
    )
}
