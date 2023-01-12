export type SidebarContent = SidebarSection[];

export interface SidebarSection {
  title: string;
  href?: string;
  pages?: SidebarSection[];
}
