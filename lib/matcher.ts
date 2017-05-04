export type Matcher<M = any, C = any> = (subject: any, condition: C) => M;

export const EqualityMatcher: Matcher<boolean> = (subject: any, condition: any) => {
  return subject === condition;
};

export const RegexpMatcher: Matcher<RegExpMatchArray | null, RegExp> = (subject: string, condition: RegExp) => {
  return subject.match(condition);
};

export const IncludingMatcher: Matcher<boolean> = (subject: any[], condition: any) => {
  // return subject.includes(condition);
  return subject.find(i => i === condition) !== undefined;
};

export const IncludedMatcher: Matcher<boolean, any[]> = (subject: any, condition: any[]) => {
  // return condition.includes(subject);
  return condition.find(i => i === subject) !== undefined;
};

export const FunctionMatcher: Matcher<any, Function> = (subject: any, fn: Function) => {
  return fn(subject);
};

export default Matcher;
