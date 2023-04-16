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
  {
    id: 3,
    title: 'Dokumenty',
    destinationRoute: '/documents',
  },
  {
    id: 4,
    title: 'Kontakty',
    destinationRoute: '/contacts',
  },
  {
    id: 5,
    title: 'Admin',
    destinationRoute: '/admin',
  },
]
