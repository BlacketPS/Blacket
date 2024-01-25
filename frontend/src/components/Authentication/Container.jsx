import styles from "@styles";

export default function Container({ children }) {
    return <form className={styles.authentication.container}>{children}</form>;
}