import logoPng from "../assets/logo.png";

import xPng from "../assets/x.png";
import gitPng from "../assets/git.png";
import dribPng from "../assets/drib.png";
import fbPng from "../assets/fb.png";

const Footer = () => {
  return (
    <div className="bg-base-300 flex flex-col justify-center  text-center py-5 md:gap-10 gap-5 md:px-10 px-2">
      <div className="flex justify-center items-center gap-2.5">
        <img src={logoPng} className="h-10 w-10" alt="" />
        <h2 className="font-bold text-xl">FinEase</h2>
      </div>
      <div>
        <ul className="flex md:flex-row flex-col justify-center md:gap-10 gap-2">
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
          <li>Security</li>
          <li>Contact details</li>
        </ul>
      </div>
      <div className="flex justify-center">
        <ul className="flex gap-2.5">
          <li className="w-10 h-10 bg-white rounded-full overflow-hidden p-0.5 cursor-pointer">
            <img src={fbPng} className="w-full h-full object-contain " alt="" />
          </li>
          <li className="w-10 h-10 bg-white rounded-full overflow-hidden p-0.5 cursor-pointer">
            <img
              src={dribPng}
              className="w-full h-full object-contain "
              alt=""
            />
          </li>
          <li className="w-10 h-10 bg-white rounded-full overflow-hidden p-0.5 cursor-pointer">
            <img src={xPng} className="w-full h-full object-contain " alt="" />
          </li>
          <li className="w-10 h-10 bg-white rounded-full overflow-hidden p-0.5 cursor-pointer">
            <img
              src={gitPng}
              className="w-full h-full object-contain "
              alt=""
            />
          </li>
        </ul>
      </div>
      <div className="flex justify-between">
        <div>English</div>

        <div>@2025 FinEase All right reserved.</div>
      </div>
    </div>
  );
};
export default Footer;
