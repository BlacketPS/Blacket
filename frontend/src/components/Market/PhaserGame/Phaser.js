import React, { useEffect, useState, useRef } from "react";

/**
 * The game hook.
 * @param {Object} config The game configuration.
 * @param {React.MutableRefObject} containerRef The container reference.
 * @returns 
 */
const useGame = (config, containerRef) => {
    const [game, setGame] = useState();

    const oldConfig = useRef(config);

    useEffect(() => {
        if ((!game && containerRef.current) || config != oldConfig.current) {
            oldConfig.current = config;

            setGame(new Game({ ...config, parent: containerRef.current }));
        }

        return () => game?.destroy(true);
    }, [config, containerRef, game]);

    return game;
}

export default useGame;