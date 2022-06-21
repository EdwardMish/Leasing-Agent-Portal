import * as React from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

import { InspectionItem } from '../../../../State/Inspections/Types/InspectionItem';
import {
    InspectionCategories,
    InspectionCategoriesDisplayName,
} from '../../../../State/Inspections/Types/InspectionCategories';

import { selectors } from '../../../../State/Inspections/Feature';

import isNote from '../../../../State/Inspections/Types/TypeGuards/isNote';
import isPhoto from '../../../../State/Inspections/Types/TypeGuards/isPhoto';

import PhotoLoader from '../../../../Shared/Inspections/PrintRows/PhotoLoader';

import styles from './print.module.css';

interface CategoryBlockProps {
    categoryId: InspectionCategories;
    inspectionId: number | string;
    isImageLoaded: (status: boolean) => void;
}

interface PrintNoteType {
    id: string;
    note: string;
    date: string;
}

interface PrintPhotoType {
    photoId: string;
    photoUrl: string;
}

const CategoryBlock: React.FC<CategoryBlockProps> = ({ categoryId, inspectionId, isImageLoaded }): React.ReactElement => {
    const listItems: InspectionItem[] = useSelector(selectors.itemsByCategory(inspectionId, categoryId));
    const [photos, setPhotos] = React.useState<PrintPhotoType[]>([]);
    const [notes, setNotes] = React.useState<PrintNoteType[]>([]);
    const [loads, setLoads] = React.useState<number>(listItems.filter((item) => isPhoto(item)).length | 0);
    const [componentLoaded, setComponentLoaded] = React.useState<boolean>(false);

    const createPhotoUrl = (itemId, imageId): PrintPhotoType => ({
        photoId: imageId,
        photoUrl: `${API_ROOT}/inspections/${inspectionId}/items/${itemId}/images/${imageId}/thumbnail`,
    });
    const createNote = (id, note, date): PrintNoteType => ({ id, note, date });

    const updateLoadStatus = (status: boolean) => {
        !status && setLoads((loads) => loads - 1);
    };

    React.useEffect(() => {
        let photos: PrintPhotoType[] = [],
            notes: PrintNoteType[] = [];

        listItems.forEach((item: InspectionItem) => {
            if (isPhoto(item)) photos.push(createPhotoUrl(item.id, item.imageId));
            if (isNote(item)) notes.push(createNote(item.id, item.note, item.createdDate));
        });

        setComponentLoaded(true);
        setPhotos(photos);
        setNotes(notes);
    }, []);

    React.useEffect(() => {
        if (componentLoaded && loads === 0) isImageLoaded(true);
    }, [loads, componentLoaded]);

    return photos.length > 0 || notes.length > 0 ? (
        <div className={styles.SectionWrapper}>
            <h2 className={styles.SectionTitle}>{InspectionCategoriesDisplayName[categoryId]}</h2>

            {photos.length > 0 && (
                <div className={styles.SubSectionWrapper}>
                    <h3 className={styles.SectionSubtitle}>Photos:</h3>
                    <div className={styles.Wrap}>
                        {photos.map(({ photoId, photoUrl }) => (
                            <div key={photoId} className={styles.ImageThumbnail}>
                                <PhotoLoader
                                    photoUrl={photoUrl}
                                    className={styles.Thumbnail}
                                    loadStatus={updateLoadStatus}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {notes.length > 0 && (
                <div>
                    <h3 className={styles.SectionSubtitle}>Notes:</h3>
                    {notes.map(({ id, note, date }) => (
                        <div key={id} className={styles.DetailDateWrapper}>
                            <div className={styles.TextOverflowBox}>
                                <p>{note}</p>
                            </div>
                            <div className={styles.DateBox}>
                                <p>{format(new Date(date), 'LL/dd/yy - hh:mm')}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    ) : (
        <></>
    );
};

export default CategoryBlock;
