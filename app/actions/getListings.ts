import prisma from '@/app/libs/prismadb';
import { start } from 'repl';

export interface IlistingsParams {
    userId?: string;
    guestsCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}
export default async function getListings(params: IlistingsParams) {
    try{
        const {
            userId,
            guestsCount,
            roomCount,
            bathroomCount,
            startDate,
            endDate,
            locationValue,
            category
        } = params;

        let query: any = {};

        if(userId) query.userId = userId;
        if(roomCount) query.roomCount= {
            gte: +roomCount
        }
        if(bathroomCount) query.bathroomCount= {
            gte: +bathroomCount
        }

        if (category) query.category = category;

        if (guestsCount) query.guestsCount = {
            gte: +guestsCount
        }

        if (locationValue) query.locationValue = locationValue;

        if(startDate && endDate) query.NOT = {
            reservations: {
                some:{
                    OR: [
                    {
                        endDate: {gte: startDate},
                        startDate: {lte: endDate}
                    },
                    {
                        startDate: {lte: endDate},
                        endDate: {gte: endDate}
                    }
                        
                    ]
                }
            }
        }

        const listings =  await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeListing = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString()
        }))
        return safeListing;
    }catch(error: any){
        throw new Error(error);
    }

}