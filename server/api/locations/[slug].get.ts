import { and, eq } from "drizzle-orm";

import db from "~/lib/db";
import { location } from "~/lib/db/schema";

import defineAuthenticatedEventHandler from "../../utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug") as string;

  const foundLocation = await db.query.location.findFirst({
    where: and(
      eq(location.slug, slug),
      eq(location.userId, event.context.user.id),
    ),
  });

  if (!foundLocation) {
    return sendError(event, createError({
      statusCode: 404,
      statusMessage: "Location not found",
    }));
  }

  return foundLocation;
});
