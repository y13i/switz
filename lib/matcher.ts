export type Matcher = (subject: any, condition: any) => any;

export const EqualityMatcher: Matcher = (subject, condition) => {
// export const EqualityMatcher: Matcher<Boolean> = (subject, condition) => { //TS2.3
  return subject === condition;
};

export const RegexpMatcher: Matcher = (subject, condition) => {
  return subject.match(condition);
};

export const IncludingMatcher: Matcher = (subject, condition) => {
  return subject.includes(condition);
};

export const IncludedMatcher: Matcher = (subject, condition) => {
  return condition.includes(subject);
};

export const FunctionMatcher: Matcher = (subject, fn) => {
  return fn(subject);
};

export default Matcher;
