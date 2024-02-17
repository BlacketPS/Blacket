import { GenericButton } from "@components/Buttons";
import styles from "@styles";

export default function RightButton({ children }) {
    return (
        <GenericButton backgroundColor="var(--primary-color)" className={styles.blooks.rightButton}>
            <div className={styles.blooks.rightButtonInside}>
                <img src="/content/token.png" />
                {children}
            </div>
        </GenericButton>
    )
}