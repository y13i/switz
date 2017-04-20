import test from "ava";
import {VoidHandler} from "../lib/handler";

test("default handler", t => {
  t.is(VoidHandler(), undefined);
});

test("custom handler", t => {
  const handler = (match: string) => match.toUpperCase();

  t.is(handler("a"), "A");
});
