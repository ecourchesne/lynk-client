export enum ClientType {
    Personal = "personnal",
    Commercial = "commercial",
}

export function decodeActivationKey(key: string): { type: ClientType; id: number } {
    if (key.length !== 12) {
        throw new Error("Invalid activation key length");
    }

    const prefix = key[0];
    const id = parseInt(key.slice(1), 10);

    if (prefix === "1") {
        return { type: ClientType.Personal, id };
    } else if (prefix === "2") {
        return { type: ClientType.Commercial, id };
    } else {
        throw new Error("Invalid activation key prefix");
    }
}