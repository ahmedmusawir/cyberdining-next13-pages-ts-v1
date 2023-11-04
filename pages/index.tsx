import Head from "next/head";
import Layout from "@/components/globals/Layout";
import { Container } from "@/components/ui-ux";
import { HomePageContent } from "@/components/page-view/";
import { useEffect } from "react";
import { resetAll } from "@/features/restaurants/restaurantFilterSlice";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>CyberDining Home</title>
        <meta name="description" content="This is the demo page" />
      </Head>
      <Container className={""} FULL={true}>
        <HomePageContent />
      </Container>
    </Layout>
  );
}
function dispatch() {
  throw new Error("Function not implemented.");
}
