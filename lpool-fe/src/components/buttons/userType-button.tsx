"use client";

import Link from "next/link";

export function UserTypeButton(props: any) {

  const name = props.name;

  const marginRight = name === "Investor" ? "margin-right" : "";
  let href = name === "Investor" ? "/dashboard/investor" : "/dashboard/creator";

  return (
    <Link href={href} className="userTypeButton marginRight">{name}</Link>
  );
}
