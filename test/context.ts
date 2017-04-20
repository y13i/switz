import test from "ava";
import Context from "../lib/context";
import Switch from "../lib/switch";
import {RegexpMatcher} from "../lib/matcher";

const sw      = new Switch("abc");
const context = new Context(sw);

test("it can set cases", t => {
  context.case("abc", () => "ABC!");
  context.case("def", () => "DEF!");
  t.pass();
});

test("it can set default", t => {
  context.default(() => "No match!");
  t.pass();
});

test("it can set matcher", t => {
  context.matcher(<any>RegexpMatcher);
  t.pass();
});
