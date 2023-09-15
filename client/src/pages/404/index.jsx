import React, { useEffect, } from "react";
import { TimelineMax, Power2, Bounce } from "gsap";

import styles from "./404.module.css";

export default function Error404() {
    useEffect(() => {
        let elements = [...document.querySelectorAll(`.${styles.title} > span`)];

        for (let i in elements) {
            let tlx = new TimelineMax({
                delay: i * 0.04,
                repeat: -1
            });

            tlx.set(elements[i], {
                scaleY: 0.5,
                yPercent: 25
            }).to(elements[i], {
                scaleY: 1.3,
                yPercent: -100,
                ease: Power2.easeOut,
                duration: 0.5
            }).to(elements[i], {
                scaleY: 1,
                yPercent: 0,
                ease: Bounce.easeOut,
                duration: 1
            }).to(elements[i], {
                scaleY: 0.5,
                yPercent: 25,
                ease: Power2.easeIn,
                duration: 0.5
            });
        }
    }, []);

    return (
        <>
            <div style={{ "position": "fixed", "width": "100%", "height": "100%", "left": "0", "top": "0", "backgroundColor": "#4f4f4f", "overflow": "hidden" }}>
                <div className={styles.background} style={{ backgroundImage: "url(\"/content/background.png\")" }}></div>
            </div>
            <div
                style={{ "display": "flex", "flexDirection": "column", "textAlign": "center", "justifyContent": "center", "alignItems": "center", "minWidth": "75%", "minHeight": "75%", "filter": "drop-shadow(0px 1px 5px black)", "borderRadius": "10px", "position": "absolute", "top": "50%", "left": "50%", "transform": "translate(-50%,-50%)", "backgroundColor": "#303030", "boxShadow": "inset 0 -8px rgb(0 0 0 / 20%), 0 0 4px rgb(0 0 0 / 15%)", "color": "white", "fontFamily": "Nunito, sans-serif" }}>
                <h1 className={styles.title}><span
                    style={{ "display": "inline-flex", "textAlign": "center", "justifyContent": "center", "alignItems": "center", "color": "white", "backgroundColor": "black", "borderRadius": "10px", "padding": "5px", "paddingBottom": "15px", "paddingLeft": "10px", "paddingRight": "10px", "aspectRatio": "1/1 !important", "width": "110px", "height": "110px", "verticalAlign": "middle", "transform": "rotate(-10deg) translateY(3px)" }}>B</span><span
                        style={{ "color": "white", "transform": "rotate(5deg) translateY(-4px)" }}>l</span><span
                            style={{ "color": "white", "transform": "rotate(3deg) translateY(-6px)" }}>a</span><span
                                style={{ "color": "white", "transform": "rotate(-5deg) translateY(6px)" }}>c</span><span
                                    style={{ "color": "white", "transform": "rotate(10deg) translateY(-10px)" }}>k</span><span
                                        style={{ "color": "white", "transform": "rotate(-5deg) translateY(4px)" }}>e</span><span
                                            style={{ "color": "white", "transform": "rotate(-10deg) translateY(3px)" }}>t</span></h1>

                <div id="errorReason"
                    style={{ "fontFamily": "Nunito, sans-serif !important", "fontWeight": "400", "color": "white", "fontSize": "35px", "lineHeight": "50px" }}>
                    The page you were looking for was not found.</div>
            </div >
        </>
    );
};