import { Navigate } from "react-router-dom";
import { useLoading } from "@stores/LoadingStore";
import { useUser } from "@stores/UserStore";
import { useModal } from "@stores/ModalStore";
import { packs } from "@stores/PackStore";
import { blooks } from "@stores/BlookStore";
import { useOpenPacksInstantly } from "@controllers/settings/market";
import { ErrorModal } from "@components/Modals";
import { OpenPackModal } from "@components/Modals/Market";
import { SidebarBody, PageHeader } from "@components";
import { ButtonHolder, PacksWrapper, Pack } from "@components/Market";
import { LittleButton } from "@components/Buttons";

export default function Market() {
    const { setLoading } = useLoading();
    const { createModal } = useModal();
    const { user } = useUser();

    if (!user) return <Navigate to="/login" />;

    const setInstantOpen = useOpenPacksInstantly();

    const toggleInstantOpen = () => {
        setLoading("Changing settings");
        setInstantOpen(!user.settings.openPacksInstantly)
            .then(() => setLoading(false))
            .catch(() => createModal(<ErrorModal>Failed to change settings.</ErrorModal>))
            .finally(() => setLoading(false));
    }

    return (<SidebarBody>
        <PageHeader>Market</PageHeader>

        <ButtonHolder>
            <LittleButton onClick={toggleInstantOpen}>Instant Open: {user.settings.openPacksInstantly ? "On" : "Off"}</LittleButton>
        </ButtonHolder>

        <PacksWrapper>
            {packs.map(pack => <Pack key={pack.id} image={pack.image} innerColor={pack.innerColor} outerColor={pack.outerColor} price={pack.price} onClick={() => {
                createModal(<OpenPackModal pack={pack.id} />);
            }} />)}
        </PacksWrapper>
    </SidebarBody>)
}