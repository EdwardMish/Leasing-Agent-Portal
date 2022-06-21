import * as React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectors } from 'State/CurrentUser';

import { News } from 'API';

const styles = require('./news-list.module.css');

export interface ListProperties {
    news: News.Types.News[];
}

export const List: React.FC<ListProperties> = ({ news }) => {
    const currentUserIsTenant: boolean = useSelector(selectors.currentUserIsTenant);

    const link = (id) => (currentUserIsTenant ? `/news/details/${id}` : `/communications/news/details/${id}`);

    return (
        <>
            {news.map(({ age, id, isRead, published, subject, type }: News.Types.News) => (
                <Link key={`news-list-item-${id}`} className={`${isRead ? styles.Read : styles.Unread}`} to={link(id)}>
                    <div className={styles.NewsListItem}>
                        {type !== News.Types.NewsTypes.Normal && <span className={styles.EmergencyIcon}>!</span>}
                        <div className={styles.Subject}>{subject}</div>
                        <div className={styles.PublishDate}>
                            {published ? `Published ${age === 0 ? 'Today' : `${age} days ago`}` : 'Upcoming'}
                        </div>
                    </div>
                </Link>
            ))}
        </>
    );
};
