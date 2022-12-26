import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@server/db/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { teeny_code } = req.query;

  const teenyUrlData = await prisma?.url.findUnique({
    where: {
      teenyCode: teeny_code as string,
    },
  });

  console.dir("🌐 " + teenyUrlData?.longUrl);

  // if (!teenyUrlData?.longUrl) res.json(teenyUrlData);
  if (!teenyUrlData?.longUrl) res.redirect("/");
  else res.redirect(`/redirect?to=${teenyUrlData.longUrl}`);
}
