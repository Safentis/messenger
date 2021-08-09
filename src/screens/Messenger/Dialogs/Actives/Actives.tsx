import { FC, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";

import { requestActions } from "../../../../redux/actionCreators/dialogs";
import Dialog from "../../../../components/Dialog/Dialog";
import Button from "../../../../components/Button/Button";
import useFilterDialogs, { ChatroomType } from "../../../../Hooks/useFilterDialogs";

import { Props } from "./Actives.interface";

const Actives: FC<Props> = ({ dialogs, user: { uid } }) => {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  //* -------------------------------------------------------
  //* We created save functionality
  const handleSave = async (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const chatId = target.dataset.id as string;
    const body = {
      saved: "saved",
    };

    dispatch(requestActions({ chatId, body }));
  };

  //* -------------------------------------------------------
  //* We create filter
  const status: string = "active";
  const result: ChatroomType[] = useFilterDialogs({ dialogs, status, uid });

  //* -------------------------------------------------------
  //* Content
  const CONTENT: any = result.map(([key, value]: any, index: number) => (
    <Dialog key={index} {...value}>
      <Link className="button-action" to={url + "/" + key}>
        proceed
      </Link>
      <Button className="button-action" onClick={handleSave} data-id={key}>
        save
      </Button>
    </Dialog>
  ));

  return (
    <>
      {CONTENT}
    </>
  );
};

export default Actives;
