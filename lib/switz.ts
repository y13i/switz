import Context from "./context";
import Switch from "./switch";

/**
 * @return          Matched case's handler output, or default handler output, or undefined.
 * @param subject   An expression whose result is matched against each case condition.
 * @param statement Function which determine cases, default handler, and matcher.
 */
export function switz<T>(subject: any, statement: (context: Context<T>) => void): T | void {
  const sw      = new Switch<T>(subject);
  const context = new Context<T>(sw);

  statement(context);

  return sw.evaluate();
}

export default switz;
