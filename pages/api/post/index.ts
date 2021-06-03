import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

/**
 * @POST /api/post
 * @desc create new draft item through this getway
 * @params title -  required
 * @params content - optional
 */

export default async (req, res) => {
  // destructure items from request body
  const { title, content } = req.body;

  const session = await getSession({ req });
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user.email } },
    },
  });

  res.json(result);
};
