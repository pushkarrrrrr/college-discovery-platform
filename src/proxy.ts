import { NextRequest, NextFetchEvent } from "next/server";
import { default as nextAuthMiddleware } from "next-auth/middleware";
import type { NextRequestWithAuth } from "next-auth/middleware";

export default function proxy(req: NextRequest, event: NextFetchEvent) {
  return nextAuthMiddleware(req as unknown as NextRequestWithAuth, event);
}

export const config = {
  matcher: ["/saved"],
};
