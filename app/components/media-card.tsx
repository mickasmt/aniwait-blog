import { Media } from "~/utils/types";

function MediaCard({media}: {media: Media}) {
  return (
    <div className="w-[144px] h-auto">
      <img
        className="aspect-[1/4] w-full max-h-[236px] shadow object-cover object-center rounded overflow-hidden" 
        src={media.coverImage.extraLarge}
        alt=""
      />
      <p className="text-sm font-semibold text-zinc-900 dark:text-white dark:font-medium line-clamp-1 pt-1">
        {media.title.userPreferred}
      </p>
    </div>
  )
}

export { MediaCard }