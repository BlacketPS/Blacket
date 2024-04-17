import { Class, GameObjects, Scene } from "phaser";

let data = {};

const random = (min, max) => {
    return Math.random() * (max - min) + min;
}

const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const particleType = (e) => {
    switch (e) {
        case "center": {
            let t = random(-115, -65);
            return {
                x: data.scene.cameras.main.worldView.width / 2,
                y: data.scene.cameras.main.worldView.height / 2,
                scale: random(.7, 1),
                angle: t,
                velocity: random(600, 750),
                gravity: 700,
                angVelocity: (t > -90 ? 1 : -1) * random(125, 175),
                lifespan: 2500
            }
        }

        case "right-bottom": return {
            x: data.scene.cameras.main.worldView.width,
            y: data.scene.cameras.main.worldView.height,
            scale: random(.7, 1),
            angle: random(-160, -110),
            velocity: random(600, 750),
            gravity: 500,
            angVelocity: random(-175, -125),
            lifespan: 2500
        }

        case "left-bottom": return {
            x: 0,
            y: data.scene.cameras.main.worldView.height,
            scale: random(.7, 1),
            angle: random(-70, -20),
            velocity: random(600, 750),
            gravity: 500,
            angVelocity: random(125, 175),
            lifespan: 2500
        }

        case "top": return {
            x: random(0, data.scene.cameras.main.worldView.width),
            y: -50,
            scale: random(.7, 1),
            angle: 90,
            velocity: random(0, 50),
            gravity: 700,
            angVelocity: random(-150, 150),
            lifespan: 2500
        }

        case "right-shower": return {
            x: data.scene.cameras.main.worldView.width,
            y: random(0, data.scene.cameras.main.worldView.height),
            scale: random(.7, 1),
            angle: random(-180, -130),
            velocity: random(600, 750),
            gravity: 500,
            angVelocity: random(-175, -125),
            lifespan: 2500
        }

        case "left-shower": return {
            x: 0,
            y: random(0, data.scene.cameras.main.worldView.height),
            scale: random(.7, 1),
            angle: random(-50, 0),
            velocity: random(600, 750),
            gravity: 500,
            angVelocity: random(125, 175),
            lifespan: 2500
        }

        case "right-diamond": {
            let a = random(0, data.scene.cameras.main.worldView.height);
            return {
                x: data.scene.cameras.main.worldView.width,
                y: a,
                scale: random(.7, 1),
                angle: a > data.scene.cameras.main.worldView.height / 2 ? -150 : -210,
                velocity: random(600, 750),
                gravity: 0,
                angVelocity: random(-175, -125),
                lifespan: 2500
            }
        }

        case "left-diamond": {
            let n = random(0, data.scene.cameras.main.worldView.height);
            return {
                x: 0,
                y: n,
                scale: random(.7, 1),
                angle: n > data.scene.cameras.main.worldView.height / 2 ? -30 : 30,
                velocity: random(600, 750),
                gravity: 0,
                angVelocity: random(125, 175),
                lifespan: 2500
            }
        }

        default: return {};
    }
}

const particleClass = new Class({
    Extends: GameObjects.Image,
    initialize: function () {
        GameObjects.Image.call(this, data.scene, 0, 0, "uncommon-1");
        this.setDepth(3);
        this.lifespan = 0;
    },
    spawn: function (x, y, scale, velAngle, velSpeed, gravity, angle, lifespan, texture) {
        this.setTexture(texture);
        this.setActive(true);
        this.setVisible(true);
        this.setPosition(x, y);
        this.setScale(scale);
        this.targets = [];
        data.scene.physics.velocityFromAngle(velAngle, velSpeed, this.body.velocity);
        this.body.setGravityY(gravity);
        this.body.setAngularVelocity(angle);
        this.lifespan = lifespan;
    },
    update: function (t, s) {
        this.lifespan -= s;
        if (this.lifespan > 0) return;
        this.setActive(!1);
        this.setVisible(!1);
    }
});

export default class Particles extends Scene {
    constructor(rarity) {
        data = {};
        super();
        this.rarity = rarity.toLowerCase();
    }

