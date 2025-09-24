import type { UserSetting } from "../../../interfaces"

export interface UserSettings extends UserSetting {
    otpEnabled?: boolean;
}
