import { Link } from "remix";
import slugify from "slugify";
import { format } from "date-fns";
import { NewsNoDetailsType } from "~/utils/types";


function NewsCard({ data }: { data: NewsNoDetailsType }) {
  return (
    <div>
      <Link to={`/posts/${data.id}/${slugify(data.title)}`}>
        <img
          className="aspect-[16/9] sm:aspect-[16/8] md:aspect-[16/10] w-full object-cover rounded-md overflow-hidden"
          src={data.img_url}
          // src="https://adala-news.fr/wp-content/uploads/2021/08/Dolls-Frontline-1920x1370.png"
          alt={data.title}
        />
      </Link>

      <Link to={`/posts/${slugify(data.title)}`}>
        <h3 className="text-[15px] md:text-base font-bold dark:font-medium line-clamp-2 pt-1">
          {data.title}
        </h3>
      </Link>

      <div className="flex align-baseline items-center text-sm w-full text-gray-500 dark:text-gray-400 mt-1">
        <Link
          to={`/news/${slugify(data.category.name)}`}
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