    preload() {
        this.load.setCORS("anonymous");
        this.load.svg("uncommon-1", "https://media.blooket.com/image/upload/v1658567787/Media/market/particles/square_green.svg", { width: 25, height: 25 });
        this.load.svg("uncommon-2", "https://media.blooket.com/image/upload/v1658567787/Media/market/particles/square_light_green.svg", { width: 25, height: 25 });
        this.load.svg("uncommon-3", "https://media.blooket.com/image/upload/v1658567785/Media/market/particles/circle_dark_green.svg", { width: 25, height: 25 });
        this.load.svg("uncommon-4", "https://media.blooket.com/image/upload/v1658567785/Media/market/particles/serpentine_dark_green.svg", { width: 30, height: 30 });
        this.load.svg("uncommon-5", "https://media.blooket.com/image/upload/v1658567785/Media/market/particles/triangle_light_green.svg", { width: 30, height: 30 });
        this.load.svg("uncommon-6", "https://media.blooket.com/image/upload/v1658567785/Media/market/particles/serpentine_light_green.svg", { width: 30, height: 30 });
        this.load.svg("uncommon-7", "https://media.blooket.com/image/upload/v1658567785/Media/market/particles/triangle_green.svg", { width: 30, height: 30 });

        this.load.svg("rare-1", "https://media.blooket.com/image/upload/v1658567765/Media/market/particles/square_light_blue.svg", { width: 25, height: 25 });
        this.load.svg("rare-2", "https://media.blooket.com/image/upload/v1658567765/Media/market/particles/square_dark_blue.svg", { width: 25, height: 25 });
        this.load.svg("rare-3", "https://media.blooket.com/image/upload/v1658567763/Media/market/particles/triangle_blue.svg", { width: 30, height: 30 });
        this.load.svg("rare-4", "https://media.blooket.com/image/upload/v1658567763/Media/market/particles/serpentine_blue.svg", { width: 30, height: 30 });
        this.load.svg("rare-5", "https://media.blooket.com/image/upload/v1658567763/Media/market/particles/triangle_light_blue.svg", { width: 30, height: 30 });
        this.load.svg("rare-6", "https://media.blooket.com/image/upload/v1658567763/Media/market/particles/serpentine_light_blue.svg", { width: 30, height: 30 });
        this.load.svg("rare-7", "https://media.blooket.com/image/upload/v1658567763/Media/market/particles/circle_dark_blue.svg", { width: 25, height: 25 });

        this.load.svg("epic-1", "https://media.blooket.com/image/upload/v1658790239/Media/market/particles/red.svg", { width: 25, height: 25 });
        this.load.svg("epic-2", "https://media.blooket.com/image/upload/v1658790237/Media/market/particles/light_red.svg", { width: 25, height: 25 });
        this.load.svg("epic-3", "https://media.blooket.com/image/upload/v1658790239/Media/market/particles/serpentine_red.svg", { width: 30, height: 30 });
        this.load.svg("epic-4", "https://media.blooket.com/image/upload/v1658790239/Media/market/particles/serpentine_dark_red.svg", { width: 30, height: 30 });
        this.load.svg("epic-5", "https://media.blooket.com/image/upload/v1658790237/Media/market/particles/triangle_red.svg", { width: 30, height: 30 });
        this.load.svg("epic-6", "https://media.blooket.com/image/upload/v1658790237/Media/market/particles/triangle_light_red.svg", { width: 30, height: 30 });
        this.load.svg("epic-7", "https://media.blooket.com/image/upload/v1658790237/Media/market/particles/circle_dark_red.svg", { width: 25, height: 25 });

        this.load.svg("legendary-1", "https://media.blooket.com/image/upload/v1658567740/Media/market/particles/square_orange.svg", { width: 25, height: 25 });
        this.load.svg("legendary-2", "https://media.blooket.com/image/upload/v1658567740/Media/market/particles/square_light_orange.svg", { width: 25, height: 25 });
        this.load.svg("legendary-3", "https://media.blooket.com/image/upload/v1658567738/Media/market/particles/circle_orange.svg", { width: 25, height: 25 });
        this.load.svg("legendary-4", "https://media.blooket.com/image/upload/v1658567738/Media/market/particles/serpentine_orange.svg", { width: 30, height: 30 });
        this.load.svg("legendary-5", "https://media.blooket.com/image/upload/v1658567738/Media/market/particles/serpentine_light_orange.svg", { width: 30, height: 30 });
        this.load.svg("legendary-6", "https://media.blooket.com/image/upload/v1658567738/Media/market/particles/circle_dark_orange.svg", { width: 25, height: 25 });
        this.load.svg("legendary-7", "https://media.blooket.com/image/upload/v1658567738/Media/market/particles/triangle_dark_orange.svg", { width: 30, height: 30 });

        this.load.svg("chroma-1", "https://media.blooket.com/image/upload/v1658790246/Media/market/particles/square_turquoise.svg", { width: 25, height: 25 });
        this.load.svg("chroma-2", "https://media.blooket.com/image/upload/v1658790246/Media/market/particles/square_light_turquoise.svg", { width: 25, height: 25 });
        this.load.svg("chroma-3", "https://media.blooket.com/image/upload/v1658790244/Media/market/particles/serpentine_dark_turquoise.svg", { width: 30, height: 30 });
        this.load.svg("chroma-4", "https://media.blooket.com/image/upload/v1658790244/Media/market/particles/serpentine_turquoise.svg", { width: 30, height: 30 });
        this.load.svg("chroma-5", "https://media.blooket.com/image/upload/v1658790244/Media/market/particles/triangle_turquoise.svg", { width: 30, height: 30 });
        this.load.svg("chroma-6", "https://media.blooket.com/image/upload/v1658790244/Media/market/particles/triangle_light_turquoise.svg", { width: 30, height: 30 });
        this.load.svg("chroma-7", "https://media.blooket.com/image/upload/v1658790244/Media/market/particles/circle_dark_turquoise.svg", { width: 25, height: 25 });
    }

