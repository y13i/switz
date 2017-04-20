export type Matcher<Match, Subject, Condition> = (subject: Subject, condition: Condition) => Match;
// export type Matcher<Match = any, Subject = any, Condition = any> = (subject: Subject, condition: Condition) => Match; // TS2.3

export const EqualityMatcher: Matcher<Boolean, any, any> = (subject, condition) => {
// export const EqualityMatcher: Matcher<Boolean> = (subject, condition) => { //TS2.3
  return subject === condition;
};

export const RegexpMatcher: Matcher<RegExpMatchArray | null, string, RegExp> = (subject, condition) => {
  return subject.match(condition);
};

export const IncludingMatcher: Matcher<Boolean, any[], any> = (subject, condition) => {
  return subject.includes(condition);
};

export const IncludedMatcher: Matcher<Boolean, any, any[]> = (subject, condition) => {
  return condition.includes(subject);
};

export const FunctionMatcher: Matcher<any, any, (subject: any) => any> = (subject, fn) => {
  return fn(subject);
};

export default Matcher;
