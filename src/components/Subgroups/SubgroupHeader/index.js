import {PlusOutlined,DeleteOutlined} from "@ant-design/icons";
import { Button} from "antd";
import { useSelector } from "react-redux";

const SubgroupHeader=({onAdd, onRemove, cardId})=>{

     const cardState = useSelector((state) => state.teachersState[cardId]);
    const subgroups = cardState?.subgroups || [];

    return(
        <>
        <div className="subjectCard__header subgroups__header">
        <div>Занятие</div>
        <div>Часы</div>
        {subgroups.map((_, i) => (
          <div key={i} className="subgroup__header-cell">
            <span>Подгруппа {i + 1}</span>
            {i === 0 && subgroups.length < 2 && (
              <Button icon={<PlusOutlined />} onClick={onAdd} />
            )}
            {i === 1 && (
              <Button icon={<DeleteOutlined />} onClick={() => onRemove(i)} danger />
            )}
          </div>
        ))}
      </div>
        </>
    )
}

export default SubgroupHeader