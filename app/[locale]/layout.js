import "./globals.css";
import { Outfit } from "next/font/google";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AddProject from "@/components/helper/AddProject";
import Toaster from "@/components/helper/Toaster";
import Providers from "@/providers";
import { Suspense } from "react";
import Loading from "./loading";
// import Providers from "@/components/helper/ProviderTheme";
// import ThemeButton from "@/components/theme/ThemeButton";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "OpenHanded",
  description:
    "Our app empowers users to turn their dreams into reality by bringing together passionate creators and generous backers. Whether you're an aspiring entrepreneur, artist, or community project leader, our app provides a user-friendly interface to showcase your ideas and receive support from a global community. Backers can discover exciting campaigns, pledge their support, and be part of a transformative journey.",
};

// export function generateStaticParams() {
//   return [{ locale: "en" }, { locale: "tr" }];
// }

// export async function LocaleLayout({ children, params: { locale } }) {
//   let messages;
//   try {
//     messages = (await import(`../../messages/${locale}.json`)).default;
//   } catch (error) {
//     notFound();
//   }
// }

async function RootLayout({ children, params: { locale } }) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Providers
          className={outfit.className}
          locale={locale}
          messages={messages}
        >
          {/* <ThemeButton /> */}

          <Nav />
          <Suspense fallback={<Loading />}>
            <div>{children}</div>
          </Suspense>
          <Footer />
          <AddProject />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
