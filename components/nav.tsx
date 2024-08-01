import { ThemeToggle } from "@/components/theme-toggle";
import { ModelIcon } from "@/components/icons/model-icon";
import Link from "next/link";
import { Space_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SquareUserRound, UserRound , CircleUserRound } from 'lucide-react'; // Import the square-user-round icon


const spaceMono = Space_Mono({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

export function Nav() {
  return (
    <div className="h-14 py-2 px-2 md:px-8 border-b flex items-center">
      <div className="flex flex-1 items-center">
        <Link href="/">
          <h1 className={cn("font-light text-xl", spaceMono.className)}>
          <span className="text-white-700 ml-2 text-sm">
              Adham Image Generator ⚡️
            </span>
          </h1>
        </Link>
      </div>
      <div className="flex flex-none items-center space-x-4">
      <Drawer>
          <DrawerTrigger>
            <Button variant="ghost">
              <CircleUserRound className="text-sm"/>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Social Media Links</DrawerTitle>
              <DrawerDescription>
                Navigate to my social media profiles:
              </DrawerDescription>
            </DrawerHeader>
            <div className="drawer-body" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', padding: '16px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Link href="https://github.com/Adhamhossam000" passHref>
                  <Button style={{ width: '200px' }}>GitHub</Button>
                </Link>
                <Link href="https://instagram.com/adhamhossam18" passHref>
                  <Button style={{ width: '200px' }}>Instagram</Button>
                </Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Link href="https://www.linkedin.com/in/adham-hossam-72b3422b7/" passHref>
                  <Button style={{ width: '200px' }}>LinkedIn</Button>
                </Link>
                <Link href="https://x.com/AdhamHo62349992" passHref>
                  <Button style={{ width: '200px' }}>X (Twitter)</Button>
                </Link>
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        
      </div>
    </div>
  );
}
