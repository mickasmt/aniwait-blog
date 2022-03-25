import { Link } from "remix";
import { convertToSlug } from "~/utils/functions";

type NewsCardType = {
  id: string;
  title: string;
  img_url: string;
  category?: {
    id: string;
    name: string;
  }
}

function NewsCard({data}: {data: NewsCardType}) {
  return (
    <Link to={`/posts/${convertToSlug(data.title)}`}>
      <img
        className="aspect-[16/9] sm:aspect-[16/8] md:aspect-[16/10] w-full object-cover rounded overflow-hidden"
        src={data.img_url}
        alt={data.title}
      />
      <p className="text-[15px] md:text-base font-bold text-neutral-900 dark:text-white dark:font-medium pt-1">
        {data.title}
      </p>
    </Link>
  )
}

export { NewsCard }

{/* <div class="relative flex items-start  md:flex-col" :class="row ? 'flex-row' : 'flex-col sm:flex-row'">
  <div class="flex flex-col order-1 w-full sm:ml-6 md:ml-0" :class="row ? 'ml-3' : ''">
      <div class="flex align-baseline items-center text-sm w-full text-gray-500 mb-0.5">
          <nuxt-link class="capitalize hover:text-blue-600" :to="`/news/category/${article.category}`">
            <span>{{ article.category }}</span></nuxt-link><span>&nbsp; — &nbsp;{{ $dayjs(article.createdAt).format('DD.MM.YYYY') }}</span>
      </div>
      <nuxt-link class="text-black hover:text-blue-600 dark:text-gray-100" :to="`/news/${article.slug}`">
          <h3 class="mb-1 line-clamp-2 md:text-lg md:leading-6">{{ article.title }}</h3>
      </nuxt-link>
      <div class="prose prose-sm text-gray-500 dark:prose-dark" :class="row ? 'hidden sm:flex' : ''">
          <p class="line-clamp-2" :class="row ? 'sm:line-clamp-3 md:line-clamp-2' : ''">{{ article.description }}</p>
      </div>
  </div>
  <nuxt-link class="md:mb-2.5 sm:max-w-[17rem] md:max-w-none" :to="`/news/${article.slug}`" :class="row ? 'w-28 mb-0 flex-shrink-0 sm:w-full' : 'w-full mb-3 sm:mb-0'"><img class="shadow-md rounded-xl w-full sm:h-44 md:h-52 object-cover" :src="article.img" :alt="article.alt" :class="row ? 'h-24' : 'h-56'" /></nuxt-link>
</div> */}