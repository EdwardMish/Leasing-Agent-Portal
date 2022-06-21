import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

import { InspectionComment } from '../../../../State/Inspections/Types/InspectionComment';

import { selectors } from '../../../../State/Inspections/Feature';
import { CommentChain } from '../../../../State/Inspections/Feature/Types/CommentChain';

import { IconColors } from '../../../../Icons';

import { NoContent } from '../../../../Shared/PageElements';

import ReplyToComment from '../ReplyToComment';

import styles from '../inspection-detail.module.css';

const InspectionComments = () => {
    let { inspectionId } = useParams<{ inspectionId: string }>();

    const comments: CommentChain[] = useSelector(selectors.comments(inspectionId));

    const [commentForReply, setCommentForReply] = React.useState<InspectionComment | null>(null);

    return (
        <>
            {!!comments && !!comments.length ? (
                <>
                    {comments.map(({ parent, replies }: CommentChain) => (
                        <div key={`inspection-comment-${parent.id}`} className={styles.TopLevelComment}>
                            <p style={{ lineHeight: '1.5' }}>{parent.noteText}</p>
                            <p
                                style={{
                                    fontStyle: 'italic',
                                    color: 'rgb(70, 81, 100)',
                                    margin: '0.5rem 0 0',
                                }}
                            >
                                {parent.commenterName} - {format(new Date(parent.createdDate), 'LL/dd/yy - hh:mm')}
                            </p>
                            <p
                                style={{
                                    color: IconColors.BrandBlue,
                                    cursor: 'pointer',
                                    fontSize: '0.8rem',
                                    margin: '0.5rem 0 0',
                                }}
                                onClick={() => {
                                    setCommentForReply(parent);
                                }}
                            >
                                Reply
                            </p>
                            {replies.map((reply: InspectionComment) => (
                                <div
                                    key={`inspection-comment-${parent.id}-reply-${reply.id}`}
                                    className={styles.TopLevelComment}
                                >
                                    <p style={{ lineHeight: '1.5' }}>{reply.noteText}</p>
                                    <p
                                        style={{
                                            fontStyle: 'italic',
                                            color: 'rgb(70, 81, 100)',
                                            margin: '0.5rem 0 0',
                                        }}
                                    >
                                        {reply.commenterName} - {format(new Date(reply.createdDate), 'LL/dd/yy - hh:mm')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ))}
                </>
            ) : (
                <NoContent message="No Comments to Display" />
            )}
            <ReplyToComment
                showModal={!!commentForReply}
                parent={commentForReply}
                closeCallback={() => {
                    setCommentForReply(null);
                }}
            />
        </>
    );
};

export default InspectionComments;
