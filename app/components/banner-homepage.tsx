import { Link } from "remix"

function BannerHomepage() {

  return (
    <section>
      <div className="relative bg-slate-100 dark:bg-slate-900 overflow-hidden py-16">
        <div className="relative z-20 container m-auto px-6 md:px-12">
          <div className="m-auto text-center space-y-8 lg:w-10/12 xl:w-8/12">
            <h1 className="font-bold text-4xl leading-10">Découvrez le planning des animes sur Aniwait !</h1>


            <div className="pt-4 md:pt-10 flex justify-center space-x-6 font-semibold tracking-wide">
              <Link to="/planning" title="Browse blocks" className="block w-full h-12 sm:w-max py-3 px-6 rounded-xl bg-sky-400 hover:bg-sky-300 active:bg-sky-200 focus:bg-sky-300 transition">
                <span className="text-gray-900">
                  Voir le planning
                </span>
              </Link>
              {/* <a href="/contact" title="Get custom template" className="flex h-12 py-3 px-4 border border-sky-400 border-opacity-10 rounded-xl bg-gray-800 bg-opacity-40 hover:bg-opacity-80 active:bg-opacity-60 focus:bg-opacity-50 transition sm:px-6">
                <span className="hidden text-sky-400 sm:block">
                  Get a custom UI
                </span>
              </a> */}
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export { BannerHomepage }

