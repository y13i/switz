export type Handler<Return, Match> = (match?: Match) => Return;

export const DefaultHandler: Handler<void, void> = () => undefined;

export default Handler;
