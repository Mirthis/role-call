import { type NextPage } from "next";
import {
  PaperAirplaneIcon,
  TrashIcon,
  ArrowUturnLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import MessageBubble from "~/components/MessageBubble";
import { Transition } from "@headlessui/react";
import LoadingText from "~/components/LoadingText";
import { useChatStore } from "~/utils/store";
import { type Message } from "~/types/types";
import { useRouter } from "next/router";
import OpacityTransition from "~/components/OpacityTransition";
import RewindModal from "~/components/RewindModal";

const Chat: NextPage = () => {
  const router = useRouter();

  const {
    systemMessage,
    messages,
    context,
    addMessage,
    status,
    clearMessages,
    nextId,
  } = useChatStore((state) => state);

  const [text, setText] = useState<string>("");
  const [rewindModal, setRewindModal] = useState<boolean>(false);
  const [rewindTo, setRewindTo] = useState<number>(0);

  console.log({ context });
  console.log({ systemMessage });
  console.log({ messages });

  useEffect(() => {
    console.log("useEffetct");
    if (status === "not-started") {
      void router.replace("/new");
    }
  }, [status, router]);

  const {
    mutate: sendMessage,
    isLoading: isResponding,
    isError,
    reset: resetMutation,
  } = api.chat.interact.useMutation({
    onSuccess: (data) => {
      console.log(data);
      addMessage({ ...data, id: nextId });
    },
  });

  const callAssistant = () => {
    const newMessage: Message =
      text === ""
        ? {
            id: nextId,
            content: text,
            role: "user",
            hide: true,
          }
        : {
            id: nextId,
            content: text,
            role: "user",
          };
    sendMessage({ messages: [systemMessage, ...messages, newMessage] });
    addMessage(newMessage);
    setText("");
  };

  const resendLastMessage = () => {
    sendMessage({ messages: [systemMessage, ...messages] });
  };

  const resetChat = () => {
    clearMessages();
    resetMutation();
  };

  const openRewindModal = (id: number) => {
    setRewindTo(id);
    setRewindModal(true);
  };

  const closeRewindModal = () => {
    setRewindModal(false);
  };

  return (
    <>
      <RewindModal
        isOpen={rewindModal}
        rewindToId={rewindTo}
        onClose={closeRewindModal}
      />
      <div>
        <h1 className="text-4xl font-bold">
          Chat with {context.characterName}
        </h1>
        <div className="flex h-[70vh] flex-col justify-end overflow-auto">
          <Transition
            appear={true}
            show={true}
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
          >
            <div>
              <div className="chat chat-start">
                <div className=" chat-bubble">
                  <p>Character Name: {context.characterName}</p>
                  <p>From: {context.characterFrom}</p>
                  <p>Mindset: {context.characterMindSet}</p>
                  <p>Setting: {context.setting}</p>
                </div>
              </div>
              <hr className="my-4 h-1 border-none bg-base-300" />
            </div>
          </Transition>

          {messages.map((message) => (
            <>
              {!message.hide && (
                <OpacityTransition key={message.id} show>
                  <div className="flex items-center justify-start">
                    <MessageBubble message={message} />
                    {message.role === "assistant" && (
                      <button
                        title="Rewind to this message"
                        className=" btn-sm btn-circle btn border"
                        onClick={() => openRewindModal(message.id)}
                      >
                        <ArrowUturnLeftIcon className="h-6 w-6 text-warning" />
                      </button>
                    )}
                  </div>
                </OpacityTransition>
              )}
            </>
          ))}
          <OpacityTransition show={isResponding}>
            <div className="chat chat-start">
              <div className="chat-bubble chat-bubble-primary">
                <LoadingText />
              </div>
            </div>
          </OpacityTransition>
          <OpacityTransition show={isError}>
            <div className="chat chat-start">
              <div className="chat-bubble bg-error text-white">
                <div>
                  Something went wrong.{" "}
                  <button
                    className="font-semibold underline"
                    onClick={resendLastMessage}
                  >
                    Resent last message.
                  </button>
                </div>
              </div>
            </div>
          </OpacityTransition>
        </div>

        <div className="h-4"></div>

        <div className="flex items-center space-x-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="textarea-accent textarea textarea-lg h-full w-full"
            placeholder="Enter your message here..."
          ></textarea>
          <div className="flex flex-col gap-y-2">
            {text === "" ? (
              <button
                className=" btn-success  btn  flex w-32 justify-start"
                type="button"
                title="Ask to cotinue"
                disabled={isResponding || isError}
                onClick={callAssistant}
              >
                <ChevronDoubleRightIcon className="mr-2 h-6 w-6" />
                <p>Cotinue</p>
              </button>
            ) : (
              <button
                className=" btn-success btn  flex w-32 justify-start"
                type="button"
                disabled={isResponding || isError}
                onClick={callAssistant}
                title="Ask to cotinue"
              >
                <PaperAirplaneIcon className="mr-2 h-6 w-6" />
                <p>Send</p>
              </button>
            )}

            <button
              className="btn-error  btn flex w-32 justify-start"
              title="Reset the chat"
              disabled={isResponding}
              onClick={resetChat}
            >
              <TrashIcon className="mr-2 h-6 w-6" />
              <p>Reset</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
