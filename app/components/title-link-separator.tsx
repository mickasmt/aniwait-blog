import { Link } from "remix";

interface TitleLinkProps {
  title: string;
  link?: string;
}

export default function TitleLinkSeparator({ title, link }: TitleLinkProps) {
  return (
    // md:text-[22px]
    <div className="f-container flex flex-row py-3 items-center justify-between">
      <h3 className="capitalize text-[22px] font-semibold md:text-2xl md:tracking-wider"> 
        {title}
      </h3>

      {link ? (
        <Link to={link} className="text-sm text-gray-900 md:text-base dark:text-gray-100 hover:underline">
          Voir plus
        </Link>
      ) : (
        <span>&nbsp;</span>
      )}
    </div>
  );
}