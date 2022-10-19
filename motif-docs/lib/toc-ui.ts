export const defaultTheme: any = {
  heading: 'py-1 font-medium text-sm text-gray-900 dark:text-white',
  item: 'py-1 text-sm',
  itemActive: 'font-medium text-gray-900 dark:text-white',
  itemInactive: 'font-normal text-gray-500 dark:text-white/50',
  lineActive: '',
  lineInactive: '',
}

export const getThemeItem = (item: string, fallbackItem: string, theme: any): any => {
  if (theme) {
    if (item in theme) {
      return theme[item]
    } else if (fallbackItem in theme) {
      return theme[fallbackItem]
    }
  }
  if (item in defaultTheme) {
    return defaultTheme[item]
  } else {
    return defaultTheme[fallbackItem]
  }
}

export const getClassNameOrStyle = (
  item: string,
  fallbackItem: string,
  theme: any,
  className: string,
  style: any,
) => {
  const themeItem = getThemeItem(item, fallbackItem, theme)
  return {
    className: `${className} ${themeItem}`,
    style,
  }
}
