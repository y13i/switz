export type Handler<T> = (match?: any) => T;

export const VoidHandler: Handler<void> = () => undefined;

export default Handler;
