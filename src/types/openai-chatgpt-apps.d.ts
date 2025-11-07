declare module "@openai/chatgpt-apps" {
  import type { ReactNode } from "react";
  import type { ZodSchema } from "zod";

  export type Tone = "positive" | "negative" | "tentative" | "brand" | "subtle" | "critical" | "info";
  export type BackgroundStyle =
    | "surface"
    | "surface-neutral"
    | "surface-elevated"
    | "surface-floating"
    | "surface-raised"
    | "surface-translucent";
  export type Padding = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  export type Gap = Padding;

  export interface ActionContext<State> {
    state: Partial<State>;
    setState: (value: Partial<State>) => Promise<void> | void;
  }

  export interface DefinedAction<Input, Output = unknown, State = unknown> {
    id: string;
    title?: string;
    input: ZodSchema<Input>;
    handler: (params: { input: Input; context: ActionContext<State> }) => Promise<Output> | Output;
  }

  export function defineAction<Input, Output, State>(config: DefinedAction<Input, Output, State>): DefinedAction<Input, Output, State>;

  export interface DefinedFlow<State> {
    id: string;
    initialState: State;
    actions?: Array<DefinedAction<unknown, unknown, State>>;
  }

  export function defineFlow<State>(config: DefinedFlow<State>): DefinedFlow<State>;

  export interface ScreenRenderProps<State> {
    state: State;
    actions: Map<string, DefinedAction<any, any, State>>;
  }

  export interface DefinedScreen<State> {
    id: string;
    title: string;
    description?: string;
    render: (props: ScreenRenderProps<State>) => ReactNode;
  }

  export function defineScreen<State>(config: DefinedScreen<State>): DefinedScreen<State>;

  export interface DefinedApp {
    id: string;
    name: string;
    version: string;
    icon?: string;
    tagline?: string;
    actions?: Array<DefinedAction<any, any, any>>;
    flows?: Array<DefinedFlow<any>>;
    screens?: Array<DefinedScreen<any>>;
  }

  export function defineApp(config: DefinedApp): DefinedApp;

  export const View: (props: {
    children?: ReactNode;
    background?: BackgroundStyle;
    padding?: Padding;
    gap?: Gap;
  }) => ReactNode;

  export const Stack: (props: {
    children?: ReactNode;
    gap?: Gap;
    padding?: Padding;
    background?: BackgroundStyle;
    borderRadius?: "md" | "lg" | "xl";
    shadow?: "sm" | "md" | "lg" | "xl";
  }) => ReactNode;

  export const Flex: (props: {
    children?: ReactNode;
    align?: "start" | "center" | "end" | "stretch";
    justify?: "start" | "center" | "end" | "space-between";
    gap?: Gap;
    wrap?: boolean;
    direction?: "row" | "column";
    padding?: Padding;
    background?: BackgroundStyle;
    borderRadius?: "md" | "lg" | "xl";
    flex?: number;
  }) => ReactNode;

  export const Grid: (props: {
    children?: ReactNode;
    columns?: string;
    gap?: Gap;
  }) => ReactNode;

  export const Heading: (props: {
    level?: "1" | "2" | "3" | "4";
    as?: string;
    children?: ReactNode;
  }) => ReactNode;

  export const Text: (props: {
    as?: string;
    htmlFor?: string;
    weight?: "regular" | "medium" | "semibold";
    tone?: "default" | "subtle" | Tone;
    size?: "sm" | "md" | "lg";
    children?: ReactNode;
  }) => ReactNode;

  export const TextArea: (props: {
    id?: string;
    name?: string;
    placeholder?: string;
    autoFocus?: boolean;
    rows?: number;
    maxLength?: number;
    resize?: "vertical" | "horizontal" | "none";
  }) => ReactNode;

  export const Form: (props: {
    action: DefinedAction<any, any, any> | undefined;
    submitLabel?: string;
    size?: "md" | "lg";
    alignment?: "start" | "stretch";
    surface?: BackgroundStyle | "translucent";
    density?: "compact" | "cozy" | "roomy";
    children?: ReactNode;
  }) => ReactNode;

  export const Pill: (props: {
    children?: ReactNode;
    tone?: Tone | "default";
    emphasis?: "low" | "medium" | "high";
  }) => ReactNode;

  export const Icon: (props: {
    name: string;
    tone?: Tone | "default";
    size?: "sm" | "md" | "lg";
  }) => ReactNode;

  export const Effect: (props: {
    type: "glow" | "pulse" | "shine";
    color?: string;
    intensity?: "subtle" | "medium" | "bold";
  }) => ReactNode;

  export const Spacer: (props?: { size?: Gap }) => ReactNode;
}
