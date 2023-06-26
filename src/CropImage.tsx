import { useState } from 'react'
import Cropper from 'react-easy-crop'
import { getCroppedImg } from './helpers/getCroppedImg'
import './crop.css'

type TProps = {
  onClose: () => void
  image: any
  setImage: (img: any) => void
}

export const CropImage: React.FC<TProps> = ({ onClose, image, setImage }) => {
  const [croppedArea, setCroppedArea] = useState<any>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const onCropComplete = (_: any, croppedAreaPixels: any) => {
    setCroppedArea(croppedAreaPixels)
  }

  const onDownload = async () => {
    if (!crop || !image) {
      return
    }
    const canvas = await getCroppedImg(image, croppedArea)
    setImage(canvas)
    onClose()
  }

  return (
    <div className='modal'>
      <button onClick={onClose}>close</button>
      <button onClick={onDownload}>download</button>
      <div className='content'>
        <div className='modal-img'>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={400/300}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
      </div>
    </div>
  )
}
