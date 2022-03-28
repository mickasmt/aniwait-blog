import { Link } from "remix";
import slugify from "slugify";
import { format } from "date-fns";
import { NewsNoDetailsType } from "~/utils/types";

function TallCard({ data }: { data: NewsNoDetailsType }) {
  return (
    <div>

      <div className="relative overflow-hidden">

        <Link to={`/posts/${slugify(data.title)}`} >
          <img
            className="aspect-[9/16] w-60 h-96 object-cover rounded-xl shadow-lg"
            src={data.img_url}
            // src="https://adala-news.fr/wp-content/uploads/2021/08/Dolls-Frontline-1920x1370.png"
            alt={data.title}
          />
        </Link>

        <div className="absolute p-3 bottom-2 left-2 right-2 z-30 backdrop-blur-md bg-white dark:bg-gray-900/80 rounded-xl flex items-center">
          <h3 className="text-xl md:text-base font-semibold dark:font-medium line-clamp-2">
            {data.title}
          </h3>

        </div>
      </div>

      {/* <div className="flex align-baseline items-center text-sm w-full text-gray-500 dark:text-gray-400 mt-1">
        <Link
          to={`/news/${slugify(data.category.name)}`}
          className="capitalize hover:text-blue-600"
        >
          <span>{data.category.name}</span>
        </Link>
        <span>&nbsp; — &nbsp;{format(new Date(data.createdAt), 'dd.MM.yyyy')}</span>
      </div> */}
    </div>
  )
}

export { TallCard }
