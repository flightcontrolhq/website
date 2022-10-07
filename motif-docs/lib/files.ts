export const removeFileExtension = (name: string) => {
  return name.replace(/.(md|mdx|mdoc)$/, "")
}
