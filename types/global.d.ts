// Add your types and interfaces here

declare interface User{
    id: string
    name: string
    email: string
    picture: string
}

declare interface Service{
    id: string
    type: string
    name: string
    description: string
}

declare interface Rating{
    id: string
    userId: string
    serviceId: string
    stars: number | null
}
