import { useEffect, useState, useRef } from "react";

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