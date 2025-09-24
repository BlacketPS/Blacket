export enum Conflict {
    PAYMENT_METHOD_ALREADY_EXISTS = "This payment method already exists.",
    STAFF_ADMIN_RESOURCE_IN_USE = "This resource is being used elsewhere. Please remove all references to this resource before deleting it.",
    STAFF_ADMIN_GROUP_IN_USE = "This group is being used by a blook or item. Please remove all references to this group before deleting it.",
    STAFF_ADMIN_RARITY_IN_USE = "This rarity is being used by a blook or item. Please remove all references to this rarity before deleting it.",
    SUBSCRIPTION_ALREADY_EXISTS = "This subscription already exists.",
    PAYMENT_METHOD_IN_USE = "This payment method is being used by a subscription.",
};

