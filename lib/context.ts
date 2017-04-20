import Case from "./case";
import Handler from "./handler";
import Matcher from "./matcher";
import Switch from "./switch";

export class Context<Return, Subject, Condition, Match> {
  constructor(
    protected sw: Switch<Return, Subject, Condition, Match>,
  ) {}

  matcher(matcher: Matcher<Match, Subject, Condition>): this {
    this.sw.setMatcher(matcher);
    return this;
  }

  case(condition: Condition, handler: Handler<any, any>): this {
    this.sw.addCase(new Case(condition, handler));
    return this;
  }

  default(handler: Handler<any, any>): this {
    this.sw.setDefaultHandler(handler);
    return this;
  }
}

export default Context;
