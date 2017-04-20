import Context from "./context";
import Switch from "./switch";

export function switz<T = any, C = any, M = any>(subject: any, statement: (context: Context<T, C, M>) => void): T | void {
  const sw      = new Switch<T, C, M>(subject);
  const context = new Context<T, C, M>(sw);

  statement(context);

  return sw.evaluate();
}

export default switz;
