import { Link } from "remix";
import slugify from "slugify";
import { format } from "date-fns";
import frLocale from 'date-fns/locale/fr'
import { NewsNoDetailsType } from "~/utils/types";


function NewsCard({ data }: { data: NewsNoDetailsType }) {
  return (
    <div>
      <Link to={`/posts/${data.id}/${slugify(data.title)}`}>
        <img
          className="aspect-[16/9] sm:aspect-[16/8] md:aspect-[16/10] w-full object-cover object-center rounded-md overflow-hidden"
          src={data.imgUrl}
          // src="https://adala-news.fr/wp-content/uploads/2021/08/Dolls-Frontline-1920x1370.png"
          alt={data.title}
          loading="lazy"
        />
      </Link>

      <Link to={`/posts/${data.id}/${slugify(data.title)}`}>
        <h3 className="line-clamp-2 pt-1">
          {data.title}
        </h3>
      </Link>

      <div className="flex align-middle items-center text-sm w-full text-gray-500 dark:text-gray-400 mt-1">
        <Link
          to={`/posts/${slugify(data.category.name)}`}
          className="capitalize hover:text-blue-600"
        >
          <span>{data.category.name}</span>
        </Link>
        <span>&nbsp; • &nbsp;{format(new Date(data.createdAt), 'dd MMM yyyy', { locale: frLocale })}</span>
      </div>
    </div>
  )
}

export { NewsCard }
