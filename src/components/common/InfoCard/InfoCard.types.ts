export interface InfoCardProps {
  data?:
    | {
        id: string;
        osNumber: string;
        status: string;
        relatedBy: string;
        category: string;
        subCategory: string;
        description: string;
        location: { lat: number; lng: number };
        address: string;
        routeDistance: string;
        team: { id: string; name: string };
        relatedAt: string;
        updatedAt: string;
        images: string[];
      }
    | undefined;
}
