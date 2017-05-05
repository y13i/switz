import Context from "./context";
import Switch from "./switch";

/**
 * @return          Matched case's handler output, or default handler output, or undefined.
 * @param subject   An expression whose result is matched against each case condition.
 * @param statement Function which determine cases, default handler, and matcher.
 */
export function switz<T = any, C = any, M = any>(subject: any, statement: (context: Context<T, C, M>) => void): T | void {
  const sw      = new Switch<T, C, M>(subject);
  const context = new Context<T, C, M>(sw);

  statement(context);

  return sw.evaluate();
}

export default switz;
