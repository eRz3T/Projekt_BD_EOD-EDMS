export enum AdminPaths {
  WORKFLOWS = '/admin/workflows',
  USERS = '/admin/users',
  CASES = '/admin/cases',
  ARCHIVE = '/admin/archive',
  CATEGORIES = '/admin/categories',
}

export interface IAdminTileProps {
  title: string
  subtitle: string
  icon: string
  path: AdminPaths
}
