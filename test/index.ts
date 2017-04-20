import test from "ava";
import switz, {RegexpMatcher} from "../lib";

test("`switz` is a function", t => {
  t.is(typeof switz, "function");
});

test("it can match subject and case", t => {
  let foo = "foo";

  switz("baz", s => {
    s.case("bar", () => foo = "bar");
    s.case("baz", () => foo = "baz");
  });

  t.is(foo, "baz");
});

test("it matches first matchable case", t => {
  let foo = "foo";

  switz("foo", s => {
    s.case("foo", () => foo = "foo!");
    s.case("foo", () => foo = "foo!!");
  });

  t.is(foo, "foo!");
});

test("it returns case's handler output", t => {
  const value1 = switz("foo", s => {
    s.case("foo", () => "foo!");
    s.case("bar", () => "bar!");
  });

  t.is(value1, "foo!");
});

test("it returns undefined if no match made", t => {
  let v1 = "foo";

  const v2 = switz("foo", s => {
    s.case("bar", () => {
      const v = "bar";
      v1 = v;
      return v;
    });

    s.case("baz", () => {
      const v = "baz";
      v1 = v;
      return v;
    });
  });

  t.is(v1, "foo");
  t.is(v2, undefined);
});

test("it returns undefined if no match made", t => {
  let v1 = "foo";

  const v2 = switz("foo", s => {
    s.case("bar", () => {
      const v = "bar";
      v1 = v;
      return v;
    });

    s.case("baz", () => {
      const v = "baz";
      v1 = v;
      return v;
    });
  });

  t.is(v1, "foo");
  t.is(v2, undefined);
});

test("it returns default handler output if no match made and custom default handler is set", t => {
  const value = switz("foo", s => {
    s.case("bar", () => "bar!");
    s.case("baz", () => "baz!");
    s.default(() => "404");
  });

  t.is(value, "404");
});

test("it can be used with type parameter", t => {
  const v = switz<string>("foo", s => {
    s.case("foo", () => "bar");
    s.case("bar", () => "baz");
    // s.case("fuz", () => 123); // ERROR!
  });

  t.is(v, "bar");
});

test("it can match subject and conditions with preset matcher", t => {
  const v = switz("fooooooooooooooooooooooooooooooo", s => {
    s.matcher(RegexpMatcher);
    s.case(/foo{10,}/, () => "yes");
    s.default(() => "no");
  });

  t.is(v, "yes");
});

test("it can match subject and conditions with custom matcher", t => {
  const v = switz("foo", s => {
    s.matcher((s, c) => s !== c); // nagation matcher

    s.case("foo", () => "bar");
    s.case("bar", () => "baz");
  });

  t.is(v, "baz");
});
