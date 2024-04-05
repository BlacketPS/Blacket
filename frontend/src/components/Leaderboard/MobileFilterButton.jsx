import { ClearButton } from "@components/Buttons";
import styles from "@styles";

/**
 * The ilter button component for mobile devices.
 * @param {Object} props The properties for this component.
 * @param {Object} props.children The children of the component.
 * @param {Object} props.props The remaining properties for the component.
 * @returns {JSX.Element} The mobile filter button component.
 */
export default function MobileFilterButton({ children, ...props }) {
    return <ClearButton className={styles.leaderboard.mobileFilterButton} {...props}>Sorting By: {children}</ClearButton>;
}