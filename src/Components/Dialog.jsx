import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Dialog({isOpen,onClose,content}){
    if(!isOpen) return null;
  
    return(
      <div className='dialog-overlay' onClick={onClose}>
        <div className='dialog-content' onClick={(event)=>event.stopPropagation()}>
          <button className='close-button' onClick={(event)=>{
            event.stopPropagation();
            onClose();
          }}><FontAwesomeIcon icon={faEyeSlash} /></button>
          <div className='dialog-body'>{content}</div>
        </div>
      </div>
    )
  }
  export default Dialog; 