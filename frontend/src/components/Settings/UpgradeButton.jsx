import { useNavigate } from "react-router-dom";
import { GenericButton } from "@components/Buttons";
import styles from "@styles";

export default function UpgradeButton({ children, ...props }) {
    const navigate = useNavigate();

    return <GenericButton className={styles.settings.upgradeButton} onClick={() => navigate("/store")} {...props}>{children}</GenericButton>;
}