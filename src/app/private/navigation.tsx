"use client";

import {
  ChartBarSquareIcon,
  PencilSquareIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { Link as NextUILink } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    {
      name: "Report",
      href: "/private/report",
      icon: PencilSquareIcon,
    },
    {
      name: "Summary",
      href: "/private/summary",
      icon: ChartBarSquareIcon,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full bg-white shadow-lg">
      <div className="flex justify-center mx-auto py-2">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <NextUILink
              key={link.name}
              href={link.href}
              className={clsx(
                "flex flex-col items-center justify-center gap-1 px-4 py-2 text-sm font-medium transition-colors duration-200",
                {
                  "bg-blue-100 text-blue-600": pathname === link.href,
                  "text-gray-600": pathname !== link.href,
                }
              )}
              style={{
                textDecoration: "none",
                borderRadius: "8px",
                margin: "0 4px",
              }}
            >
              <LinkIcon className="w-6 h-6" />
              <p className="text-xs">{link.name}</p>
            </NextUILink>
          );
        })}
      </div>
    </div>
  );
}
