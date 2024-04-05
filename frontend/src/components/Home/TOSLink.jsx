import { Link } from "react-router-dom";
import styles from "@styles";

/**
 * The terms of service link component.
 * @returns {JSX.Element} The terms of service link component.
 */
export default function TOSLink() {
    return <Link to="/terms" className={styles.home.termsOfServiceLink}>Terms of Service</Link>;
}