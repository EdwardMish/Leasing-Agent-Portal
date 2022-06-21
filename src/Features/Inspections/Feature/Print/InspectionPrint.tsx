import React from 'react';
import styles from './print.module.css';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import CategoryBlock from './CategoryBlock';
import { InspectionCategories } from '../../../../State/Inspections/Types/InspectionCategories';
import useInspectionFromState from '../../../../State/Inspections/Feature/Hooks/useInspectionFromState';
import CoverPage from './CoverPage';
import InspectionInteractions from './Interactions';
import MediaPrint from './MediaPrint';
import { Actions, ActionTypes } from '../../../../State/Inspections/Print';
import { LoadingContent } from 'Shared/PageElements';

export default function InspectionPrint() {
    const dispatch = useDispatch();
    let { inspectionId } = useParams<{ inspectionId: string }>();
    const { inspection } = useInspectionFromState(inspectionId);
    const [loads, setLoads] = React.useState<number>(Object.keys(InspectionCategories).length + 1);
    const readyToPrint = (status: boolean) => {
        status && setLoads((loads) => loads - 1);
    };

    React.useEffect(() => {
        if (loads === 0) {
            dispatch({
                type: Actions.UPDATE_PRINTER_STATUS,
                payload: true,
            } as ActionTypes);
        }
    }, [loads]);

    return (
        <main className={styles.InspectionPrintWrapper} id="print-inspection">
            {inspection ? (
                <>
                    <CoverPage inspection={inspection} />
                    {Object.keys(InspectionCategories).map((key) => (
                        <CategoryBlock
                            key={InspectionCategories[key]}
                            inspectionId={inspectionId}
                            categoryId={InspectionCategories[key]}
                            isImageLoaded={readyToPrint}
                        />
                    ))}
                    <InspectionInteractions />
                    <MediaPrint isImageLoaded={readyToPrint} />
                </>
            ) : (
                <LoadingContent />
            )}
        </main>
    );
}
