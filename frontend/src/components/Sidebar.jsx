import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import styles from "@styles";

export default function Sidebar() {
    const pages = {
        left: [
            {
                icon: "fas fa-home",
                text: "Dashboard",
                link: "/dashboard"
            },
            {
                icon: "fas fa-trophy",
                text: "Leaderboard",
                link: "/leaderboard"
            },
            {
                icon: "fas fa-comments",
                text: "Chat",
                link: "/chat"
            },
            {
                icon: "fas fa-scale-balanced",
                text: "Trading",
                link: "/trading"
            },
            {
                icon: "fas fa-swords",
                text: "Guilds",
                link: "/guilds"
            },
            {
                icon: "fas fa-suitcase",
                text: "Blooks",
                link: "/blooks"
            },
            {
                icon: "fas fa-store",
                text: "Market",
                link: "/market"
            },
            {
                icon: "fas fa-box-open",
                text: "Inventory",
                link: "/inventory"
            },
            {
                icon: "fas fa-building-columns",
                text: "Auction",
                link: "/auction"
            },
            {
                icon: "fas fa-gavel",
                text: "Bazaar",
                link: "/bazaar"
            },
            {
                icon: "fas fa-newspaper",
                text: "News",
                link: "/news"
            }
        ],
        bottom: [
            {
                icon: "fas fa-user",
                text: "Credits",
                link: "/credits"
            },
            {
                icon: "fab fa-discord",
                text: "Discord",
                link: "/discord"
            },
            {
                icon: "fab fa-github",
                text: "GitHub",
                link: "/github"
            },
            {
                icon: "fab fa-youtube",
                text: "YouTube",
                link: "/youtube"
            },
            {
                icon: "fab fa-x-twitter",
                text: "Twitter",
                link: "/twitter"
            }
        ]
    }

    return (
        <>
            <div className={styles.all.sidebar}>
                <Link className={styles.all.sidebarHeader} to="/">{import.meta.env.VITE_INFORMATION_NAME}</Link>

                {pages.left.map((page, index) => (
                    <Link key={index} className={styles.all.sidebarPage} to={page.link}>
                        <i className={`${styles.all.sidebarPageIcon} ${page.icon}`} />
                        <div className={styles.all.sidebarPageText}>{page.text}</div>
                    </Link>
                ))}

                <div className={styles.all.sidebarBottom}>
                    {pages.bottom.map((page, index) => (
                        <Link key={index} className={styles.all.sidebarBottomPage} to={page.link} data-tooltip-id={page.link}>
                            <Tooltip id={page.link} place="top">{page.text}</Tooltip>

                            <i className={`${styles.all.sidebarBottomPageIcon} ${page.icon}`} />
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}