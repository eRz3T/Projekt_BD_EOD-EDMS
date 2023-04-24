export interface IDocument {
  id: number
  name: string
  receiveDate: Date
  expiryDate: Date
  createdBy: string
}

export const documents: IDocument[] = [
  {
    id: 1,
    name: 'Wniosek o przyznanie dofinansowania',
    receiveDate: new Date('2023/02/12'),
    expiryDate: new Date('2023/02/24'),
    createdBy: 'Jan Kowalski',
  },
  {
    id: 2,
    name: 'Projekt budowy nowej szkoły podstawowej',
    receiveDate: new Date('2023/03/01'),
    expiryDate: new Date('2023/03/15'),
    createdBy: 'Anna Nowak',
  },
  {
    id: 3,
    name: 'Wniosek o dofinansowanie zakupu sprzętu medycznego',
    receiveDate: new Date('2023/04/02'),
    expiryDate: new Date('2023/04/30'),
    createdBy: 'Tomasz Kowalczyk',
  },
  {
    id: 4,
    name: 'Zgłoszenie projektu badawczego w dziedzinie nowych technologii',
    receiveDate: new Date('2023/05/10'),
    expiryDate: new Date('2023/06/10'),
    createdBy: 'Karolina Nowacka',
  },
]
