export const formatOutput = (output: string) => {
  const brString = output.replaceAll("\n", "<br/>");
  // const brString = output;

  // const regex = /\*(.*?)\*/g;
  // const parts = output.split(regex);

  const regex = /\*(.*?)\*/g;
  let match;
  let lastIndex = 0;
  let outputString = "";
  while ((match = regex.exec(brString)) !== null) {
    outputString += `${brString.slice(lastIndex, match.index)}`;
    outputString += `<span><b>${match[1] ?? ""}</b></span>`;
    lastIndex = regex.lastIndex;
  }
  outputString += `${brString.slice(lastIndex)}`;

  console.log(outputString);
  return outputString;
};
