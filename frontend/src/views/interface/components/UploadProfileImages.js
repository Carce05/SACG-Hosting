import CsLineIcons from 'cs-line-icons/CsLineIcons';
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { useDispatch } from 'react-redux';
import { actualizarUserProfileImage } from 'store/slices/usuarios/usuarioThunk';

export const UploadProfileImages = forwardRef((userData, ref) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState({ preview: '', data: '' })
  const [status, setStatus] = useState('')
  const { userId, updateImage, thumb } = userData.userData;
  useImperativeHandle(ref, () => ({
    async handleSubmit() {
      dispatch(actualizarUserProfileImage(image, userId, updateImage))
    },
    returnImage () {
      return image;
    }
  }));

  const validUrl = (link) => {
    return link.includes('profile_upload');
  }
  
  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }


  return (
    <div className='upload-image-container'>
    { image.preview 
    ? <img src={image.preview} className="profile-user-image" alt={ userId }/>
    : <img src={ validUrl(thumb) ? thumb : 'https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png' } className="profile-user-image" alt={ userId } /> 
    }
    <label className="custom-file-upload">
      <input type='file' name='file' onChange={handleFileChange}/>
        <CsLineIcons icon="pen" className="position-relative" />
    </label>
    {status && <h4>{status}</h4>}
  </div>
  )
});