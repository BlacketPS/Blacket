export enum BadRequest {
    DEFAULT = "We were unable to process your request.",
    AUTH_INCORRECT_PASSWORD = "Your password was incorrect. Please double-check your password.",
    AUTH_INCORRECT_ACCESS_CODE = "The access code you entered was incorrect.",
    AUTH_FORMS_ENABLED = "You can not register an account while user forms are enabled.",
    FORMS_FORMS_DISABLED = "You can not create a form while user forms are disabled."
};
