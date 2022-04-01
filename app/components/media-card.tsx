import { Media } from "~/utils/types";

function MediaCard({media}: {media: Media}) {
  return (
    <div className="w-[144px] h-auto">
      <img
        className="aspect-[1/4] w-full max-h-[236px] shadow object-cover object-center rounded overflow-hidden" 
        src={media.coverImage.extraLarge}
        alt={media.title.userPreferred}
        loading="lazy"
      />
      <p className="text-sm text-bold line-clamp-1 pt-1.5">
        {media.title.userPreferred}
      </p>
    </div>
  )
}

export { MediaCard }