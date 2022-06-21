interface ModelState {
    errors: any[];
    value: {
        attemptedValue: string;
        culture: string;
        rawValue: string[];
    }
}

interface ModelWindow extends Window {
    model: {};
    modelState: Record<string, ModelState>
}

declare const window: ModelWindow;

export const getPropertyFromWindow = (key: string): string => {
    const model = window.model || {};
    const modelState = window.modelState || {};

    const property = model[key] || modelState[key]?.value?.attemptedValue || undefined;

    return typeof property === 'string' ? parseInt(property) : property;
};
