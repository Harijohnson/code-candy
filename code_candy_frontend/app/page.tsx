import { Metadata } from "next"


import { Header } from "../components/Header/header"
import { Footer } from "../components/Footer/footer"
import { BodyCards } from "../components/Main_Body/bodyCards"
import { BodyHead } from "@/components/Main_Body/bodyHead"
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Enterprise Boilerplate",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "#",
    images: [
      {
        width: 1200,
        height: 630,
        url: "#",
      },
    ],
  },
}

export default function Web() {
  return (
    <>
    <header>
      <Header />
    </header>
    <section>
      <BodyHead />
    </section>
    <section>
      <BodyCards />
    </section>
    <footer>
      <Footer />
    </footer>
    </>
  )
}
