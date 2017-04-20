import test from "ava";
import Handler, {DefaultHandler} from "../lib/handler";

test("default handler", t => {
  t.is(DefaultHandler(), undefined);
});

test("custom handler", t => {
  const handler: Handler<string, string> = (match: string) => match.toUpperCase();

  t.is(handler("a"), "A");
});
