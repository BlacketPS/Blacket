import { makeObservable, action, observable } from "mobx";
import eventManager from "@managers/events";
import axios from "axios";

class ConfigStore {
    constructor() {
        makeObservable(this, {
            init: action,
            config: observable,
            isInited: observable
        });
    }

    public config: any = {};
    public isInited: boolean = false;

    public async init(): Promise<void> {
        const { data } = await axios.get("https://blacket.org/worker/config");

        this.config = data;
        this.isInited = true;
        eventManager.dispatch("CONFIG_INI");
    }
}

const configStore = new ConfigStore();

export default configStore;