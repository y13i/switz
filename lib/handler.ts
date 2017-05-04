export type Handler<T = any, M = any> = (match?: M) => T;

export const VoidHandler: Handler<void, void> = () => undefined;

export default Handler;
