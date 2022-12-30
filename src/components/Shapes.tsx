import Image from "next/image";
import cry from "@images/cry.svg";
import fivePointStar from "@images/5-point-star.svg";
import fourPointStar from "@images/4-point-star.svg";
import hourGlass from "@images/hourGlass.svg";
import sixPointStar from "@images/6-point-star.svg";
import tongue from "@images/tongue.svg";

const Shapes = () => {
  return (
    <div className="shapes">
      <Image
        src={fourPointStar}
        alt="four point star"
        width={100}
        height={100}
      />
      <Image
        src={fivePointStar}
        alt="five point star"
        width={100}
        height={100}
      />
      <Image
        src={sixPointStar}
        alt="six point star"
        width={100}
        height={100}
      />
      <Image
        src={tongue}
        alt="emoji with tongue out"
        width={100}
        height={100}
      />
      <Image
        src={cry}
        alt="cry face emoji"
        width={100}
        height={100}
      />
      <Image
        src={hourGlass}
        alt="abstract hourglass shape"
        width={100}
        height={100}
      />
    </div>
  );
};

export default Shapes;
