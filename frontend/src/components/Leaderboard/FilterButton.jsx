import { ClearButton } from "@components/Buttons";
import styles from "@styles";

/**
 * The filter button component.
 * @param {Object} props The properties for this component.
 * @param {Object} props.children The children of the component.
 * @param {Object} props.props The remaining properties for the component.
 * @returns {JSX.Element} The filter button component.
 */
export default function FilterButton({ children, ...props }) {
    return <ClearButton className={styles.leaderboard.filterButton} {...props}>Sorting By: {children}</ClearButton>
}