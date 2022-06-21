import * as React from "react";

import { IconColors } from "../../Icons";

import { FlexWrapper } from "../../Shared/FlexWrapper";

const linkColumn: React.CSSProperties = {
  textAlign: "center",
  color: "black",
  lineHeight: 1,
  margin: "0 0 1rem",
};

const MarketingLinks: React.FC = () => (
  <FlexWrapper
    align="center"
    justify="center"
    column
    style={{
      textAlign: "center",
      width: "100%",
      padding: "0 0 2rem",
    }}
  >
    <h2
      style={{
        fontFamily: `'Roboto Slab', Roboto, 'Lato', serif`,
        color: IconColors.PECOOrange,
      }}
    >
      Marketing Made Easy
    </h2>
    <a
      style={linkColumn}
      target="_blank"
      href="https://www.phillipsedison.com/covid-19-resources/re-opening#toolkit"
      role="document"
      rel="noreferrer"
    >
      Marketing Toolkit
    </a>
    <a
      style={linkColumn}
      target="_blank"
      href={`${ROOT}assets/dashcomm/pdfs/DashComm_HowTo_Facebook.pdf`}
      role="document"
      rel="noreferrer"
    >
      Create a Facebook Page
    </a>
    <a
      style={linkColumn}
      target="_blank"
      href={`${ROOT}assets/dashcomm/pdfs/DashComm_HowTo_LinkedIn.pdf`}
      role="document"
      rel="noreferrer"
    >
      Create a LinkedIn Page
    </a>
    <a
      style={linkColumn}
      target="_blank"
      href={`${ROOT}assets/dashcomm/pdfs/DashComm_HowTo_Google-My-Business.pdf`}
      role="document"
      rel="noreferrer"
    >
      Claim a business on Google
    </a>
  </FlexWrapper>
);

export default MarketingLinks;
