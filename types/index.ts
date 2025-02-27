import { insertProductSchema, signUpFormSchema } from '@/lib/validator';
import { z } from 'zod';

export type Product = z.infer<typeof insertProductSchema> & {
    id: string;
    rating: string;
    createdAt: Date;
}


export type SignUpFormSchemaType = z.infer<typeof signUpFormSchema>;