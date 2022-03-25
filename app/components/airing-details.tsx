import { format, fromUnixTime, formatDistanceToNowStrict, isPast } from 'date-fns'
import frLocale from 'date-fns/locale/fr'

interface AiringDetailsProps {
  airingAt: number;
  episode: number;
}

function AiringDetails({ airingAt, episode }: AiringDetailsProps) {
  return (
    <>
      <span className="flex font-medium text-gray-600 dark:text-gray-400 text-[13.5px] pt-0.5 pb-3">
        {isPast(fromUnixTime(airingAt))
          ? formatDistanceToNowStrict(fromUnixTime(airingAt), { locale: frLocale })
          : format(fromUnixTime(airingAt), "HH'h'mm")
        }&nbsp; • &nbsp;Ep. {episode}
      </span></>
  )
}

export { AiringDetails }