    create() {
        data.scene = this;
        data.rarity = "";
        data.particles = this.physics.add.group({
            classType: particleClass,
            runChildUpdate: !0
        });
        this.nextParticle = 0;
        this.numExplosions = 0;
    }

    initParticles() {
        this.game.events.on("start-particles", (t) => {
            data.rarity = t;
            this.numExplosions = "Uncommon" === t ? 75 : "Rare" === t ? 100 : -1;
        });
    }

    update(e, t) {
        if (data.rarity && 0 !== this.numExplosions && (this.nextParticle -= t, this.nextParticle <= 0)) {
            switch (data.rarity) {
                case "Uncommon": {
                    for (let i = 0; i < 2; i++) {
                        let n = data.particles.get();
                        n && n.spawn.apply(n, Object.values(particleType("center")).concat(`uncommon-${randomInt(1, 8)}`))
                    }
                    break;
                }

                case "Rare": {
                    for (let o = 0; o < 2; o++) {
                        let r = data.particles.get();
                        r && r.spawn.apply(r, Object.values(particleType(o % 2 == 0 ? "left-bottom" : "right-bottom")).concat(`rare-${randomInt(1, 8)}`))
                    }
                    break;
                }

                case "Epic": {
                    for (let s = 0; s < 2; s++) {
                        let i = data.particles.get();
                        i && i.spawn.apply(i, Object.values(particleType(s % 2 == 0 ? "left-shower" : "right-shower")).concat(`epic-${randomInt(1, 8)}`));
                    }

                    break;
                }

                case "Legendary": {
                    for (let l = 0; l < 3; l++) {
                        let c = data.particles.get();
                        c && c.spawn.apply(c, Object.values(particleType("top")).concat(`legendary-${randomInt(1, 8)}`));
                    }

                    break;
                }

                case "Chroma": {
                    for (let u = 0; u < 3; u++) {
                        let d = data.particles.get();
                        d && d.spawn.apply(d, Object.values(particleType(u % 2 == 0 ? "left-diamond" : "right-diamond")).concat(`chroma-${randomInt(1, 8)}`));
                    };

                    break;
                }
            }

            this.nextParticle = 20;
            this.numExplosions > 0 && (this.numExplosions = Math.max(this.numExplosions - 1, 0));
        }
    }
}