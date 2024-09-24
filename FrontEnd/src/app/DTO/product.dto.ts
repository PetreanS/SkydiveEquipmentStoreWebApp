export interface ProductDTO{
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl?: string;
    category:string;
    colors?: ColorDto[];
    sizes: SizeDto[];
    color?: string | null;
    size?: string; 
}

export interface ColorDto {
    id: number;
    value: string;
}

export interface SizeDto {
    id: number;
    value: string;
}

