import { forwardRef } from "react";
import styles from "@styles";

/**
 * The context menu container component.
 * @param {Object} props The properties for this component.
 * @param {number} props.top The top position of the container.
 * @param {number} props.left The left position of the container.
 * @param {Object} props.children The children of the component.
 * @returns {JSX.Element} The context menu container component.
 */
const Container = forwardRef(({ top, left, children }, ref) => (<>
    <div className={styles.contextMenu.mobileModal} />
    <div ref={ref} className={styles.contextMenu.container} style={{ top, left }} onContextMenu={e => e.preventDefault()}>{children}</div>
</>));

export default Container;