import Case from "./case";
import Handler from "./handler";
import Matcher from "./matcher";
import Switch from "./switch";

export class Context<T> {
  constructor(
    protected sw: Switch<T>,
  ) {}

  matcher(matcher: Matcher): this {
    this.sw.setMatcher(matcher);
    return this;
  }

  case(condition: any, handler: Handler<T>): this {
    this.sw.addCase(new Case(condition, handler));
    return this;
  }

  default(handler: Handler<T>): this {
    this.sw.setDefaultHandler(handler);
    return this;
  }
}

export default Context;
