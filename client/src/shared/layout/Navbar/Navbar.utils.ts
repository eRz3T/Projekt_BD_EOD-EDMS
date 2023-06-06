// Navigation top-bar items

export interface INavItem {
  id: number
  title: string
  destinationRoute: string
}

export const navItems: INavItem[] = [
  {
    id: 1,
    title: 'Kokpit',
    destinationRoute: '/dashboard',
  },
  {
    id: 2,
    title: 'Zadania',
    destinationRoute: '/tasks',
  },
]
