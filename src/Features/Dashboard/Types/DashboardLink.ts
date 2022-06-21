import { IconProps } from '../../../Icons/IconProps';

export interface DashboardLink {
    Icon: React.FC<IconProps>;
    text: string;
    url: string;
}
