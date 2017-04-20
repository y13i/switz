export type Handler<T = any, M = any> = (match?: M) => T;

export const VoidHandler = () => undefined;

export default Handler;
