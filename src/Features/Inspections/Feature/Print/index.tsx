import React from 'react';
import InspectionPrint from './InspectionPrint';
import { IconWithText } from '../../../../Shared/PageElements';
import { Printer, IconColors } from '../../../../Icons';
import { useReactToPrint } from 'react-to-print';
import styles from './print.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { Actions, ActionTypes } from '../../../../State/Inspections/Print';

export default function Index() {
    const dispatch = useDispatch();
    const componentRef = React.useRef(null);
    const readyToPrint = useSelector((state) => state.inspectionsPrinter.readyToPrint);
    const [buttonEnable, toggleButtonEnable] = React.useState<boolean>(false);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    React.useEffect(() => {
        if (readyToPrint) {
            dispatch({
                type: Actions.UPDATE_PRINTER_STATUS,
                payload: false,
            } as ActionTypes);
            handlePrint();
            toggleButtonEnable(true);
        }
    }, [readyToPrint]);

    return (
        <>
            <div className={`print-ignore ${styles.PrintTargetHeading}`}>
                <div onClick={handlePrint} className={!buttonEnable ? styles.printButtonDisabled : ''}>
                    <IconWithText Icon={Printer} text="Print Details" color={IconColors.White} />
                </div>
            </div>
            <WrapperComponent ref={componentRef} />
        </>
    );
}

export class WrapperComponent extends React.Component {
    render() {
        return <InspectionPrint />;
    }
}
