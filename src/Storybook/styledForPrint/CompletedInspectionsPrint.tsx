import React from 'react';

import { res, media } from './InspectionsDummyData';

import styles from './completed-inspections-print.module.css';

const CompletedInspectionsPrint = ({ propName, author, completedDate }) => {
  return (
    <main>
      <div className={styles.TitlePage}>
        <h1>{res.propertyName}</h1>
        <h2>{res.author}</h2>
        <h2>{res.complete}</h2>
      </div>
      <div>
        {res.inspectionSections.map((section) => (
          <div className={styles.SectionWrapper}>
            <h2>{section.title}</h2>
            {section.items.notes?.length == 0 &&
            section.items.photos?.length == 0 ? (
              <div className={`${styles.DetailDateWrapper} ${styles.NoDetail}`}>
                <h4>No Items</h4>
              </div>
            ) : (
              <div>
                {section.items.photos?.length == 0 ? (
                  ''
                ) : (
                  <div className={styles.SubSectionWrapper}>
                    <h3>Photos:</h3>
                    <div className={styles.Wrap}>
                      {section.items.photos?.map((photo) => (
                        <div className={styles.ImageThumbnail}>
                          <img className={styles.Thumbnail} src={photo} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {section.items.notes?.length == 0 ? (
                  ''
                ) : (
                  <div>
                    <h3>Notes:</h3>
                    {section.items.notes?.map((note) => (
                      <div className={styles.DetailDateWrapper}>
                        <div className={styles.TextOverflowBox}>
                          <p>{note.details}</p>
                        </div>
                        <div className={styles.DateBox}>
                          <p>{note.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles.SectionWrapper}>
        <h2>Interactions</h2>
        {res.interactions.length == 0 ? (
          <div className={`${styles.DetailDateWrapper} ${styles.NoDetail}`}>
            <h4>No Interactions</h4>
          </div>
        ) : (
          <>
            {res.interactions?.map((interaction) => (
              <div className={styles.InteractionWrapper}>
                <p>Neighbor Interaction(s):</p>
                <h4>{interaction.neighbor}</h4>

                {interaction.interactionList.map((list) => (
                  <div className={styles.DetailDateWrapper}>
                    <div className={styles.TextOverflowBox}>
                      <p>{list.details}</p>
                    </div>
                    <div className={styles.DateBox}>
                      <p>{list.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
      </div>
      <div className={styles.SectionWrapper}>
        <h2>Media</h2>
        {media.length == 0 ? (
          <div className={`${styles.DetailDateWrapper} ${styles.NoDetail}`}>
            <h4>No Media</h4>
          </div>
        ) : (
          <div className={styles.Center}>
            <div className={styles.Wrap}>
              {media.map((pic) => (
                <div className={styles.ImageSquare}>
                  <div>
                    <img className={styles.ImageFullSize} src={pic} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CompletedInspectionsPrint;