export interface Tab {
    name: string;
    isActive?: boolean;
    hideTab?: () => boolean;
}
