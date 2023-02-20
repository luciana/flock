import React, {useState, useRef} from 'react'
import { Modal } from 'react-bootstrap'
import { FaChartPie} from 'react-icons/fa';
import { LANGUAGES } from '../../Constants';
import Stats from './Stats';

function StatsDialog(question, locale) {
    const [showStatModal, setShowStatModal] = useState(false);
    const [statData, setStatData] = useState([]);
    const initModal = (data) => {
      setStatData(data);
      return setShowStatModal(!false)
    } 
    const statsQuestion = question.stats ? question.stats : [];
    console.log("locale in stats", locale);
    console.log("statsQuestions in stats", statsQuestion);
  return (
    <>
      <div className="p-2 row align-items-start">                          
            <button className="btn btn-sm  mx-1" onClick={()=> initModal(statsQuestion)}>
                  <FaChartPie alt={LANGUAGES["en-US"].Stats.QuestionStats} /></button>             
      </div>

      <div>    
        <Modal  fullscreen={true} show={showStatModal} >
              <Modal.Header closeButton onClick={() => {setShowStatModal(false)}}>
                <Modal.Title>{LANGUAGES["en-US"].Stats.Results}</Modal.Title>
              </Modal.Header>
              <Modal.Body >               
                            <Stats data={statData} />                
              </Modal.Body>
              <Modal.Footer>                                           
              
                    <button
                      type="button"
                      className="btn btn-outline-dark rounded-pill"
                      onClick={()=> {setShowStatModal(false)}}
                    >
                      Close
                    </button>                          
              </Modal.Footer>
        </Modal>     
         </div>
       
    </>
  )
}
export default StatsDialog;