import Handler from "./handler";
import Matcher from "./matcher";

export class Case<Return, Subject, Condition, Match> {
// export class Case<Return = any, Subject = any, Condition = any, Match = any> { // TS2.3
  constructor(
    readonly condition: Condition,
    readonly handler:   Handler<Return, Match>,
  ) {}

  match(subject: Subject, matcher: Matcher<Match, Subject, Condition>): Match {
    return matcher(subject, this.condition);
  }

  handle(match?: Match): Return {
    return this.handler(match);
  }
}

export default Case;
