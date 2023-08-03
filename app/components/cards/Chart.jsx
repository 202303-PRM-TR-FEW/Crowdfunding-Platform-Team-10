import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { countries } from "@/data/countries";
import LoaderStyle from "../helper/LoaderStyle";

export default function Chart({ projectsDonations }) {
  let Prices, isoCountryCodes;
  if (projectsDonations) {
    Prices = projectsDonations.map((price) => price?.donaiton);
    const Country = projectsDonations.map((country) => country?.userCountry);
    console.log(Country);
    isoCountryCodes = Country.map((countryName) => {
      const country = countries.find((c) => c.label === countryName);
      return country ? country.code : null;
    });
  } else {
    Prices = [0];
    isoCountryCodes = [0];
  }
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
        <h3 className="header-4 p-2">Statistcs</h3>
      </AccordionSummary>
      <AccordionDetails>
        {projectsDonations.length > 0 ? (
          <LineChart
            xAxis={[{ data: isoCountryCodes }]}
            //   xAxis={projectsDonations.map((country) => country?.userCountry)}
            series={[
              {
                data: Prices,
                //   data: projectsDonations.map((price) => price?.donationAmount),
                area: true,
              },
            ]}
            width={500}
            height={300}
          />
        ) : (
          <LineChart
            xAxis={[{ data: ["0"] }]}
            series={[
              {
                data: ["0"],
                area: true,
              },
            ]}
            width={500}
            height={300}
          />
        )}
      </AccordionDetails>
    </Accordion>
  );
}
