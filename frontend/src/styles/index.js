import all from "./all.module.scss";
import errors from "./errors.module.scss";
import textFormatting from "./textFormatting.module.scss";
import buttons from "./buttons.module.scss";
import modal from "./modal.module.scss";
import home from "./home.module.scss";
import authentication from "./authentication.module.scss";
import sidebar from "./sidebar.module.scss";
import topRight from "./topRight.module.scss";
import dashboard from "./dashboard.module.scss";
import leaderboard from "./leaderboard.module.scss";
import settings from "./settings.module.scss";

export default {
    all,
    errors,
    textFormatting,
    buttons,
    modal,
    home,
    authentication,
    sidebar,
    topRight,
    dashboard,
    leaderboard,
    settings
}

const env = {
    backgroundOpacity: import.meta.env.VITE_THEME_BACKGROUND_OPACITY,
    backgroundColor: import.meta.env.VITE_THEME_BACKGROUND_COLOR,
    primaryColor: import.meta.env.VITE_THEME_PRIMARY_COLOR,
    secondaryColor: import.meta.env.VITE_THEME_SECONDARY_COLOR,
    accentColor: import.meta.env.VITE_THEME_ACCENT_COLOR
}

if (env.backgroundOpacity !== "null") document.querySelector(":root").style.setProperty("--background-opacity", env.backgroundOpacity);
if (env.backgroundColor !== "null") document.querySelector(":root").style.setProperty("--background-color", env.backgroundColor);
if (env.primaryColor !== "null") document.querySelector(":root").style.setProperty("--primary-color", env.primaryColor);
if (env.secondaryColor !== "null") document.querySelector(":root").style.setProperty("--secondary-color", env.secondaryColor);
if (env.accentColor !== "null") document.querySelector(":root").style.setProperty("--accent-color", env.accentColor);