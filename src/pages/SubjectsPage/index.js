import { useDispatch, useSelector } from "react-redux"
import { fetchSubject } from "../../redux/slices/subjectThunk"
import SubjectsCard from "../../components/SubjectsCard"
import { useEffect } from "react"
import "./style.css"
import { fetchTeachers } from "../../redux/slices/teachersThunk"
import { saveThunk } from "../../redux/slices/saveThunk";
import { Button} from "antd";

const SubjectsPage=()=>{
    const dispatch = useDispatch()
    
        useEffect(()=>{
            dispatch(fetchSubject())
            dispatch(fetchTeachers())
        },[dispatch])
        const subjects = useSelector((state)=>state.subjects)

        if(!subjects.length){
            return <p>Загрузка данных...</p>
        }


       const handleSave = async () => {
    const resultAction = await dispatch(saveThunk());
    if (saveThunk.fulfilled.match(resultAction)) {
      alert("Данные успешно сохранены!");
    } else {
      alert("Ошибка при сохранении данных.");
    }
  };
    return(
        <div className="subjects-page">
        <div className="subjects">
        {subjects.map(subject=>(
            <SubjectsCard key={subject.uniqueId} subject={subject}/>
        ))}
        </div>
        <Button type="primary" onClick={handleSave}>
          Сохранить
        </Button>
        </div>
    )
}

export default SubjectsPage