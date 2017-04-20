import Handler from "./handler";
import Matcher from "./matcher";

export class Case<T = any, C = any, M = any> {
  constructor(
    readonly condition: C,
    readonly handler:   Handler<T, M>,
  ) {}

  match(subject: any, matcher: Matcher<M, C>): any {
    return matcher(subject, this.condition);
  }

  handle(match?: any): T {
    return this.handler(match);
  }
}

export default Case;
