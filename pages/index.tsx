import Head from "next/head";
import Layout from "@/components/globals/Layout";
import { Box, Container, Row } from "@/components/ui-ux";
import HomeContent from "@/components/page-view/HomeContent";
import axios from "axios";

export default function Home({ locations }: { locations: any }) {
  console.log("Locations", locations);
  return (
    <Layout>
      <Head>
        <title>Next Starter Home</title>
        <meta name="description" content="This is the demo page" />
      </Head>
      {/* <Container className={"border border-gray-500"} FULL={false}> */}
      <Container className={""} FULL={true}>
        <HomeContent />
      </Container>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:1337/api/locations");
    return {
      props: { locations: response.data },
    };
  } catch (error: any) {
    console.error("Failed fetching data:", error.message);
    return {
      props: { locations: null },
    };
  }
};
