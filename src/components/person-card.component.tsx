import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PersonNode } from "@/interfaces";
import { Earth } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

type Props = Pick<NonNullable<PersonNode>, "id" | "name" | "gender"> & {
  homeworld?: { name: string };
};
export function PersonCard({ id, name, gender, homeworld }: Props) {
  return (
    <div className="flex items-center">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center space-x-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage
              className="object-cover"
              src={`/avatars/${id}.webp`}
              alt="Avatar"
            />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-base font-medium leading-none flex items-center">
              {name}
              <span className="bg-orange-300 p-1 ml-2 rounded-md text-xs text-orange-900">
                {id}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">{gender}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="ml-auto font-medium text-sm flex items-center">
            <Earth className="w-4 h-4 mr-2" />
            {homeworld?.name}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function PersonCardSkeleton() {
  return (
    <>
      <div className="flex items-center">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full">
          <div className="space-y-1.5 p-6 flex flex-row items-center space-x-4">
            <Skeleton className="h-9 w-9  rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-[24px] w-[240px]" />
              <Skeleton className="h-4 w-[90px]" />
            </div>
          </div>
          <div className="p-6 pt-0">
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>
    </>
  );
}
