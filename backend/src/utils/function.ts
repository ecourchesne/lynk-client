import { ClientType } from "src/utils/enums/client-type.enum";


export function decodeActivationKey(key: string): { type: ClientType; id: number } {
    if (key.length !== 12) {
        throw new Error("Invalid activation key length");
    }

    const prefix = key[0];
    const id = parseInt(key.slice(1), 10);

    if (prefix === "1") {
        return { type: ClientType.PERSONNAL, id };
    } else if (prefix === "2") {
        return { type: ClientType.COMMERCIAL, id };
    } else {
        throw new Error("Invalid activation key prefix");
    }
}