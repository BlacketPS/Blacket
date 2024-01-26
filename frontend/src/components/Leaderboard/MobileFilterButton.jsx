import { ClearButton } from "@components/Buttons";
import styles from "@styles";

export default function MobileFilterButton({ children, ...props }) {
    return <ClearButton className={styles.leaderboard.mobileFilterButton} {...props}>Sorting By: {children}</ClearButton>;
}