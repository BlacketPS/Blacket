import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import styles from "@styles";

export default function Sidebar() {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const location = useLocation().pathname.split("/")[1];

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
            /*{
                icon: "fas fa-scroll",
                text: "Quests",
                link: "/quests"
            },*/
            {
                icon: "fas fa-scale-balanced",
                text: "Trading Plaza",
                link: "/trading-plaza",
                textSizeOverride: 18
            },
            {
                icon: "fas fa-swords",
                text: "Guilds",
                link: "/guilds"
            },
            {
                icon: "fas fa-store",
                text: "Market",
                link: "/market"
            },
            {
                icon: "fas fa-suitcase",
                text: "Blooks",
                link: "/blooks"
            },
            {
                icon: "fas fa-building-columns",
                text: "Auction House",
                link: "/auction-house",
                textSizeOverride: 17
            },
            {
                icon: "fas fa-box-open",
                text: "Inventory",
                link: "/inventory"
            },
            {
                icon: "fas fa-cog",
                text: "Settings",
                link: "/settings"
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
                text: "X",
                link: "/twitter"
            }
        ]
    }

    return (<>
        <div className={styles.sidebar.sidebar}>
            <Link className={styles.sidebar.header} to="/">{import.meta.env.VITE_INFORMATION_NAME}</Link>

            {pages.left.map((page, index) => (
                <Link data-active={location === page.link.split("/")[1]} key={index} className={styles.sidebar.page} to={page.link}>
                    <i className={`${styles.sidebar.pageIcon} ${page.icon}`} />
                    <div className={styles.sidebar.pageText} style={{ fontSize: page.textSizeOverride || 20 }}>{page.text}</div>
                </Link>
            ))}

            <div className={styles.sidebar.bottom}>
                {pages.bottom.map((page, index) => (
                    <Link key={index} className={styles.sidebar.bottomPage} to={page.link} data-tooltip-id={page.link}>
                        <Tooltip id={page.link} place="top">{page.text}</Tooltip>

                        <i className={`${styles.sidebar.bottomPageIcon} ${page.icon}`} />
                    </Link>
                ))}
            </div>
        </div>

        <div className={styles.sidebar.mobileNavbar}>
            <Link className={styles.sidebar.mobileHeader} to="/">{import.meta.env.VITE_INFORMATION_NAME}</Link>

            <i className={`${styles.sidebar.mobileHamburgerIcon} fas fa-bars`} onClick={() => setMobileSidebarOpen(true)} />
        </div>

        {mobileSidebarOpen && <div className={styles.sidebar.mobileSidebarModal} onClick={() => setMobileSidebarOpen(false)} />}
        <div className={styles.sidebar.mobileSidebar} data-open={mobileSidebarOpen}>
            <i className={`${styles.sidebar.mobileCloseIcon} fas fa-times`} onClick={() => setMobileSidebarOpen(false)} />

            {pages.left.map((page, index) => (
                <Link key={index} className={styles.sidebar.page} onClick={() => setMobileSidebarOpen(false)} data-active={location === page.link.split("/")[1]} to={page.link}>
                    <i className={`${styles.sidebar.pageIcon} ${page.icon}`} />
                    <div className={styles.sidebar.pageText} style={{ fontSize: page.textSizeOverride || 20 }}>{page.text}</div>
                </Link>
            ))}

            <div className={styles.sidebar.bottom}>
                {pages.bottom.map((page, index) => (
                    <Link key={index} className={styles.sidebar.bottomPage} onClick={() => setMobileSidebarOpen(false)} to={page.link} data-tooltip-id={page.link}>
                        <Tooltip id={page.link} place="top">{page.text}</Tooltip>

                        <i className={`${styles.sidebar.bottomPageIcon} ${page.icon}`} />
                    </Link>
                ))}
            </div>
        </div>
    </>)
}