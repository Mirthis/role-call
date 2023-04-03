import { type NextPage } from "next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  CHARACTER_MAX_LENGTH,
  CHARACTER_MIN_LENGTH,
  CONTEXT_MAX_LENGTH,
  CONTEXT_MIN_LENGTH,
} from "~/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChatStore } from "~/utils/store";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const chatContext = z.object({
  characterName: z
    .string()
    .min(CHARACTER_MIN_LENGTH, {
      message: `Character name must be at least ${CHARACTER_MIN_LENGTH} characters`,
    })
    .max(CHARACTER_MAX_LENGTH, {
      message: `Character name can be maximum ${CHARACTER_MAX_LENGTH} characters`,
    }),
  // TODO: add specific validation for character place
  characterFrom: z
    .string()
    .min(CHARACTER_MIN_LENGTH, {
      message: `From must be at least ${CHARACTER_MIN_LENGTH} characters`,
    })
    .max(CHARACTER_MAX_LENGTH, {
      message: `From can be maximum ${CHARACTER_MAX_LENGTH} characters`,
    }),
  // TODO: add specific validation for character place
  characterMindSet: z
    .string()
    .min(CONTEXT_MIN_LENGTH, {
      message: `Mindset must be at least ${CHARACTER_MIN_LENGTH} characters`,
    })
    .max(CONTEXT_MAX_LENGTH, {
      message: `Mindset can be maximum ${CHARACTER_MAX_LENGTH} characters`,
    }),
  setting: z
    .string()
    .min(CONTEXT_MIN_LENGTH, {
      message: `Setting must be at least ${CONTEXT_MIN_LENGTH} characters`,
    })
    .max(CONTEXT_MAX_LENGTH, {
      message: `Setting can be maximum ${CONTEXT_MAX_LENGTH} characters`,
    }),
});

export type ChatContext = z.infer<typeof chatContext>;

const NewChat: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ChatContext>({
    mode: "onTouched",
    resolver: zodResolver(chatContext),
  });
  const router = useRouter();

  const { init: initChat, clearState } = useChatStore((state) => state);

  const onSubmit = handleSubmit((data) => {
    initChat(data);
    void router.push("/chat");
  });

  useEffect(() => {
    clearState();
  }, [clearState]);

  return (
    <>
      <h1 className="mb-4 text-4xl font-bold">New Chat</h1>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
        <div className="w-full">
          <div className="flex items-start gap-x-2">
            {/* TODO: add auto focus */}
            <input
              type="text"
              placeholder="Character Name"
              className="peer input-primary input w-2/3"
              {...register("characterName")}
            />
            <p className="invisible w-1/3 text-xs peer-focus:visible">
              <span className="font-semibold">Character Name</span>
              <br />
              The character you want the AI to inpersonate
            </p>
          </div>
          {errors.characterName && (
            <p className="text-xs text-error">{errors.characterName.message}</p>
          )}
        </div>
        <div className="w-full">
          <div className="flex items-start gap-x-2">
            <input
              type="text"
              placeholder="From? (i.e: Book, Movie, TV Show)"
              className="peer input-primary input w-2/3"
              {...register("characterFrom")}
            />
            <p className="invisible w-1/3 text-xs peer-focus:visible">
              <span className="font-semibold">Character From</span>
              <br />
              Where does the character come from?
            </p>
          </div>
          {errors.characterFrom && (
            <p className="text-xs text-error">{errors.characterFrom.message}</p>
          )}
        </div>
        <div className="w-full">
          <div className="flex items-start gap-x-2">
            <textarea
              placeholder="Mindset"
              className="peer input-primary input w-2/3"
              {...register("characterMindSet")}
            />
            <p className="invisible w-1/3 text-xs peer-focus:visible">
              <span className="font-semibold">Character Mindset</span>
              <br />
              What is the character&apos;s mindset?
            </p>
          </div>
          {errors.characterMindSet && (
            <p className="text-xs text-error">
              {errors.characterMindSet.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <div className="flex items-start gap-x-2">
            <textarea
              placeholder="Setting"
              className="peer textarea-primary textarea textarea-lg w-2/3"
              {...register("setting")}
            />
            <p className="invisible w-1/3 text-xs peer-focus:visible">
              <span className="font-semibold">Context</span>
              <br />
              Explain the situation and context of the conversation
            </p>
          </div>
          {errors.setting && (
            <p className="text-xs text-error">{errors.setting.message}</p>
          )}
        </div>
        <button
          disabled={!isValid}
          type="submit"
          className="btn-primary btn w-2/3"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default NewChat;
