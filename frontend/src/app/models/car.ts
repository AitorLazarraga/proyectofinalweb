export interface Car {
    id: string,
    name: string,
    price: number,
    km: number,
    description: string,
    category: string,
    image: string,
    idUser: string,
    state: 'Comprado' | 'Disponible'
}
