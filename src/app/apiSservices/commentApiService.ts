import axios from "axios";
import { serverApi } from "../../lib/config";
import assert from "assert";
import { Definer } from "../../lib/definer";
import { Comment } from "../../types/others";

class CommentApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  async createCommentRequest(data: any): Promise<Comment[]> {
    try {
      const result = await axios.post(this.path + "/comments/create", data, {
        withCredentials: true,
      });
      console.log("state::", result?.data?.state);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);

      const createdComment: Comment[] = result.data.data;
      return createdComment;
    } catch (err: any) {
      console.log(`ERROR:: createCommentRequest ${err.message} `);
      throw err;
    }
  }

  // reply to specific comment

  async replyToSpecificComment(data: any): Promise<any[]> {
    try {
      const result = await axios.post(this.path + "/reply/comments", data, {
        withCredentials: true,
      });

      console.log("state::", result?.data?.state);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);

      const repliedComment: Comment[] = result.data.data;
      return repliedComment;
    } catch (err: any) {
      console.log(`ERROR:: replyToSpecificComment ${err.message} `);
      throw err;
    }
  }

  async getAllComments(id: string | undefined): Promise<Comment[]> {
    try {
      const result = await axios.get(this.path + `/comments?id=${id}`, {
        withCredentials: true,
      });
      console.log("result", result?.data);

      console.log("state::", result?.data?.state);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);

      const comments: Comment[] = result.data.data;
      return comments;
    } catch (err: any) {
      console.log(`ERROR:: getAllComments ${err.message} `);
      throw err;
    }
  }
}

export default CommentApiService;
