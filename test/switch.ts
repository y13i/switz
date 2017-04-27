import test from "ava";
import Switch from "../lib/switch";
import Case from "../lib/case";
import {RegexpMatcher} from "../lib/matcher";

test("it can add case and evaluate", t => {
  const sw = new Switch("b");

  sw.addCase(new Case("a", () => "A"));
  sw.addCase(new Case("b", () => "B"));

  t.is(sw.evaluate(), "B");
});

test("it can add multiple cases", t => {
  const sw = new Switch("b");

  sw.addCase(
    new Case("a", () => "A"),
    new Case("b", () => "B"),
  );

  t.is(sw.evaluate(), "B");
});

test("it matches first matchable case", t => {
  const sw = new Switch("a");

  sw.addCase(new Case("a", () => "A"));
  sw.addCase(new Case("a", () => "B"));

  t.is(sw.evaluate(), "A");
  t.not(sw.evaluate(), "B");
});

test("it returns undefined if no match made", t => {
  const sw = new Switch("c");
  const sw2 = new Switch("d");

  sw.addCase(new Case("a", () => "A"));
  sw.addCase(new Case("b", () => "B"));

  t.is(sw.evaluate(), undefined);
  t.is(sw2.evaluate(), undefined);
});

test("it returns default handler output if no match made and custom default handler is set", t => {
  const sw = new Switch("c");

  sw.addCase(new Case("a", () => "A"));
  sw.addCase(new Case("b", () => "B"));
  sw.setDefaultHandler(() => 404);

  t.is(sw.evaluate(), 404);
});

test("it can clear associated cases", t => {
  const sw = new Switch("a");

  sw.addCase(new Case("a", () => "A"));
  sw.addCase(new Case("b", () => "B"));
  sw.clearCases();

  t.is(sw.evaluate(), undefined);
});

test("it can match cases with given matcher", t => {
  const sw = new Switch("ABC1234").setMatcher(RegexpMatcher);

  sw.addCase(new Case(/C(\d+)/, (match) => match[1]));
  t.is(sw.evaluate(), "1234");
});
