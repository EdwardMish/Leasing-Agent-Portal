export interface TableColumn {
    display: string;
    width: string;
    // operator: T;
    operator: any;
    flex?: number;
    prependMobileRow?: boolean;
    Component?: React.ReactElement;
    linkColumn?: boolean;
    format?: string;
    type?: 'date' | 'dateTime' | 'integer' | 'decimals' | 'money' | 'other';
}
