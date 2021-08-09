import { FC } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";

import { requestActions } from "../../../../redux/actionCreators/dialogs";
import useFilterDialogs, { ChatroomType } from "../../../../Hooks/useFilterDialogs";
import Button from "../../../../components/Button/Button";
import Dialog from "../../../../components/Dialog/Dialog";
import Stars from "../../../../components/Stars/Stars";

import { Props } from "./Saved.interface";

const Saved: FC<Props> = ({ dialogs, user: { uid } }): React.ReactElement => {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  //* -------------------------------------------------------
  //* Handle of delete
  const handleDelete = async (event: MouseEvent): Promise<void> => {
    const target: HTMLElement = event.target as HTMLElement;
    const chatId: string = target.dataset.id as string;
    const body = {
      saved: "nosaved",
    };

    dispatch(requestActions({ chatId, body }));
  };

  //* -------------------------------------------------------
  //* We create filter
  const status: string = "saved";
  const result: ChatroomType[] = useFilterDialogs({ dialogs, status, uid });

  //* -------------------------------------------------------
  //* Content
  const CONTENT: React.ReactNode = result.map(([key, value]: ChatroomType, index: number) => (
    <Dialog key={index} {...value}>
      <Stars score={value.score} />
      <Link className="button-action" to={url + "/" + key}>
        proceed
      </Link>
      <Button className="button-action" onClick={handleDelete} data-id={key}>
        delete
      </Button>
    </Dialog>
  ));

  return (
    <>
      {CONTENT}
    </>
  );
};

export default Saved;
