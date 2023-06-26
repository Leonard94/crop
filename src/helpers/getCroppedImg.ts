const createImage = (url: string) =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url
  })

export const getCroppedImg = async (imageSrc: any, pixelCrop: any) => {
  const image: any = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx: any = canvas.getContext('2d')

  const maxSize = Math.max(image.width, image.height)
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

  canvas.width = safeArea
  canvas.height = safeArea

  ctx.translate(safeArea / 2, safeArea / 2)
  ctx.translate(-safeArea / 2, -safeArea / 2)
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  )

  const data = ctx.getImageData(0, 0, safeArea, safeArea)

  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  ctx.putImageData(
    data,
    0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
    0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
  )

  canvas.toBlob(
    (blob) => {
      if (blob) {
        const previewUrl = window.URL.createObjectURL(blob)

        const anchor = document.createElement('a')
        anchor.download = 'image.jpeg'
        anchor.href = URL.createObjectURL(blob)
        anchor.click()

        window.URL.revokeObjectURL(previewUrl)
      }
    },
    'image/jpeg',
    0.66
  )

  return canvas.toDataURL('image/jpeg')
}
