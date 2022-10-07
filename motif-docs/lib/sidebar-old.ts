import type { SidebarSection } from "@lib/types";

interface PageLink {
  title: string;
  slug: string;
}

const normalizePath = (path: string) => {
  return path.toLowerCase().replace(/\s+/g, "-");
};

const getPagePathString = (titleInfo: string | string[]) => {
  if (typeof titleInfo === "string") {
    return titleInfo;
  } else if (titleInfo.length > 1) {
    return titleInfo[1];
  }
  return "";
};

const getPageTitleString = (titleInfo: string | string[]) => {
  if (typeof titleInfo === "string") {
    return titleInfo;
  } else if (titleInfo.length > 1) {
    return titleInfo[0];
  }
  return "";
};

export const makeSlug = (
  section: string | undefined,
  title: string | string[],
  basePath: string
) => {
  const path = getPagePathString(title);
  return normalizePath(
    `${basePath}/${section ? section + "/" : ""}${path}`
  ).replace(/\/$/, "");
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

export const getPageLink = (
  sections: SidebarSection[],
  sectionIndex: number,
  pageIndex: number,
  basePath: string
) => {
  const section = sections[sectionIndex];
  if (!section) {
    return undefined;
  }
  const page = section.pages[pageIndex];
  const pageTitle = getPageTitleString(page);
  return {
    title: pageTitle,
    slug: makeSlug(section.title, page, basePath),
  };
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
  let found = false;
  for (const section of sections) {
    p = 0;
    for (const page of section.pages) {
      if (makeSlug(section.title, page, basePath) === path) {
        found = true;
      }
      if (found) {
        break;
      }
      p++;
    }
    if (found) {
      break;
    }
    s++;
  }

  if (p > 0) {
    prev = getPageLink(sections, s, p - 1, basePath);
  } else if (s > 0) {
    const sectionLength = sections[s - 1]?.pages?.length || 0;
    if (sectionLength > 0) {
      prev = getPageLink(sections, s - 1, sectionLength - 1, basePath);
    }
  }

  const sectionLength = sections[s]?.pages?.length || 0;
  if (p < sectionLength - 1) {
    next = getPageLink(sections, s, p + 1, basePath);
  } else if (s < sections.length - 1) {
    next = getPageLink(sections, s + 1, 0, basePath);
  }

  return { prev, next };
};
