export interface Car {
    _id: string;
    name: string;
    price: number;
    km: number;
    description: string;
    category: 'Nuevo' | 'Km0' | 'Segunda Mano';
    image: string;
    idUser: string;
    state: 'Comprado' | 'En Venta';
}

export type CarRequest = Omit<Car, '_id' | 'state'>;