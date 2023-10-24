import HttpService, { ApiResponse } from "./httpService";
import { PostData } from "@/data-layer/post-entities";

export type PostApiResponse = ApiResponse<PostData>;

const postService = new HttpService<PostData>("/posts");

export default postService;
