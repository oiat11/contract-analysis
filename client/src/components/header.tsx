"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { cn } from "@/lib/utils"; 
import { Button } from './ui/button';

const navItems: { name: string; href: string }[] = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Pricing", href: "/pricing" },
  { name: "Privacy Policy", href: "/privacy" },
];

function Header() { 
    const pathname = usePathname();

    const user = true; // Replace with actual user authentication logic
    
    return (
        <header className='sticky px-4 top-0 z-50 w-full border-b bg-background/95 backdrop-blur'>
            <div className='container flex h-16 items-center'>
                <div className='mr-4 hidden md:flex'>
                    <Link href={"/"} className='mr-6 flex items-center space-x-2'>
                        LOGO 
                    </Link>
                    <nav className='flex items-center space-x-7 text-sm font-medium'>
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "transition-colors hover:text-foreground/80", 
                                    pathname === item.href 
                                        ? 'text-foreground/80'  
                                        : 'text-foreground/40'  
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
                    <div className='w-full flex-1 md:w-auto md:flex-none space-x-2 hidden md:flex'>
                        <Button>Get Started</Button>

                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header; // 导出时也使用 PascalCases