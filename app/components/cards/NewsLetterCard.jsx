"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Popover,
  PopoverHandler,
  PopoverContent,
  Input,
} from "@material-tailwind/react";

export default function NewsLetterCard() {
  return (
    <Card className="w-96 bg-basicOrange">
      <CardHeader
        shadow={false}
        floated={false}
        className="h-96 bg-basicOrange"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/5822/5822082.png"
          className="w-full h-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <div className="flex items-center justify-between mb-2">
          <Typography variant="h4" color="black" className="text-lg">
            Stayed informed
          </Typography>
        </div>
        <Typography variant="small" color="black" className="font-normal">
          Want to be among the first people to know about amazing projects on
          our platform? Join our monthly digest of the best causes.
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Popover placement="bottom">
          <PopoverHandler>
            <Button
              ripple={false}
              fullWidth={true}
              className="bg-BasicBlack text-white shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
            >
              Join newsletter
            </Button>
          </PopoverHandler>
          <PopoverContent className="w-96 bg-BasicBlack">
            <Typography variant="h6" color="white" className="mb-6">
              Newsletter Subscription
            </Typography>
            <div className="flex gap-2">
              <Input color="white" label="Email Address" />
              <Button className="bg-basicOrange">Subscribe</Button>
            </div>
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  );
}
