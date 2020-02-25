/// <reference types="next" />
/// <reference types="next/types/global" />

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
type GetProps<T extends (...args: any) => any> = ThenArg<
  ReturnType<T>
> extends { props: infer U }
  ? U
  : never;
