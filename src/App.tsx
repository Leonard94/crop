import { useState } from 'react'
import { CropImage } from './CropImage'

export const App = () => {
  const [img, setImg] = useState<any>(null)
  const [isEdit, setEdit] = useState(false)

  const onSelectFile = (e: any) => {
    if (e.target.files) {
      const file = e.target.files[0]

      // const imageURL = URL.createObjectURL(file)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const result = reader.result
        setImg(result)
      }
    }
  }

  return (
    <div className='container'>
      <div className='app'>
        <h2>App</h2>
        <div className='answer'>
          {img ? (
            <>
              <span className='crop' onClick={() => setEdit(true)}>
                A
              </span>
              <img src={img} />
              <span className='delete' onClick={() => setImg(null)}>
                X
              </span>
            </>
          ) : (
            <input type='file' onChange={onSelectFile} />
          )}
        </div>
        {isEdit && (
          <CropImage
            onClose={() => setEdit(false)}
            image={img}
            setImage={(image) => setImg(image)}
          />
        )}
      </div>
    </div>
  )
}
