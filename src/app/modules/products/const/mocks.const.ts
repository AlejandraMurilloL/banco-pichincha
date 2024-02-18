import { Product } from "../models/products.models";

export const mockProducts: Product[] = [
    {
        id: '1234',
        name: 'Producto 1',
        description: 'Descripción producto 1',
        logo: '',
        date_release: new Date(),
        date_revision: new Date()
    },
    {
        id: '4321',
        name: 'Producto 2',
        description: 'Descripción producto 2',
        logo: '',
        date_release: new Date(),
        date_revision: new Date()
    },
];