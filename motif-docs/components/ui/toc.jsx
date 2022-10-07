import { useEffect, useState } from 'react'
import cn from 'classnames'
import { useHeadingsData } from '@lib/dom'
import { useIntersectionObserver } from '@lib/intersection-observer'
import { getClassNameOrStyle } from '@lib/toc-ui'
import { TOCProvider, useTOC } from '@lib/use-toc'
import { TOCThemeProvider, useTheme } from '@lib/use-toc-theme'
import { removeFileExtension } from '@lib/files'

export const WithIndentation = ({
  id = undefined,
  depth = undefined,
  isActive = undefined,
  theme = undefined,
  children = <></>,
}) => {
  let cs = {}
  if (depth > 0) {
    const item = isActive ? 'lineActive' : 'lineInactive'
    cs = getClassNameOrStyle(item, item, theme)
  }
  return (
    <div id={id} className="flex flex-row">
      {depth > 0 && <div className="w-4 flex-none" />}
      <div className={cn(`${cs.className} flex-grow`, { 'pl-2': depth > 0 })}>
        {children}
      </div>
    </div>
  )
}

export const Item = ({
  id = undefined,
  title = undefined,
  href = undefined,
  className = undefined,
  style = undefined,
  depth = 0,
  children = <></>,
}) => {
  const { isParentToActive, activeId } = useTOC()
  const { theme, isAllExpanded } = useTheme()

  const isActive = activeId === id || isParentToActive(id)
  const isExpanded = isActive || isAllExpanded
  const shouldHighlight = activeId === id

  const baseItem = depth === 0 ? 'topItem' : 'item'
  const fallbackBaseItem = 'item'

  let cs = getClassNameOrStyle(
    baseItem,
    fallbackBaseItem,
    theme,
    cn('block', className, {
      'cursor-pointer': href,
    }),
    style
  )

  cs = getClassNameOrStyle(
    baseItem + (shouldHighlight ? 'Active' : 'Inactive'),
    fallbackBaseItem + (shouldHighlight ? 'Active' : 'Inactive'),
    theme,
    cs.className,
    cs.style
  )

  return (
    <WithIndentation
      id={`toc-link-${href}`}
      depth={depth}
      isActive={shouldHighlight}
      theme={theme}
    >
      <div className="flex flex-col">
        {title && (
          <a className={cs.className} style={cs.style} href={href}>
            {title}
          </a>
        )}
        {isExpanded && children}
      </div>
    </WithIndentation>
  )
}

export const TreeItem = ({
  key = undefined,
  item = undefined,
  depth = undefined,
}) => {
  const title = removeFileExtension(item.title)
  if (item.items?.length > 0) {
    return (
      <Item id={item.id} title={title} href={item.href} depth={depth || 0}>
        {item.items.map((childItem) => {
          return (
            <TreeItem
              key={`${key}-${childItem.id}`}
              item={childItem}
              depth={(depth || 0) + 1}
            />
          )
        })}
      </Item>
    )
  } else {
    return (
      <Item id={item.id} title={title} href={item.href} depth={depth || 0} />
    )
  }
}

export const Tree = ({
  entries = [],
  theme = undefined,
  expandAll = false,
  activeId = undefined,
}) => {
  return (
    <>
      <TOCThemeProvider theme={theme} isAllExpanded={expandAll}>
        <TOCProvider entries={entries} activeId={activeId}>
          <div className="flex flex-col gap-1">
            {entries?.map((entry) => {
              return <TreeItem key={entry.id} item={entry} />
            })}
          </div>
        </TOCProvider>
      </TOCThemeProvider>
    </>
  )
}

export const TOC = ({ contentId, offset, theme, headings }) => {
  const [activeId, setActiveId] = useState()
  const { nestedHeadings } = useHeadingsData(contentId, headings)

  useIntersectionObserver(setActiveId, contentId, headings, offset)

  useEffect(() => {
    if (!activeId) {
      return
    }
    if (history.replaceState) {
      history.replaceState(null, null, `#${activeId}`)
    } else {
      location.hash = `#${activeId}`
    }
  }, [activeId])

  return <Tree entries={nestedHeadings} activeId={activeId} theme={theme} />
}
