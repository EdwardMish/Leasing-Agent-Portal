import React from "react";
import { Link } from "react-router-dom";
import { Pencil } from "../../../Icons/Pencil";
import IconWithText from "../../../Shared/PageElements/IconWithText";

interface Properties {
    propertyId: number;
}

const InspectionDraftLink: React.FC<Properties> = ({ propertyId }) => {

    return (
        <Link to={`/app/inspections/${propertyId}`}>
            <IconWithText
                iconOnLeft
                text='Continue Inspection'
                Icon={Pencil}
            />
        </Link>
    )
}

export default InspectionDraftLink;
