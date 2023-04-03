import { useEffect, useMemo, useRef, useState } from "react";

const TypingText = ({ text }: { text: string }) => {
  const [output, setOutput] = useState("");
  const lastIndex = useRef(0);
  const parsedText = useMemo(() => text.replaceAll("\n", "<br/>"), [text]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastIndex.current < parsedText.length) {
        const char =
          parsedText[lastIndex.current] === "\n"
            ? "<br />"
            : parsedText[lastIndex.current] ?? "";
        setOutput((prevText) => prevText + char);
        lastIndex.current++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => {
      clearInterval(interval);
    };
  }, [parsedText]);

  return <div dangerouslySetInnerHTML={{ __html: output }} />;
};

export default TypingText;
