"use client";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function UserMenu() {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  if (!user) return null;

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="ghost" size="icon">
            <Avatar>
              <AvatarImage
                src={user.image ?? ""}
                alt={user.name ?? "Profile"}
              />
              <AvatarFallback>{user.name?.[0] ?? "U"}</AvatarFallback>
              <AvatarBadge className="bg-green-600 dark:bg-green-800" />
            </Avatar>
          </Button>
        }
      />
      <PopoverContent align="end">
        <p className="font-medium">{user.name}</p>
        <p className="text-muted-foreground text-xs">{user.email}</p>
        <Button
          onClick={handleSignOut}
          variant="destructive"
          size="sm"
        >
          Sign Out
        </Button>
      </PopoverContent>
    </Popover>
  );
}
