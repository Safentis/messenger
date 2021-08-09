import { FC } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

import Button from "../../../../components/Button/Button";
import Dialog from "../../../../components/Dialog/Dialog";
import Stars from "../../../../components/Stars/Stars";
import useFilterDialogs, { ChatroomType } from "../../../../Hooks/useFilterDialogs";
import { requestActions } from "../../../../redux/actionCreators/dialogs";

import { Props } from "./Complited.interface";

const Complited: FC<Props> = ({ dialogs, user: { uid } }) => {
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
  const status: string = "complited";
  const result: ChatroomType[] = useFilterDialogs({ dialogs, status, uid });

  //* -------------------------------------------------------
  //* Content
  const CONTENT: any = result.map(([key, value]: ChatroomType, index: number) => (
    <Dialog key={index} {...value}>
      <Stars score={value.score} />
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
      {/* <Namebar>
                <Search />
            </Namebar>
            <Content>
                {CONTENT}
            </Content> */}
      {CONTENT}
    </>
  );
};

export default Complited;
