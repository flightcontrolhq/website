export type SidebarContent = SidebarSection[];

export interface SidebarSection {
  title?: string;
  pages: (string | string[])[];
}
