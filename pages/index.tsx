import Head from "next/head";
import Layout from "@/components/globals/Layout";
import { Container } from "@/components/ui-ux";
import { HomePageContent } from "@/components/page-view/";

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
