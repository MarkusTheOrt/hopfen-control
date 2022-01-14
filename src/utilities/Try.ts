const Try = async <Type = any>(
    promise: Promise<Type> | undefined
): Promise<[boolean, Type?]> => {
    try{
        const data = await promise;
        return [true, data];
    } catch {
        return [false, undefined];
    }
}

export default Try;