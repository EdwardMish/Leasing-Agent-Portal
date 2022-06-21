import * as React from 'react';
import { AxiosError } from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';

import { News } from 'API';

import { Route } from 'Types';

import { EditorContentDisplay } from 'Shared/Content';
import { DocumentList } from 'Shared/Documents';
import { PageWrapper } from 'Shared/PageWrapper';
import DynamicContent from 'Shared/PageElements/DynamicContent';

import { mapNewsAttachmentToDocumentLink } from 'utils/Mappers';

import { QuestionButton } from '../Question/QuestionButton';

const styles = require('./news-details.module.css');

const routes: Route[] = [{ target: '/news', display: 'News' }];

const breadCrumbs = {
    current: 'News Details',
    routes,
};

type NewsItem = News.Types.News;

const TenantNewsDetails: React.FC = () => {
    const history = useHistory();

    const { newsItemId } = useParams<{ newsItemId: string }>();

    const [news, setNews] = React.useState<NewsItem>({} as NewsItem);
    const [newsLoaded, toggleNewsLoaded] = React.useState<boolean>(false);
    const [notFound, showNotFound] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (newsLoaded || (!!news && newsItemId !== `${news.id}`)) {
            toggleNewsLoaded(false);

            News.API.getNewsItemDetails(parseInt(newsItemId))
                .then((news) => {
                    setNews(news);
                    News.API.markAsRead(news.id);
                    toggleNewsLoaded(true);
                })
                .catch((error: AxiosError) => {
                    toggleNewsLoaded(false);

                    if (error.response?.status == 404) {
                        showNotFound(true);
                    } else if (error.response?.status == 403) {
                        history.push('/news');
                    }
                });
        }
    }, [newsItemId]);

    return (
        <PageWrapper breadCrumbs={breadCrumbs} pageTitle="News Details">
            <DynamicContent
                loaded={newsLoaded}
                noContent={notFound}
                noContentMessage="The post you are trying to view cannot be found."
            >
                <div className={styles.Details}>
                    {news.published ? (
                        <>
                            <div className={styles.SubjectAndActions}>
                                <h1 className={styles.Subject}>{news.subject}</h1>
                            </div>
                            <div className={styles.PublishDate}>
                                Published on {new Date(news.publishFrom).toDateString()}
                            </div>
                            <div className={styles.Question}>
                                <QuestionButton newsItemId={news.id} />
                            </div>
                            <div>
                                <EditorContentDisplay content={news.body} />
                            </div>
                            <h3>Attachments</h3>
                            <DocumentList
                                documents={news.attachments.map((attachment: News.Types.Attachment) =>
                                    mapNewsAttachmentToDocumentLink(news.id, attachment),
                                )}
                                noContentMessage="No attachments available."
                            />
                        </>
                    ) : (
                        <span>
                            The News post you are attempting to view is not available. Please click{' '}
                            <Link to="/communications">here</Link> to view available posts.{' '}
                        </span>
                    )}
                </div>
            </DynamicContent>
        </PageWrapper>
    );
};

export default TenantNewsDetails;
