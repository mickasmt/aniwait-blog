// @ts-nocheck
import { Link } from "remix";
import { useState } from "react";
import Slider from "react-slick";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

import slugify from "slugify";
import { MediaCard } from "./media-card";
import { AiringDetails } from "./airing-details";
import { AiringSchedule } from "~/utils/types";

function AiringHorList({ data, title }: { data: AiringSchedule[], title: string }) {
  const [sliderRef, setSliderRef] = useState(null);
  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 600,
    swipeToSlide: true,
    slidesToShow: 7,
    slidesToScroll: 7,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1152,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        }
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 510,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  return (
    <div className="f-container mb-7">

      <div className="flex flex-row py-4 mt-10 justify-between items-center align-middle">
        <h3 className="text-bold text-2xl">
          {title}
        </h3>

        <div className="flex flex-row space-x-3 items-center text-gray-800 dark:text-gray-100">
          <button onClick={sliderRef?.slickPrev} className="hover:scale-125 ease-in-out duration-300">
            <RiArrowLeftSLine className="w-6 h-6" />
          </button>

          <button onClick={sliderRef?.slickNext} className="hover:scale-125 ease-in-out duration-300">
            <RiArrowRightSLine className="w-6 h-6" />
          </button>
        </div>
      </div>

      <Slider ref={setSliderRef} {...settings}>
        {data.map((item, index) => (
          <Link
            className="mr-4"
            key={index}
            to={`/animes/${item.media.id}/${slugify(item.media.title.userPreferred)}`}
            prefetch="intent"
          >
            <MediaCard media={item.media} />
            <AiringDetails airingAt={item.airingAt} episode={item.episode} />
          </Link>
        ))}
      </Slider>

    </div >
  )
}

export { AiringHorList }