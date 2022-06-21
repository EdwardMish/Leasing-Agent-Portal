export const formatSystemName = (message: string, action: string): [string, string] => {
    const [name = '', post] = message.split(action);

    return [name, `${action}${post}`];
};
