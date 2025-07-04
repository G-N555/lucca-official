'use client';

import * as React from 'react';
import { Martini, Moon, Sun, Waves } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/Dropdown-menu';

export function ThemeSwitcher({ setTheme: onTheme }: { setTheme: (theme: string) => void }) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 transition-all dark:scale-0 lime:scale-0 deepblue:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 transition-all dark:scale-100 lime:scale-0 deepblue:scale-0" />
          <Martini className="absolute h-[1.2rem] w-[1.2rem] scale-0 transition-all lime:scale-100 dark:scale-0 deepblue:scale-0" />
          <Waves className="absolute h-[1.2rem] w-[1.2rem] scale-0 transition-all deepblue:scale-100 lime:scale-0 dark:scale-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            setTheme('light');
            onTheme('light');
          }}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme('dark');
            onTheme('dark');
          }}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme('lime');
            onTheme('lime');
          }}
        >
          Lime
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme('deepblue');
            onTheme('deepblue');
          }}
        >
          Deep blue
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme('system');
            onTheme('system');
          }}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
