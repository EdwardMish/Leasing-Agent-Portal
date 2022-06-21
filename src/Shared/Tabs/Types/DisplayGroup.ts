export interface DisplayGroup {
    actions: React.ReactElement[];
    panels: {
        items: React.ReactElement[];
        type: 'LinksPanel' | 'Panels';
    };
    header: {
        items: React.ReactElement[];
        style: React.CSSProperties;
    }
}
