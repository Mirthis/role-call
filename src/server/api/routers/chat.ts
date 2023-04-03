import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Configuration, OpenAIApi } from "openai";
import { type Message } from "~/types/types";
import { env } from "~/env.mjs";
import { TRPCError } from "@trpc/server";

const configuration: Configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const chatRouter = createTRPCRouter({
  interact: publicProcedure
    .input(
      z.object({
        messages: z.array(
          z.object({
            role: z.enum(["user", "assistant", "system"]),
            content: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      console.log({ input });
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: input.messages,
      });
      console.log({ response });
      const finishReason = response.data.choices[0]?.finish_reason;
      if (finishReason !== "lenght") {
        // TODO: handle other finish reasons
        // remove last message from inputs
        // ask API to summarize the remaining messages
        // create a new system message with the original system message plus summary
        // add the new system message to the inputs
        // add last user message to the inputs
        // ask API to generate a response
        // return the response
      }

      const responseText = response.data.choices[0]?.message?.content;
      console.log({ responseText });
      if (responseText) {
        const message: Omit<Message, "id"> = {
          content: responseText,
          role: "assistant",
        };
        return message;
      } else {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "OpenAI API returned no response",
        });
      }
    }),

  interactFake: publicProcedure
    .input(
      z.object({
        messages: z.array(
          z.object({
            role: z.enum(["user", "assistant", "system"]),
            content: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      await delay(3000);

      const message: Message = {
        id: 1,
        content: `Hello there
          *sending back your message*
          here it is
          ${input.messages[0]?.content ?? ""}
          I hope it's good
          *wave hand*
          bye bye`,
        role: "assistant",
      };
      return message;
    }),
});
