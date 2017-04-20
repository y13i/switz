import Handler from "./handler";
import Matcher from "./matcher";

export class Case<T> {
  constructor(
    readonly condition: any,
    readonly handler:   Handler<T>,
  ) {}

  match(subject: any, matcher: Matcher): any {
    return matcher(subject, this.condition);
  }

  handle(match?: any): T {
    return this.handler(match);
  }
}

export default Case;
