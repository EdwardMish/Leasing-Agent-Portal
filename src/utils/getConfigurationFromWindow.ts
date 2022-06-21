interface Configuration {
    [domain: string]: Record<string, boolean>
}

interface ConfigurationWindow extends Window {
    configuration: Configuration;
}

declare const window: ConfigurationWindow;

export const getConfigurationFromWindow = (domain: string, domainProp: string): boolean | Record<string, boolean> => {
    const { configuration = {} } = window;

    return domainProp ? configuration[domain][domainProp] || false : configuration[domain];
};
