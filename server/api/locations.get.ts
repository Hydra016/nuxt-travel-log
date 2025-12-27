import { eq } from "drizzle-orm";

import db from "~/lib/db";
import { location } from "~/lib/db/schema";

import defineAuthenticatedEventHandler from "../utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  return await db.query.location.findMany({
    where: eq(location.userId, event.context.user.id),
  });
});
