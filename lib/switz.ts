import Context from "./context";
import Switch from "./switch";

export function switz<T>(subject: any, statement: (context: Context<T>) => void): T | void {
  const sw      = new Switch<T>(subject);
  const context = new Context<T>(sw);

  statement(context);

  return sw.evaluate();
}

export default switz;
