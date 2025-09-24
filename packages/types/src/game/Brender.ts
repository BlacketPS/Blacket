import { PublicUser } from "../users";

export enum EntityType {
    NONE = 1,
    PLAYER = 2,
    TRADING_TABLE = 3
}

export interface BrenderObject {
    id: string;
    x: number;
    y: number;
    z?: number;
    width?: number;
    height?: number;
}

export interface BrenderEntity extends BrenderObject {
    type?: EntityType;
}

export interface BrenderPlayerEntity extends BrenderEntity {
    sitting?: boolean;
    user?: PublicUser;
}

export interface BrenderTradingTableEntity extends BrenderEntity {
    tradingTable: null;
}
