import type { SidebarSection } from "@lib/types";

interface PageLink {
  title: string;
  slug: string;
}

export const getSidebarId = (activePath: string) => {
  const slugComponents = activePath?.split("/");
  return slugComponents?.length > 1 ? slugComponents[1] : "guides" + activePath;
};

const normalizePath = (path: string) => {
  return path.toLowerCase().replace(/\s+/g, "-");
};

export const getSection = (
  sections: SidebarSection[],
  path: string
): SidebarSection | undefined => {
  const basePath = path.replace(/^\//, "").split("/")[1];
  return sections.find((section) => {
    return section.title && normalizePath(section.title) === basePath;
  });
};

export const getSectionTitle = (
  sections: SidebarSection[],
  path: string
): string | undefined => {
  return getSection(sections, path)?.title;
};

export const getPrevNext = (
  sections: SidebarSection[],
  path: string,
  basePath: string
): { prev: PageLink | undefined; next: PageLink | undefined } => {
  let s = 0,
    p = 0;
  let prev = undefined,
    next = undefined;
  search:
  for (const section of sections) {
    p = null;
    if (section.href === path) {
      break search;
    }
    p = 0;
    for (const page of section.pages) {
      if (page.href === path) {
        break search;
      }
      p++;
    }
    s++;
  }

  // If we go through all our sections without a match then we're on
  // a parent for which the section is an index
  // (e.g. /docs/guides for /docs/guides/getting-started)
  if (s === sections.length) {
    // Treat our "next" link as the section index itself.
    s = 0;
    p = null;
  }

  if (p > 0) {
    prev = sections[s].pages[p-1];
  // if the section index has a page, go back there.
  } else if (p === 0 && sections[s]?.href)  {
    prev = { title: sections[s].title, href: sections[s].href }
  } else if (s > 0) {
    const sectionLength = sections[s - 1]?.pages?.length || 0;
    if (sectionLength > 0) {
      prev = sections[s-1].pages[sectionLength - 1];
    }
  }

  const sectionLength = sections[s]?.pages?.length || 0;
  if (p === null) {
    next = sections[s].pages[0];
  } else if (p < sectionLength - 1) {
    next = sections[s].pages[p+1];
  } else if (s < sections.length - 1) {
    // If the section index has a page go there.
    if (sections[s + 1].href) {
      next = { title: sections[s + 1].title, href: sections[s + 1].href }
    } else {
      next = sections[s + 1].pages[0];
    }
  }

  return { prev, next };
};
