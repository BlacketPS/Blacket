import { useUser } from "@stores/UserStore";
import { blooks } from "@stores/BlookStore";

/**
 * The hook that handles selling blooks.
 * @returns {Function} The function to sell blooks.
 */
const useSellBlooks = () => {
    const { user, setUser } = useUser();

    const sellBlooks = (blook, quantity) => new Promise((resolve, reject) => fetch.put("/api/blooks/sell-blooks", { blook, quantity }).then(async res => {
        const userBlooks = user.blooks;

        userBlooks[blook] -= quantity;
        if (userBlooks[blook] < 1) delete userBlooks[blook];

        await setUser({ ...user, blooks: userBlooks, tokens: user.tokens + (blooks.find(b => b.id === blook).price * quantity) });

        resolve();
    }).catch(reject));

    return sellBlooks;
}

export default useSellBlooks;