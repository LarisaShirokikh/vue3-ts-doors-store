import {Category} from './catalogType'

export type Product = {
id: number;
name: string;
category: Category[];
inStock: boolean;
construction: string;
sealingContours: string;
thicknessWeight: string;
weight: string;
insulation: string;
mainLock: string;
additionalLock: string;
exteriorFinish: string;
interiorFinish: string;
hinges: string;
doorProtection: string;
oldPrice: number;
newPrice: number;
isOnSale: boolean;
isNew: boolean;
description: string;
photo: string[];
createdAt: Date;
updatedAt: Date;
deletedAt: Date;
}
