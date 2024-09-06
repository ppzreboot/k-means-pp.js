import { useState } from 'react'
import { K_means_pp_demo } from './demo/ui'

export
function App() {
  const [target_img, set_target_img] = useState<HTMLImageElement>()
  return <div>
    <h1>k-means-pp.js demo</h1>
    {target_img
      ? <K_means_pp_demo img={target_img} />
      : <input
        type='file'
        onChange={evt => {
          const file = evt.target.files![0]
          if (file) {
            const img = new Image()
            img.src = URL.createObjectURL(file)
            img.onload = () => {
              set_target_img(img)
            }
          }
        }}
      />
    }
  </div>
}
