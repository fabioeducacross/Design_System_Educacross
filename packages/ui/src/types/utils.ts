/**
 * Utility types do TypeScript para manipulação de tipos avançada
 * @module types/utils
 */

import type * as React from "react";

/**
 * Extrai apenas as keys obrigatórias de um tipo
 * @example
 * type User = { id: string; name: string; email?: string };
 * type Required = RequiredKeys<User>; // "id" | "name"
 */
export type RequiredKeys<T> = {
  [K in keyof T]-?: object extends Pick<T, K> ? never : K;
}[keyof T];

/**
 * Extrai apenas as keys opcionais de um tipo
 * @example
 * type User = { id: string; name: string; email?: string };
 * type Optional = OptionalKeys<User>; // "email"
 */
export type OptionalKeys<T> = {
  [K in keyof T]-?: object extends Pick<T, K> ? K : never;
}[keyof T];

/**
 * Torna todas as propriedades obrigatórias (remove ? e undefined)
 * @example
 * type User = { name?: string; email?: string };
 * type Complete = DeepRequired<User>; // { name: string; email: string }
 */
export type DeepRequired<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
};

/**
 * Torna todas as propriedades opcionais recursivamente
 * @example
 * type User = { profile: { name: string; age: number } };
 * type Partial = DeepPartial<User>; // { profile?: { name?: string; age?: number } }
 */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

/**
 * Torna propriedades específicas obrigatórias
 * @example
 * type User = { id?: string; name?: string; email?: string };
 * type WithId = RequireProps<User, "id">; // { id: string; name?: string; email?: string }
 */
export type RequireProps<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Torna propriedades específicas opcionais
 * @example
 * type User = { id: string; name: string; email: string };
 * type Flexible = OptionalProps<User, "email">; // { id: string; name: string; email?: string }
 */
export type OptionalProps<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

/**
 * Remove propriedades específicas de forma type-safe
 * @example
 * type User = { id: string; name: string; password: string };
 * type Public = Without<User, "password">; // { id: string; name: string }
 */
export type Without<T, K extends keyof T> = Omit<T, K>;

/**
 * Extrai o tipo das props de um componente React
 * @example
 * const Button = (props: { label: string; onClick: () => void }) => null;
 * type ButtonProps = PropsOf<typeof Button>; // { label: string; onClick: () => void }
 */
export type PropsOf<
  T extends React.ComponentType<any> | keyof JSX.IntrinsicElements
> = T extends React.ComponentType<infer P>
  ? P
  : T extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[T]
  : never;

/**
 * Extrai o tipo de retorno de uma promise
 * @example
 * const fetchUser = async () => ({ id: "1", name: "John" });
 * type User = Awaited<ReturnType<typeof fetchUser>>; // { id: string; name: string }
 */
export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

/**
 * Extrai o tipo de item de um array
 * @example
 * type Numbers = number[];
 * type Item = ArrayItem<Numbers>; // number
 */
export type ArrayItem<T> = T extends (infer U)[] ? U : never;

/**
 * Cria uma união de todos os valores de um objeto
 * @example
 * const SIZES = { sm: "12px", md: "16px", lg: "20px" } as const;
 * type Size = ValueOf<typeof SIZES>; // "12px" | "16px" | "20px"
 */
export type ValueOf<T> = T[keyof T];

/**
 * Torna um tipo readonly recursivamente
 * @example
 * type User = { profile: { name: string } };
 * type Immutable = DeepReadonly<User>; // { readonly profile: { readonly name: string } }
 */
export type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

/**
 * Cria uma união discriminada com literais de string
 * @example
 * type Status = Enum<"pending" | "success" | "error">;
 * // Garante que apenas esses valores literais sejam aceitos
 */
export type Enum<T extends string> = T;

/**
 * Cria um tipo que aceita string literal ou string genérica
 * Útil para props que aceitam valores conhecidos mas também permitem customização
 * @example
 * type Color = LiteralUnion<"primary" | "secondary", string>;
 * // Aceita "primary", "secondary" ou qualquer outra string
 */
export type LiteralUnion<T extends U, U = string> =
  | T
  | (U & { _?: never });

/**
 * Substitui o tipo de uma propriedade específica
 * @example
 * type User = { id: string; createdAt: string };
 * type WithDate = ReplaceType<User, "createdAt", Date>; // { id: string; createdAt: Date }
 */
export type ReplaceType<T, K extends keyof T, NewType> = Omit<T, K> & {
  [P in K]: NewType;
};

/**
 * Mescla dois tipos, com o segundo sobrescrevendo o primeiro
 * @example
 * type Base = { a: string; b: number };
 * type Override = { b: string; c: boolean };
 * type Merged = Merge<Base, Override>; // { a: string; b: string; c: boolean }
 */
export type Merge<T, U> = Omit<T, keyof U> & U;

/**
 * Extrai apenas as propriedades que são funções
 * @example
 * type User = { name: string; save: () => void; delete: () => void };
 * type Methods = FunctionKeys<User>; // "save" | "delete"
 */
export type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

/**
 * Extrai apenas as propriedades que NÃO são funções
 * @example
 * type User = { name: string; age: number; save: () => void };
 * type Data = NonFunctionKeys<User>; // "name" | "age"
 */
export type NonFunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
}[keyof T];

/**
 * Torna todas as propriedades mutable (remove readonly)
 * @example
 * type User = { readonly id: string; readonly name: string };
 * type Mutable = Mutable<User>; // { id: string; name: string }
 */
export type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

/**
 * Cria um tipo com exatamente uma das chaves fornecidas
 * Útil para props mutuamente exclusivas
 * @example
 * type Props = ExactlyOne<{ href: string } | { onClick: () => void }>;
 * // Aceita APENAS href OU onClick, nunca ambos
 */
export type ExactlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];

/**
 * Cria um tipo que requer pelo menos uma das chaves
 * @example
 * type Props = AtLeastOne<{ a?: string; b?: string; c?: string }>;
 * // Obriga que pelo menos uma das props seja fornecida
 */
export type AtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

/**
 * Valida que um tipo estende outro (compile-time check)
 * @example
 * type Valid = Extends<{ a: string }, { a: string; b: number }>; // true
 * type Invalid = Extends<{ a: number }, { a: string }>; // false
 */
export type Extends<T, U> = T extends U ? true : false;

/**
 * Cria uma tupla de tamanho fixo com tipo específico
 * @example
 * type Triple = Tuple<number, 3>; // [number, number, number]
 */
export type Tuple<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : _TupleOf<T, N, []>
  : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R["length"] extends N
  ? R
  : _TupleOf<T, N, [T, ...R]>;

/**
 * Helper para criar types condicionais mais legíveis
 * @example
 * type Result = If<true, string, number>; // string
 * type Result2 = If<false, string, number>; // number
 */
export type If<Condition extends boolean, Then, Else> = Condition extends true
  ? Then
  : Else;

/**
 * Nega uma condição de tipo
 * @example
 * type IsString = "hello" extends string ? true : false; // true
 * type IsNotString = Not<IsString>; // false
 */
export type Not<T extends boolean> = T extends true ? false : true;
