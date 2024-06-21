import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomSlider = ({ children }) => {
  // Settings for the slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Custom arrow component positioned at top left
  const CustomArrow = ({ className, style, onClick }) => (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        position: "absolute",
        top: "-30px", // adjust top position to lift the arrows up to your preference
        // left: "0",
        transform: "translate(0%, -200%)", // centers the arrow vertically
      }}
      onClick={onClick}
    />
  );

  return (
    <div className="relative">
      <Slider
        {...settings}
        nextArrow={<CustomArrow className="h-8 w-8" />}
        prevArrow={<CustomArrow className="h-8 w-8" />}
      >
        {children}
      </Slider>
    </div>
  );
};

export default CustomSlider;
