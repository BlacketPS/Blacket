import { useNavigate } from "react-router-dom";
import { GenericButton } from "@components/Buttons";
import styles from "@styles";

/**
 * The upgrade button component. This button will navigate to the store.
 * @param {Object} props The properties for this component.
 * @param {Object} props.children The children of the component.
 * @param {Object} props.props The remaining properties for the component.
 * @returns {JSX.Element} The upgrade button component.
 */
export default function UpgradeButton({ children, ...props }) {
    const navigate = useNavigate();

    return <GenericButton className={styles.settings.upgradeButton} onClick={() => navigate("/store")} {...props}>{children}</GenericButton>;
}