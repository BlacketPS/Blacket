import { LoadingStoreProvider } from "./LoadingStore";
import { UserStoreProvider } from "./UserStore";

export default function StoreWrapper({ children }) {
    return (
        <LoadingStoreProvider>
            <UserStoreProvider>
                {children}
            </UserStoreProvider>
        </LoadingStoreProvider>
    )
}