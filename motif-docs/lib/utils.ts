// Get the name of the folder that contains the file at the given path
export const getSectionTitle = (path: string, fileTree: any): string | undefined => {
  if (!path || !fileTree) {
    return undefined
  }

  const folder = fileTree.folders?.find((folder: any) => {
    return !!folder.files.find((file: any) => file.path === path)
  })
  
  if (folder) {
    return folder.name
  } else if (fileTree.folders) {
    for (const subFolder of fileTree.folders) {
      const found = getSectionTitle(path, subFolder)
      if (found) {
        return found
      }
    }
  }
  
  return undefined
}
