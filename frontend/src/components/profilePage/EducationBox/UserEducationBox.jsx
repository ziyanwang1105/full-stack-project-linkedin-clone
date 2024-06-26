import { useEffect, useState } from 'react';
import { educationsSelector, fetchEducations } from '../../../store/educationReducer';
import './UserEducationBox.css';
import { useDispatch, useSelector } from 'react-redux';
import EducationItem from './EducationItem';
import EducationModal from './EducationModal';

const UserEducationBox = ({sub, currentUser}) => {
    const dispatch = useDispatch()
    const educations = useSelector(educationsSelector)
    const [eduModalState, setEduModalState] = useState(null)
    const [education, setEducation] = useState({})
    useEffect(()=>{
        dispatch(fetchEducations(sub));
    },[sub]);
    const addButton = ()=>{
        if(currentUser.id === Number(sub)){
            return (
                <button className='add-education-button' onClick={e=> setEduModalState('Add')} />)
        }
    }
    return(
        <>
            <div className='education-profile'>
                <div className='education-bar'>
                    <h3>Education</h3>
                    {addButton()}
                </div>
                <ul className='education-list'>
                    {Object.values(educations).map((edu, idx)=> (<li key = {idx}>
                        <EducationItem education = {edu} setEduModalState= {setEduModalState} setEducation={setEducation} currentUser={currentUser} sub={sub} />
                    </li>))}

                </ul>
            </div>
            {eduModalState && <EducationModal eduModalState = {eduModalState} setEduModalState= {setEduModalState} userId ={currentUser.id} education={education} setEducation={setEducation} />}
        </>
    );
};

export default UserEducationBox;
