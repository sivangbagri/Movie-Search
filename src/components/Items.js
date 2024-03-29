import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
export default function Items(props) {
  const [imgFound, setImgFound] = useState(true);

  const imageError = () => {
    setImgFound(false);
  };
  return (
    <>
      <div className="p-5 flex justify-center mb-2">
        <div className="bg-[#292524] border-b-2 border-[#292524] hover:border-[#c2410c] w-40 h-auto rounded-sm  shadow-lg text-white flex-col cursor-pointer ">
          <div className="flex justify-center">
            {imgFound && (
              <img
                className="w-40 h-auto mb-2"
                onError={imageError}
                src={props.image}
              />
            )}
            {!imgFound && (
              <img
                className="w-40 h-auto mb-2"
                onError={imageError}
                src="https://www.reelviews.net/resources/img/default_poster.jpg"
              />
            )}
          </div>
          <div className="flex justify-center">
            <StarIcon style={{ color: "#facc15" }} />
            {props.rating}
          </div>
          <div className="flex justify-center text-md font-semibold">
            {props.title}
          </div>
          <div className="flex justify-center py-2 hover:bg-slate-900">
            {props.genre?.map((element) => {
              return (
              <p className="bg-slate-600 rounded-sm px-2 mx-2 items-center text-sm font-semibold ">
                {element}
              </p>
              )
            })}
            {/* <p>2</p>
            <p>3</p> */}
          </div>
        </div>
      </div>
    </>
  );
}
