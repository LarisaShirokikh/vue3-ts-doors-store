

export type Review = {
rating: number,
title: string,
briefReview: string,
photoUrl: string[],
user: User,
}

export type User = {
    email: string,
    isAdmin: boolean,
    isSuperAdmin: boolean,
    password: string,
    videos: Video[],
    reviews: Review[]
}

export type Video = {
filename: string,
photo: string[],
}