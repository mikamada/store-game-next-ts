import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import cx from "classnames"

interface MenuItemProps {
  title: string;
  icon: "ic-menu-overview" | "ic-menu-transaction" | "ic-menu-message" | "ic-menu-card" | "ic-menu-rewards" | "ic-menu-setting" | "ic-menu-logout";
  active?: boolean;
  href?: string,
  onClick?: () => void
}

export default function MenuItem(props: Partial<MenuItemProps>) {
  const { title, icon, active, href, onClick } = props;
  const classItem = cx({
    item: true,
    'mb-30': true,
    active
  })

  return (
    <div className={classItem}>
      <div className="me-3">
        <Image src={`/assets/icon/${icon}.svg`} width={25} height={25} alt='' />
      </div>
      <p className="item-title m-0">
        {onClick ? (
          <button className='border-0 bg-transparent py-0 px-0' onClick={onClick}>
            <a className="text-lg text-decoration-none" >{title}</a>
          </button>
        ) : <Link
          href={`${href}`}
          className="text-lg text-decoration-none">
          {title}
        </Link>
        }

      </p>
    </div>
  )
}
