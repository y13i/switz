import Context from "./context";
import Switch from "./switch";

export function switz<Return, Subject, Condition, Match>(subject: Subject, statement: (context: Context<Return, Subject, Condition, Match>) => void): Return {
  const sw      = new Switch<Return, Subject, Condition, any>(subject);
  const context = new Context<Return, Subject, Condition, Match>(sw);

  statement(context);

  return sw.evaluate();
}

export default switz;
