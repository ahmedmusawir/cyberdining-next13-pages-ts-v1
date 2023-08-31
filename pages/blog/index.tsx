import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import Layout from "@/components/Layout";
import { Box, Container, Row } from "@/components/layouts";
import { apiPost, useGetPostsQuery } from "@/services/apiPosts";
import { store } from "@/store/store";
import Spinner from "@/components/ui-ux/Spinner";

const inter = Inter({ subsets: ["latin"] });

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
}

export default function Blog() {
  const { data, isLoading, error } = useGetPostsQuery({});
  // console.log("Posts:", data?.posts);
  const posts: Post[] = data?.posts;

  return (
    <Layout>
      <Head>
        <title>Next Page Template</title>
        <meta name="description" content="This is the demo page" />
      </Head>
      {/* <Container className={"border border-gray-500"} FULL={false}> */}
      <Container className={""} FULL={false}>
        <Row className="prose max-w-3xl mx-auto">
          <h1 className="h1">The Blog</h1>
          <h2 className="h2">Blog with RTK Query on Next.js</h2>
        </Row>
        <Row className="prose max-w-3xl">
          <div className=" mx-auto">{isLoading && <Spinner />}</div>
          <Box className="flex flex-wrap">
            {posts &&
              posts?.map((post) => (
                <article
                  key={post.id}
                  className="flex max-w-xl flex-col items-start justify-between  shadow-lg p-8 m-5"
                >
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={"July 20, 2023"} className="text-gray-500">
                      {"July 20, 2023"}
                    </time>
                    {post?.tags?.map((tag) => (
                      <a
                        key={tag}
                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                      >
                        {tag}
                      </a>
                    ))}
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <a href={`blog/${post.id}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                      {post.body}
                    </p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <img
                      src="https://images.pexels.com/photos/16575028/pexels-photo-16575028/free-photo-of-cats-in-window.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt=""
                      className="h-10 w-10 rounded-full bg-gray-50"
                    />
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <a>
                          <span className="absolute inset-0" />
                          {post.title}
                        </a>
                      </p>
                      <p className="text-gray-600">Developer</p>
                    </div>
                  </div>
                </article>
              ))}
          </Box>
        </Row>
      </Container>
    </Layout>
  );
}
