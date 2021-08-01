import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, Fragment } from "react";
import Button from "../../../../components/Button/Button";

import { Props } from "./ImagesList.interface";

const ImagesList: FC<Props> = ({ pictures, setPictures }): React.ReactElement => {
  const handleDeletePicture = (index: number) => {
    const newPictures = [...pictures];
    newPictures.splice(index, 1);
    setPictures(newPictures);
  };

  return (
    <div className="chatroom__images">
      {pictures.map((picture: object, index: number) => (
        <Fragment key={index}>
          <img
            className="chatroom__image"
            src={window.URL.createObjectURL(picture)}
            height="150"
            width="150"
          />
          <Button onClick={() => handleDeletePicture(index)}>
            <FontAwesomeIcon className="icon icon_brown" icon={faTimes} />
          </Button>
        </Fragment>
      ))}
    </div>
  );
};

export default ImagesList;
