import { create } from "zustand";
import { type ChatContext } from "~/pages/new";
import { type Message } from "~/types/types";

const generateSystemMessage = (inputs: ChatContext): Message => {
  return {
    role: "system",
    content: `"I want you to act like ${inputs.characterName} from ${inputs.characterFrom}.
    ${inputs.characterMindSet}.
    I want you to respond and answer like ${inputs.characterName} using the tone, manner and vocabulary ${inputs.characterName} would use.
    Do not write any explanations.
    Only answer like ${inputs.characterName}.
    You must know all of the knowledge of ${inputs.characterName}.
    Actions can be expressed wrapped in *. For exampleTips hat*.
    Be very descriptive with your actions.
    ${inputs.setting}.
    `,
    id: 0,
  };
};

type ChatState = {
  context: ChatContext;
  systemMessage: Message;
  messages: Message[];
  status: "not-started" | "started";
  nextId: number;
};

type ChatStore = ChatState & {
  addMessage: (message: Message) => void;
  init: (inputs: ChatContext) => void;
  clearMessages: () => void;
  clearState: () => void;
  rewind: (id: number) => void;
};

const emptyContext: ChatContext = {
  characterName: "",
  characterFrom: "",
  characterMindSet: "",
  setting: "",
};

const initialState: ChatState = {
  messages: [],
  context: emptyContext,
  systemMessage: { role: "system", content: "", id: 0 },
  status: "not-started",
  nextId: 1,
};

export const useChatStore = create<ChatStore>((set) => ({
  ...initialState,
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
      nextId: message.id + 1,
    })),
  init: (inputs) => {
    const systemMessage = generateSystemMessage(inputs);
    set({
      ...initialState,
      context: { ...inputs },
      systemMessage: systemMessage,
      status: "started",
    });
  },
  clearMessages: () => set({ messages: [] }),
  clearState: () => set(initialState),
  rewind: (id) =>
    set((state) => ({
      messages: state.messages.filter((message) => message.id <= id),
      nextId: id,
    })),
}));
