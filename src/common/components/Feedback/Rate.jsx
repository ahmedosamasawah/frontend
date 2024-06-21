import StarIcon from "./StarIcon";

const Rate = ({ rating }) => {
  // Don't forget Handle half star logic

  const starIcons = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      starIcons.push(<StarIcon fill={"#E4AC66"} />);
    } else {
      starIcons.push(<StarIcon fill={"#E6E6E7"} />);
    }
  }
  return <div className="flex items-center gap-1">{starIcons}</div>;
};

export default Rate;
