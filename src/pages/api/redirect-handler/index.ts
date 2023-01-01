import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@server/db/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { redirectUrl, id } = req.query as { redirectUrl: string; id: string };

  await prisma.url.update({
    where: {
      id,
    },
    data: {
      hits: {
        increment: 1,
      },
    },
  });

  if (!redirectUrl) res.redirect("/");
  else res.redirect(redirectUrl);
}
