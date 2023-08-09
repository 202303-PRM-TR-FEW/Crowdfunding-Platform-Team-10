import * as React from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import LoaderStyle from "../helper/LoaderStyle";
import { BarPlot } from "@mui/x-charts/BarChart";
import {
  ChartContainer,
  ChartsXAxis,
  ChartsYAxis,
  LineChart,
  LinePlot,
} from "@mui/x-charts";
import { Box } from "@mui/system";
import { useTranslations } from "next-intl";

function Chart({ projectsDonations }) {
  const countryDonations = collectDonationsByCountry(projectsDonations);
  const [xAxisData, setXAxisData] = React.useState(
    Object.keys(countryDonations) ?? []
  );
  const [seriesData, setSeriesData] = React.useState(
    Object.values(countryDonations) ?? []
  );
  const t = useTranslations("Cards")
  const series = [
    {
      type: "line",
      yAxisKey: "pib",
      color: "#00c1a2",
      data: seriesData,
    },
  ];

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
        <h3 className="header-4 p-2">{t("stats")}</h3>
      </AccordionSummary>
      <AccordionDetails>
        <>
          {seriesData.length > 0 && xAxisData.length > 0 ? (
            <Box sx={{ width: "100%", maxWidth: "100%" }}>
              <LineChart
                series={series}
                height={400}
                sx={{
                  width: 1,
                  viewBox: "0 0 500 400",
                }}
                xAxis={[
                  {
                    id: "country",
                    data: xAxisData,
                    scaleType: "band",
                    valueFormatter: (value) => value.toString(),
                  },
                ]}
                yAxis={[
                  {
                    id: "pib",
                    scaleType: "log",
                  },
                ]}
              >
                <BarPlot />
                <LinePlot />
                <ChartsXAxis
                  label="Country"
                  position="bottom"
                  axisId="country"
                />
                <ChartsYAxis label="" position="left" axisId="pib" />
              </LineChart>
            </Box>
          ) : null}
        </>
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
