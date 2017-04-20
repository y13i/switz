import test from "ava";
import Case from "../lib/case";
import {EqualityMatcher} from "../lib/matcher";

const kase = new Case("foo", () => {
  return "bar";
});

test("it can handle", t => {
  t.is(kase.handle(), "bar");
});

test("it can match its condition to given subject with given matcher", t => {
  t.truthy(kase.match("foo", EqualityMatcher));
  t.falsy(kase.match("fooo", EqualityMatcher));
});
