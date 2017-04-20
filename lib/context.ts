import Case from "./case";
import Handler from "./handler";
import Matcher from "./matcher";
import Switch from "./switch";

export class Context<T = any, C = any, M = any> {
  constructor(
    protected sw: Switch<T, C, M>,
  ) {}

  matcher(matcher: Matcher<M, C>): this {
    this.sw.setMatcher(matcher);
    return this;
  }

  case(condition: C, handler: Handler<T, M>): this {
    this.sw.addCase(new Case<T, C, M>(condition, handler));
    return this;
  }

  default(handler: Handler<T, M>): this {
    this.sw.setDefaultHandler(handler);
    return this;
  }
}

export default Context;
