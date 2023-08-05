import * as React from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import LoaderStyle from "../helper/LoaderStyle";
import { BarChart } from "@mui/x-charts/BarChart";

function Chart({ projectsDonations }) {
  const countryDonations = collectDonationsByCountry(projectsDonations);
  const xAxisData = Object.keys(countryDonations);
  const seriesData = Object.values(countryDonations);

  if (projectsDonations == null) {
    return <LoaderStyle />;
  }
  return (
    <Accordion
      defaultExpanded
      className="border-none  bg-[#ffffffc5]   backdrop-blur-lg  "
      sx={{
        boxShadow: 0,
        backgroundColor: "#ffffffc5",
        "@media (max-width: 600px)": {
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        bgcolor="rgba(255, 0, 0, 0.5)"
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <h3 className="header-4 p-2">Statistics</h3>
      </AccordionSummary>
      <AccordionDetails>
        {projectsDonations.length > 0 ? (
          <BarChart
            xAxis={[
              {
                id: "countries",
                data: xAxisData,
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: seriesData,
                color: "#00c1a2",
              },
            ]}
            width={500}
            height={300}
          />
        ) : null}
      </AccordionDetails>
    </Accordion>
  );
}

export default Chart;

function collectDonationsByCountry(projectsDonations) {
  const countryDonations = {};

  projectsDonations.forEach((don) => {
    const { userCountry, donaiton } = don;
    if (countryDonations[userCountry]) {
      countryDonations[userCountry] += donaiton;
    } else {
      countryDonations[userCountry] = donaiton;
    }
  });
  return countryDonations;
}
