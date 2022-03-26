import { Link } from "remix";
import { convertToSlug } from "~/utils/functions";
import { format } from "date-fns";

type NewsCardType = {
  id: string;
  title: string;
  img_url: string;
  createdAt: Date;
  category: {
    id: string;
    name: string;
  }
}

function NewsCard({ data }: { data: NewsCardType }) {
  return (
    <div>
      <Link to={`/posts/${convertToSlug(data.title)}`}>
        <img
          className="aspect-[16/9] sm:aspect-[16/8] md:aspect-[16/10] w-full object-cover rounded overflow-hidden"
          src={data.img_url}
          alt={data.title}
        />
      </Link>

      <Link to={`/posts/${convertToSlug(data.title)}`}>
        <h3 className="text-[15px] md:text-base font-bold text-neutral-900 dark:text-white dark:font-medium line-clamp-2 pt-1">
          {data.title}
        </h3>
      </Link>

      <div className="flex align-baseline items-center text-sm w-full text-gray-500 dark:text-gray-400 mt-1">
        <Link
          to={`/news/${convertToSlug(data.category.name)}`}
          className="capitalize hover:text-blue-600"
        >
          <span>{data.category.name}</span>
        </Link>
        <span>&nbsp; — &nbsp;{format(new Date(data.createdAt), 'dd.MM.yyyy')}</span>
      </div>
    </div>
  )
}

export { NewsCard }
