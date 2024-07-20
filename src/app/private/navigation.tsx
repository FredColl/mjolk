import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

// ...

export default function NavLinks() {
  const links = [
    {
      name: "Report",
      href: "/private/report",
      icon: HomeIcon,
    },
    {
      name: "Summary",
      href: "/private/summary",
      icon: UserGroupIcon,
    },
    {
      name: "To be implemented",
      href: "/documents",
      icon: DocumentDuplicateIcon,
    },
  ];
  return (
    <>
      <div className="flex fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
          {links.map((link) => {
            const LinkIcon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                style={{ minWidth: "150px" }}
                className="text-black flex grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
              >
                <LinkIcon className="w-6" />
                <p className="hidden md:block text-black">{link.name}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
