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
import { ButtonHolder, Category, PacksWrapper, Pack } from "@components/Market";
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

    const purchasePack = (pack) => new Promise((resolve, reject) => {
        if (user.settings.openPacksInstantly) setLoading(`Opening ${pack.name} Pack`);

        setTimeout(() => {
            reject({ data: { message: "Failed to open pack." } });
        }, 1000);
    });

    return (<SidebarBody>
        <PageHeader>Market</PageHeader>

        <ButtonHolder>
            <LittleButton onClick={toggleInstantOpen}>Instant Open: {user.settings.openPacksInstantly ? "On" : "Off"}</LittleButton>
        </ButtonHolder>

        <Category header={`Packs (${packs.length})`} internalName="MARKET_PACKS">
            <PacksWrapper>
                {packs.map(pack => <Pack key={pack.id} image={pack.image} innerColor={pack.innerColor} outerColor={pack.outerColor} price={pack.price} onClick={() => {
                    if (!user.settings.openPacksInstantly) createModal(<OpenPackModal pack={pack} onYesButton={purchasePack} />);
                    else purchasePack(pack);
                }} />)}
            </PacksWrapper>
        </Category>

        <Category header="Weekly Shop" internalName="MARKET_WEEKLY_SHOP">
            There are no items in the weekly shop.
        </Category>

        <Category header="Item Shop" internalName="MARKET_ITEM_SHOP">
            There are no items in the item shop.
        </Category>
    </SidebarBody>)
}