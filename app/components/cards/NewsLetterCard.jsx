"use client";
import emailjs from "emailjs-com";
import React, { useRef } from "react";
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
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault(); // prevents the page from reloading when you hit “Send”

    const REARCT_APP_SERVICE_ID = "service_mfq6ump";
    const REARCT_APP_TEMPLATE_ID = "template_cwoodxx";
    const REARCT_APP_USER_ID = "0DOptxtQwVjFVWDq4";
    emailjs
      .sendForm(
        REARCT_APP_SERVICE_ID,
        REARCT_APP_TEMPLATE_ID,
        form.current,
        REARCT_APP_USER_ID
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <Card className="w-96 bg-orange-500">
      <CardHeader
        shadow={false}
        floated={false}
        className="h-96 bg-basicOrange"
      >
        <img
          src="/assets/images/newslettercard.image.png"
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
              className="bg-BasicBlack text-white shadow-none hover:shadow-none focus:shadow-none focus:scale-105 active:scale-100"
            >
              Join newsletter
            </Button>
          </PopoverHandler>
          <PopoverContent className="w-96 bg-orange-500">
            <Typography variant="h6" color="white" className="mb-5">
              Newsletter Subscription
            </Typography>
            <div>
              <form ref={form} onSubmit={sendEmail} className="flex gap-2">
                <Input
                  label="Email Address"
                  type="email"
                  color="white"
                  name="to_email"
                />
                <Button type="submit" className="bg-black">
                  Subscribe
                </Button>
              </form>
            </div>
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  );
}
