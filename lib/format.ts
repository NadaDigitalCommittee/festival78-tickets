export function format(content: string, ...args: Array<string|undefined>) {
  let result = content;
  for (let i = 0; i < args.length; i++) {
    result = result.replace(`{${i}}`, args[i]??"");
  }
  return result;
}
