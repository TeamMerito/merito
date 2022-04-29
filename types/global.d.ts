import { z } from "zod";

const UserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    picture: z.string()
});

const ServiceSchema = z.object({
    id: z.string(),
    type: z.string(),
    name: z.string(),
    description: z.string()
});

const RatingSchema = z.object({
    id: z.string(),
    userId: z.string(),
    serviceId: z.string(),
    stars: z.number() | z.null
});

const RatedServiceSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    ratings: z.array(
        z.object({
            id: z.string(),
            userId: z.string(),
            stars: z.number()
        })
    ),
    averageRating: z.number(),
    totalRatings: z.number()
});

declare global {
    type User = z.infer<typeof UserSchema>;
    type Service = z.infer<typeof ServiceSchema>;
    type Rating = z.infer<typeof RatingSchema>;
    type RatedService = z.infer<typeof RatedServiceSchema>;
}
