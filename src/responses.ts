export type MagicResponseTone = "positive" | "tentative" | "negative";

export type MagicResponse = {
  id: string;
  tone: MagicResponseTone;
  title: string;
  description: string;
  color: string;
};

export const MAGIC_RESPONSES: MagicResponse[] = [
  {
    id: "crystal-clear",
    tone: "positive",
    title: "Crystal Clear",
    description: "Signs point to an absolutely radiant yes.",
    color: "#3DD68C"
  },
  {
    id: "cosmic-wink",
    tone: "positive",
    title: "Cosmic Wink",
    description: "The universe is already smiling in your direction.",
    color: "#5BE49B"
  },
  {
    id: "destiny-aligned",
    tone: "positive",
    title: "Destiny Aligned",
    description: "All threads of fate are weaving toward the answer you seek.",
    color: "#74F0AC"
  },
  {
    id: "starlit-sign",
    tone: "positive",
    title: "Starlit Sign",
    description: "Every constellation lights up with a confident yes.",
    color: "#8FF9BE"
  },
  {
    id: "vibrant-yes",
    tone: "positive",
    title: "Vibrant Yes",
    description: "Magnetic energy says go for it without hesitation.",
    color: "#A4FFD0"
  },
  {
    id: "listen-closely",
    tone: "tentative",
    title: "Listen Closely",
    description: "The vision is hazy—rephrase the question or dig deeper.",
    color: "#F5D565"
  },
  {
    id: "pause-and-see",
    tone: "tentative",
    title: "Pause & See",
    description: "Let the cosmic dust settle before you decide.",
    color: "#F3C861"
  },
  {
    id: "ask-again",
    tone: "tentative",
    title: "Ask Again",
    description: "The orb is rebooting its clairvoyance—try a fresh angle soon.",
    color: "#F9DC8C"
  },
  {
    id: "foggy-horizon",
    tone: "tentative",
    title: "Foggy Horizon",
    description: "You’re on the verge—seek one more clue to clarify.",
    color: "#F6D477"
  },
  {
    id: "resounding-no",
    tone: "negative",
    title: "Resounding No",
    description: "Every ripple settles on a definitive no.",
    color: "#F97066"
  },
  {
    id: "shift-course",
    tone: "negative",
    title: "Shift Course",
    description: "Redirect your energy—the path ahead is blocked.",
    color: "#F25B54"
  },
  {
    id: "cosmic-detour",
    tone: "negative",
    title: "Cosmic Detour",
    description: "The stars advise a different approach for now.",
    color: "#EF4E4E"
  },
  {
    id: "not-now",
    tone: "negative",
    title: "Not Now",
    description: "Timing is off—wait for the cosmic currents to change.",
    color: "#E5484D"
  },
  {
    id: "let-go",
    tone: "negative",
    title: "Let It Go",
    description: "Release the question; the answer is a grounded no.",
    color: "#D93036"
  }
];
