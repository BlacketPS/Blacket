import styles from "@styles";

export default function BodyContainer({ children }) {
    return (
        <div className={styles.all.regularBody}>
            <form className={styles.authentication.container}>
                {children}
            </form>
        </div>
    )
}