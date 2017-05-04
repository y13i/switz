export type Matcher = (subject: any, condition: any) => any;

export const EqualityMatcher: Matcher = (subject: any, condition: any) => {
  return subject === condition;
};

export const RegexpMatcher: Matcher = (subject: string, condition: RegExp) => {
  return subject.match(condition);
};

export const IncludingMatcher: Matcher = (subject: any[], condition: any) => {
  // return subject.includes(condition);
  return subject.find(i => i === condition) !== undefined;
};

export const IncludedMatcher: Matcher = (subject: any, condition: any[]) => {
  // return condition.includes(subject);
  return condition.find(i => i === subject) !== undefined;
};

export const FunctionMatcher: Matcher = (subject: any, fn: Function) => {
  return fn(subject);
};

export default Matcher;
