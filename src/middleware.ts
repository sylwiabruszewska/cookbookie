import { chain } from "@/middlewares/chain";
import { withI18nMiddleware } from "@/middlewares/withI18nMiddleware";
import { withAuthMiddleware } from "@/middlewares/withAuthMiddleware";

export default chain([withI18nMiddleware, withAuthMiddleware]);

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
