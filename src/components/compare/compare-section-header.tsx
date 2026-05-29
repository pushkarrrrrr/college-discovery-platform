"use client";

interface CompareSectionHeaderProps {
  label: string;
}

export function CompareSectionHeader({ label }: CompareSectionHeaderProps) {
  return (
    <tr className="border-b border-border/40 bg-accent/5">
      <th scope="colgroup" colSpan={4} className="p-3 text-[10px] uppercase font-bold tracking-wider text-muted-foreground pl-5 text-left">
        {label}
      </th>
    </tr>
  );
}
