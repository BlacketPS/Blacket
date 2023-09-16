import { FC, useState, useEffect } from "react";
import configStore from "../../stores/configStore";
import eventManager from "../../managers/events";

export default function withConfig(WrappedComponent: FC) {
    return function WithConfigStore(props: any) {
        const [isWorking, setIsWorking] = useState(configStore.isInited);

        useEffect(() => {
            if (!isWorking) configStore.init();

            return eventManager.subscribe("CONFIG_INI", () => setIsWorking(true));
        }, [isWorking]);

        if (!isWorking) return (<></>);
        else return (<WrappedComponent {...props} />);
    }
}