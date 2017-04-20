import Case from "./case";
import Handler, {DefaultHandler} from "./handler";
import Matcher, {EqualityMatcher} from "./matcher";

export class Switch<Return, Subject, Condition, Match> {
// export class Switch<Return = any, Subject = any, Condition = any, Match = any> { // TS2.3
  protected cases: Case<Return, Subject, Condition, Match>[] = [];

  constructor(
    readonly subject: Subject,
    protected matcher: Matcher<any, Subject, Condition> = EqualityMatcher,
    protected defaultHandler: Handler<Return, Match> = <Handler<Return, Match>>DefaultHandler,
  ) {}

  addCase(kase: Case<Return, Subject, Condition, Match>): this {
    this.cases.push(kase);
    return this;
  }

  clearCases(): this {
    this.cases = [];
    return this;
  }

  setMatcher(matcher: Matcher<Match, Subject, Condition>): this {
    this.matcher = matcher;
    return this;
  }

  setDefaultHandler(handler: Handler<Return, Match>): this {
    this.defaultHandler = handler;
    return this;
  }

  evaluate(): Return {
    const findCaseResult = this.findCase();

    if (findCaseResult.matchedCase) return findCaseResult.matchedCase.handle(findCaseResult.match);

    return this.defaultHandler();
  }

  private findCase(): {matchedCase?: Case<Return, Subject, Condition, Match>, match?: Match} {
    let match: Match | undefined = undefined;

    const matchedCase = this.cases.find(kase => {
      match = kase.match(this.subject, this.matcher);
      return !!match;
    });

    return {matchedCase, match};
  }
}

export default Switch;
