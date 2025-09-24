export enum BadRequest {
    DEFAULT = "We were unable to process your request.",
    AUTH_USERNAME_TAKEN = "The username you entered is already in use. Please try another username.",
    AUTH_INCORRECT_PASSWORD = "Your password was incorrect. Please double-check your password.",
    AUTH_INCORRECT_OTP = "The OTP code you entered was incorrect.",
    AUTH_OTP_ALREADY_ENABLED = "You have already enabled OTP on your account.",
    AUTH_WEBAUTHN_FAILED = "WebAuthn authentication failed.",
    AUTH_INCORRECT_ACCESS_CODE = "The access code you entered was incorrect.",
    AUCTIONS_INVALID_DURATION = "The duration you entered is invalid.",
    SETTINGS_INVALID_SETTING_VALUE = "The value you entered for the setting is invalid.",
    SETTINGS_OTP_ALREADY_ENABLED = "You have already enabled OTP on your account.",
    STAFF_ADMIN_INVALID_PRIORITIES = "Invalid priorities.",
    PRODUCT_QUANTITY_CAPPED = "This product has a maximum purchase limit of 1."
};
