import { ClearButton } from "@components/Buttons";
import styles from "@styles";

export default function FilterButton({ children, ...props }) {
    return <ClearButton className={styles.leaderboard.filterButton} {...props}>Sorting By: {children}</ClearButton>
}