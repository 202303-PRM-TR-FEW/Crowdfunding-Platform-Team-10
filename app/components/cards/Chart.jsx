import * as React from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import LoaderStyle from "../helper/LoaderStyle";
import { BarChart, BarPlot } from "@mui/x-charts/BarChart";
import {
  ChartContainer,
  ChartsXAxis,
  ChartsYAxis,
  LineChart,
  LinePlot,
} from "@mui/x-charts";
import { Box } from "@mui/system";

function Chart({ projectsDonations }) {
  const countryDonations = collectDonationsByCountry(projectsDonations);
  const [xAxisData, setXAxisData] = React.useState(
    Object.keys(countryDonations) ?? []
  );
  const [seriesData, setSeriesData] = React.useState(
    Object.values(countryDonations) ?? []
  );
  console.log(countryDonations);
  console.log(xAxisData);
  console.log(seriesData);
  // const series = [
  //   {
  //     type: "bar",
  //     stack: "",
  //     yAxisKey: "eco",
  //     data: [2, 5, 3, 4, 1],
  //   },
  //   {
  //     type: "bar",
  //     stack: "",
  //     yAxisKey: "eco",
  //     data: [5, 6, 2, 8, 9],
  //   },
  //   {
  //     type: "line",
  //     yAxisKey: "pib",
  //     color: "red",
  //     data: [1000, 1500, 3000, 5000, 10000],
  //   },
  // ];
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
        <h3 className="header-4 p-2">Statistics</h3>
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

          {/* {projectsDonations.length > 0 ? (
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
          ) : null} */}
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
