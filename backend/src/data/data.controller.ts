import { Controller, Get } from "@nestjs/common";
import { DataService, DataKey } from "./data.service";
import { Public } from "src/core/decorator";

@Controller("data")
export class DataController {
    constructor(
        private readonly dataService: DataService
    ) {}

    @Public()
    @Get("blooks")
    async getBlooks() {
        return this.dataService.getData(DataKey.BLOOK);
    }

    @Public()
    @Get("rarities")
    async getRarities() {
        return this.dataService.getData(DataKey.RARITY);
    }

    @Public()
    @Get("packs")
    async getPacks() {
        return this.dataService.getData(DataKey.PACK);
    }

    @Public()
    @Get("items")
    async getItems() {
        return this.dataService.getData(DataKey.ITEM);
    }

    @Public()
    @Get("titles")
    async getTitles() {
        return this.dataService.getData(DataKey.TITLE);
    }

    @Public()
    @Get("banners")
    async getBanners() {
        return this.dataService.getData(DataKey.BANNER);
    }

    @Public()
    @Get("badges")
    async getBadges() {
        return this.dataService.getData(DataKey.BADGE);
    }

    @Public()
    @Get("fonts")
    async getFonts() {
        return this.dataService.getData(DataKey.FONT);
    }

    @Public()
    @Get("emojis")
    async getEmojis() {
        return this.dataService.getData(DataKey.EMOJI);
    }
}
