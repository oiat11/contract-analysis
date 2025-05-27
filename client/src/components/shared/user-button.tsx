"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import Link from "next/link";
import { Icons } from "./icons";
import { logout } from "@/lib/api";
import { useRouter } from "next/navigation";

function googleSignIn(): Promise<void> {
  return new Promise((resolve) => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
    resolve();
  });
}

export function UserButton() {
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };
  const { user } = useCurrentUser();

  return (
    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
      {user ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 p-0 rounded-full">
                <Avatar className="size-8">
                  <AvatarImage src={user?.profilePicture || ""}></AvatarImage>
                  <AvatarFallback>
                    {user?.displayName?.charAt(0) || ""}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem className="flex flex-col items-start">
                <div className="text-sm font-medium">{user?.displayName}</div>
                <div className="text-sm font-medium">{user?.email}</div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard">
                  <div className="flex items-center">
                    <Icons.dashboard className="mr-2 size-4" />
                    <span>Dashboard</span>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">
                  <div className="flex items-center">
                    <Icons.settings className="mr-2 size-4" />
                    <span>Settings</span>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <div className="flex items-center">
                  <Icons.logout className="mr-2 size-4" />
                  <span>Logout</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          <Button onClick={googleSignIn}>Sign in</Button>
        </>
      )}
    </div>
  );
}
