import { Controller, Get } from "@nestjs/common";
import { DataService } from "./data.service";

@Controller("data")
export class DataController {
    constructor(
        private readonly dataService: DataService
    ) {}

    @Get("blooks")
    async getBlooks() {
        return this.dataService.getBlooks();
    }

    @Get("rarities")
    async getRarities() {
        return this.dataService.getRarities();
    }

    @Get("packs")
    async getPacks() {
        return this.dataService.getPacks();
    }

    @Get("items")
    async getItems() {
        return this.dataService.getItems();
    }

    @Get("titles")
    async getTitles() {
        return this.dataService.getTitles();
    }

    @Get("banners")
    async getBanners() {
        return this.dataService.getBanners();
    }

    @Get("badges")
    async getBadges() {
        return this.dataService.getBadges();
    }

    @Get("emojis")
    async getEmojis() {
        return this.dataService.getEmojis();
    }
}
