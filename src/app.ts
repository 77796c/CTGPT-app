import { z } from "zod";
import {
  defineAction,
  defineApp,
  defineFlow,
  defineScreen,
  Effect,
  Flex,
  Form,
  Grid,
  Heading,
  Icon,
  Pill,
  Spacer,
  Stack,
  Text,
  TextArea,
  View
} from "@openai/chatgpt-apps";

import type { MagicResponse } from "./responses";
import { MAGIC_RESPONSES } from "./responses";

const askSchema = z.object({
  question: z
    .string()
    .min(3, "Ask something meaningful—three characters or more, please.")
    .max(120, "Keep it short and cosmic. 120 characters is plenty."),
  toneFilter: z
    .union([
      z.literal("all"),
      z.literal("positive"),
      z.literal("tentative"),
      z.literal("negative")
    ])
    .default("all")
});

type AskInput = z.infer<typeof askSchema>;

type ReadingRecord = {
  id: string;
  question: string;
  response: MagicResponse;
  timestamp: string;
};

type AppState = {
  history: ReadingRecord[];
  activeReading: ReadingRecord | null;
};

const selectResponse = (input: AskInput): MagicResponse => {
  const trimmed = input.question.trim();
  const filteredResponses =
    input.toneFilter === "all"
      ? MAGIC_RESPONSES
      : MAGIC_RESPONSES.filter((response) => response.tone === input.toneFilter);

  const seed = Math.abs(Array.from(trimmed).reduce((acc, char) => acc + char.charCodeAt(0), 0));
  const index = seed % filteredResponses.length;
  return filteredResponses[index];
};

const askTheOrb = defineAction({
  id: "ask-the-orb",
  title: "Ask the Orb",
  input: askSchema,
  async handler({ input, context }) {
    const response = selectResponse(input);

    const reading: ReadingRecord = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      question: input.question.trim(),
      response,
      timestamp: new Date().toISOString()
    };

    const previousHistory = (context.state.history ?? []) as ReadingRecord[];
    const updatedHistory = [reading, ...previousHistory].slice(0, 12);

    await context.setState({
      activeReading: reading,
      history: updatedHistory
    });

    return reading;
  }
});

const historyFlow = defineFlow<AppState>({
  id: "history-flow",
  initialState: {
    history: [],
    activeReading: null
  },
  actions: [askTheOrb]
});

const toneCopy = {
  positive: {
    heading: "Upbeat energy",
    description: "When you're ready to chase bold yeses and bright possibilities."
  },
  tentative: {
    heading: "Reflective guidance",
    description: "For when you’re looking for nuance, balance, or a gentle nudge."
  },
  negative: {
    heading: "Grounded realism",
    description: "Perfect for reality checks and cosmic course corrections."
  }
} as const;

const toneOptions: Array<{ label: string; value: AskInput["toneFilter"]; helper: string }> = [
  {
    label: "All vibrations",
    value: "all",
    helper: "Let the orb choose the energy that suits the moment."
  },
  {
    label: "Positive glow",
    value: "positive",
    helper: toneCopy.positive.description
  },
  {
    label: "Thoughtful hum",
    value: "tentative",
    helper: toneCopy.tentative.description
  },
  {
    label: "Real talk",
    value: "negative",
    helper: toneCopy.negative.description
  }
];

