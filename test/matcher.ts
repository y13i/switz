import test from "ava";

import Matcher, {
  EqualityMatcher,
  RegexpMatcher,
  IncludingMatcher,
  IncludedMatcher,
  FunctionMatcher,
} from "../lib/matcher";

test("equality matcher", t => {
  t.true(EqualityMatcher(1, 1));
  t.false(EqualityMatcher(1, 2));
  t.true(EqualityMatcher("abc", "abc"));
  t.false(EqualityMatcher("abc", "def"));
});

test("regexp matcher", t => {
  const subject = "Lorem ipsum";

  t.truthy(RegexpMatcher(subject, /rem/));
  t.falsy(RegexpMatcher(subject, /lem/));
});

test("including matcher", t => {
  const subject = ["a", "b", "c"];

  t.truthy(IncludingMatcher(subject, "a"));
  t.falsy(IncludingMatcher(subject, "d"));
});

test("included matcher", t => {
  const subject = "a";

  t.truthy(IncludedMatcher(subject, ["a", "b", "c"]));
  t.falsy(IncludedMatcher(subject, ["d", "e", "f"]));
});

test("function matcher", t => {
  const testFunction = (n: number) => n === 42;

  t.truthy(FunctionMatcher(42, testFunction));
  t.falsy(FunctionMatcher(43, testFunction));
});

test("custom matcher", t => {
  const alwaysMatch: Matcher = (_s, _c) => true;

  t.true(alwaysMatch(1, 1));
});
