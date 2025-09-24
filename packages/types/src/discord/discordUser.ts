export interface DiscordDiscordUser {
    id: string;
    username: string;
    discriminator: string;
    global_name?: string;
    avatar?: string;
    mfa_enabled?: boolean;
    banner?: string;
    accent_color?: number;
    locale?: string;
    flags?: number;
    premium_type?: number;
    public_flags?: number;
    avatar_decoration?: string;
};