const appScreen = defineScreen<AppState>({
  id: "main-screen",
  title: "Magic Super 8 Ball",
  description: "Ask any question and let the cosmic orb respond with clarity, wit, and style.",
  render: ({ state, actions }) => {
    const active = state.activeReading;

    return (
      <View background="surface-raised" padding="lg" gap="2xl">
        <Stack gap="xl">
          <Stack gap="sm">
            <Heading level="1">Magic Super 8 Ball</Heading>
            <Text tone="subtle">
              Whisper your question, choose the vibe, and tap into a polished, responsive fortune-telling
              experience designed for flow.
            </Text>
          </Stack>

          <Form
            action={actions.get("ask-the-orb")}
            submitLabel="Reveal my reading"
            size="lg"
            alignment="stretch"
            surface="translucent"
            density="roomy"
          >
            <Stack gap="md">
              <Stack gap="xs">
                <Text as="label" htmlFor="question" weight="medium">
                  Your cosmic question
                </Text>
                <Text tone="subtle" size="sm">
                  Keep it thoughtful and specific. The orb responds best to grounded curiosity.
                </Text>
              </Stack>
              <TextArea
                id="question"
                name="question"
                placeholder="Will my idea spark something incredible?"
                maxLength={120}
                autoFocus
                rows={3}
                resize="vertical"
              />

              <Stack gap="xs">
                <Text weight="medium">Choose the energy</Text>
                <Text tone="subtle" size="sm">
                  Filter the response palette to match your mood—or let the orb improvise.
                </Text>
              </Stack>

              <Grid columns="repeat(auto-fit, minmax(180px, 1fr))" gap="sm">
                {toneOptions.map((option) => (
                  <Flex
                    key={option.value}
                    direction="column"
                    gap="xs"
                    padding="sm"
                    background="surface-neutral"
                    borderRadius="lg"
                  >
                    <Flex align="center" gap="xs">
                      <input
                        type="radio"
                        name="toneFilter"
                        value={option.value}
                        defaultChecked={option.value === "all"}
                      />
                      <Text weight="medium">{option.label}</Text>
                    </Flex>
                    <Text tone="subtle" size="sm">
                      {option.helper}
                    </Text>
                  </Flex>
                ))}
              </Grid>
            </Stack>
          </Form>
        </Stack>

        <Stack gap="xl">
          <Stack gap="xs">
            <Heading level="2">Latest reading</Heading>
            <Text tone="subtle" size="sm">
              Each response is infused with subtle motion, layered color, and confident typography for a
              premium feel.
            </Text>
          </Stack>

          {active ? (
            <Stack
              gap="md"
              padding="xl"
              borderRadius="xl"
              background="surface-floating"
              shadow="xl"
            >
              <Flex align="center" justify="space-between" wrap>
                <Flex align="center" gap="sm">
                  <Icon name="sparkle" size="lg" tone="brand" />
                  <Stack gap="xs">
                    <Text size="sm" tone="subtle">
                      {new Date(active.timestamp).toLocaleString()}
                    </Text>
                    <Text weight="semibold">{active.question}</Text>
                  </Stack>
                </Flex>
                <Pill tone={active.response.tone} emphasis="high">
                  {active.response.title}
                </Pill>
              </Flex>

              <Text size="lg">{active.response.description}</Text>

              <Effect type="glow" color={active.response.color} intensity="subtle" />
            </Stack>
          ) : (
            <Stack gap="sm" padding="lg" borderRadius="lg" background="surface-neutral">
              <Text weight="medium">Your reading will appear here.</Text>
              <Text tone="subtle" size="sm">
                Ask the orb above to receive a response that balances whimsy with clarity.
              </Text>
            </Stack>
          )}
        </Stack>

        <Stack gap="md">
          <Flex align="center" gap="sm">
            <Heading level="2" as="h2">
              Reading history
            </Heading>
            <Spacer />
            <Text tone="subtle" size="sm">
              The orb remembers your last {state.history.length} question
              {state.history.length === 1 ? "" : "s"}.
            </Text>
          </Flex>

          {state.history.length ? (
            <Stack gap="sm">
              {state.history.map((reading) => (
                <Flex
                  key={reading.id}
                  padding="md"
                  borderRadius="lg"
                  background="surface-elevated"
                  align="center"
                  gap="md"
                >
                  <Stack flex={1} gap="xs">
                    <Text weight="medium">{reading.question}</Text>
                    <Text tone="subtle" size="sm">
                      {new Date(reading.timestamp).toLocaleString()}
                    </Text>
                  </Stack>
                  <Pill tone={reading.response.tone}>{reading.response.title}</Pill>
                </Flex>
              ))}
            </Stack>
          ) : (
            <Stack gap="xs" padding="lg" background="surface-neutral" borderRadius="lg">
              <Text weight="medium">No readings yet.</Text>
              <Text tone="subtle" size="sm">
                Once you ask your first question, the orb will keep a polished log here.
              </Text>
            </Stack>
          )}
        </Stack>
      </View>
    );
  }
});

export default defineApp({
  id: "magic-super-8-ball",
  name: "Magic Super 8 Ball",
  version: "1.0.0",
  icon: "🎱",
  tagline: "A luminous ChatGPT orb that delivers cinematic fortune-telling.",
  actions: [askTheOrb],
  flows: [historyFlow],
  screens: [appScreen]
});
