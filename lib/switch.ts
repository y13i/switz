import Case from "./case";
import Handler, {VoidHandler} from "./handler";
import Matcher, {EqualityMatcher} from "./matcher";

export class Switch<T = any, C = any, M = any> {
  protected cases: Case<T, C, M>[] = [];

  constructor(
    readonly subject: any,

    protected matcher: Matcher<any, any> = EqualityMatcher,
    protected defaultHandler: Handler<any, any> = VoidHandler,
  ) {}

  addCase(kase: Case<T, C, M>): this {
    this.cases.push(kase);
    return this;
  }

  clearCases(): this {
    this.cases = [];
    return this;
  }

  setMatcher(matcher: Matcher<M, C>): this {
    this.matcher = matcher;
    return this;
  }

  setDefaultHandler(handler: Handler<T, M>): this {
    this.defaultHandler = handler;
    return this;
  }

  evaluate(): T | void {
    const findCaseResult = this.findCase();

    if (findCaseResult.matchedCase) return findCaseResult.matchedCase.handle(findCaseResult.match);

    return this.defaultHandler();
  }

  private findCase(): {matchedCase?: Case<T, C, M>, match?: any} {
    let match: any = undefined;

    const matchedCase = this.cases.find(kase => {
      match = kase.match(this.subject, this.matcher);
      return !!match;
    });

    return {matchedCase, match};
  }
}

export default Switch;
