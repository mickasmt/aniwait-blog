import { Link } from "remix";
import { useState } from "react";
import Slider from "react-slick";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

import slugify from "slugify";
import { Media } from "~/utils/types";
import { MediaCard } from "./media-card";

function MediaHorList({ data, title }: { data: Media[], title: string }) {
  const [sliderRef, setSliderRef] = useState(null);
  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 900,
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
    <div className="f-container mb-9">

      <div className="flex flex-row py-4 mt-10 justify-between">
        <h3 className="text-[22px] font-bold md:text-2xl tracking-normal">
          {title}
        </h3>

        <div className="flex flex-row space-x-3 items-end text-gray-800 dark:text-gray-100">
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
            to={`/animes/${item.id}/${slugify(item.title.userPreferred)}`}
            prefetch="intent"
          >
            <MediaCard media={item} />
          </Link>
        ))}
      </Slider>

    </div >
  )
}

export { MediaHorList }