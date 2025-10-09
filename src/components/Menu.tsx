"use client"

import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/dashboard.png",
        label: "Dashboard",
        href: "/admin",
        visible: ["admin", "recruiter"],
      },
      {
        icon: "/calendar.png",
        label: "Calendar",
        href: "/list/calendar",
        visible: ["admin", "recruiter"],
      },
      {
        icon: "/jobs.png",
        label: "Jobs",
        href: "/list/jobs",
        visible: ["admin", "recruiter"],
      },
      {
        icon: "/candidates.png",
        label: "Candidates",
        href: "/list/candidates",
        visible: ["admin", "recruiter"],
      },
      {
        icon: "/referrals.png",
        label: "My Referrals",
        href: "/list/referrals",
        visible: ["admin", "recruiter"],
      },
    ],
  },
  {
    title: 'OFFICE',
    items: [
      {
        icon:"/candidates.png",
        label: "Employees",
        href: "/list/employees",
        visible: ["admin"]
      },
      {
        icon:"/calendar.png",
        label: "Attendance",
        href: "/list/attendance",
        visible: ["recruiter"]
      },
      {
        icon:"/money.png",
        label: "Expenses",
        href: "/list/expense",
        visible: ["admin"]
      },
      {
        icon:"/file-text.png",
        label: "Reports",
        href: "/list/reports",
        visible: ["admin","recruiter"]
      },
    ]
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "recruiter"],
      },
      {
        icon: "/settings.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "recruiter"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "recruiter"],
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className=''>
      <div className="mt-4 text-md">
        {menuItems.map((i) => (
          <div className="flex flex-col gap-2" key={i.title}>
            <span className="hidden lg:block text-sm text-gray-400 font-light my-4">
              {i.title}
            </span>
            {i.items.map((item) => {
              if (item.visible.includes(role)) {
                const isActive = usePathname().startsWith(item.href);
                return (
                  <Link
                    href={item.href}
                    key={item.label}
                    className={`flex items-center justify-center lg:justify-start gap-4 text-gray-600 font-semibold py-2 md:px-2 rounded-md ${isActive ? 'text-white bg-brand-600 ' : 'hover:text-gray-800 hover:bg-blueLight-100'}`}
                  >
                    <Image src={item.icon} alt="" width={20} height={20} className={`${isActive ? 'invert brightness-0':''}`}/>
                    <span className="hidden lg:block">{item.label}</span>
                  </Link>
                );
              }
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Menu