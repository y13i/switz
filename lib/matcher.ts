export type Matcher = (subject: any, condition: any) => any;

export const EqualityMatcher = (subject: any, condition: any) => {
  return subject === condition;
};

export const RegexpMatcher = (subject: string, condition: RegExp) => {
  return subject.match(condition);
};

export const IncludingMatcher = (subject: any[], condition: any) => {
  return subject.includes(condition);
};

export const IncludedMatcher = (subject: any, condition: any[]) => {
  return condition.includes(subject);
};

export const FunctionMatcher = (subject: any, fn: Function) => {
  return fn(subject);
};

export default Matcher;
