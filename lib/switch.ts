import Case from "./case";
import Handler, {VoidHandler} from "./handler";
import Matcher, {EqualityMatcher} from "./matcher";

export class Switch<T> {
  protected cases: Case<T>[] = [];

  constructor(
    readonly subject: any,

    protected matcher        = EqualityMatcher,
    protected defaultHandler = VoidHandler,
  ) {}

  addCase(kase: Case<T>): this {
    this.cases.push(kase);
    return this;
  }

  clearCases(): this {
    this.cases = [];
    return this;
  }

  setMatcher(matcher: Matcher): this {
    this.matcher = matcher;
    return this;
  }

  setDefaultHandler(handler: Handler<T>): this {
    this.defaultHandler = handler;
    return this;
  }

  evaluate(): T | void {
    const findCaseResult = this.findCase();

    if (findCaseResult.matchedCase) return findCaseResult.matchedCase.handle(findCaseResult.match);

    return this.defaultHandler();
  }

  private findCase(): {matchedCase?: Case<T>, match?: any} {
    let match: any = undefined;

    const matchedCase = this.cases.find(kase => {
      match = kase.match(this.subject, this.matcher);
      return !!match;
    });

    return {matchedCase, match};
  }
}

export default Switch;
