import { GenericButton } from "@components/Buttons";
import styles from "@styles";

export default function RightButton({ children, ...props }) {
    return (
        <GenericButton backgroundColor="var(--primary-color)" className={styles.blooks.rightButton} {...props}>
            <div className={styles.blooks.rightButtonInside}>
                <img src="/content/token.png" />
                {children}
            </div>
        </GenericButton>
    )
}