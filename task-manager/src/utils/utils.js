export function IsUpdateAllowed (update, allowedKeys) {
    const updateKeys = Object.keys(update)
    return updateKeys.every((key) => allowedKeys.includes(key))
}