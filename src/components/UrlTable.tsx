import React from "react";
import { BsArrowUpRight } from "react-icons/bs";
import type { Url } from "@prisma/client";
import { formatAsDomainName } from "@utils";

export default function UrlTable({ urls }: { urls: Url[] }) {
  return (
    <div className="url-table bg-squircle">
      <h3 className="url-table__title">Top 5 URLs</h3>
      <table>
        <thead>
          <tr>
            <th>teeny.fun/</th>
            <th className="url-table__long-url">Long URL</th>
            <th>Hits</th>
          </tr>
        </thead>
        <tbody>
          {urls
            .map(({ id, teenyCode, shortUrl, longUrl, hits }) => (
              <tr key={id}>
                <td
                  style={{
                    letterSpacing: "0.1rem",
                  }}
                >
                  <a
                    href={teenyCode}
                    title={shortUrl}
                  >
                    {teenyCode}
                    <BsArrowUpRight />
                  </a>
                </td>
                <td className="url-table__long-url">
                  <a
                    href={longUrl}
                    title={longUrl}
                  >
                    {formatAsDomainName(longUrl, 30)}
                  </a>
                </td>
                <td>{hits}</td>
              </tr>
            ))
            .slice(0, 5)}
        </tbody>
      </table>
    </div>
  );
}
