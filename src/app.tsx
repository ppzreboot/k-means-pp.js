import { useState } from 'react'
import { K_means_pp_demo } from './demo/ui'

export
function App() {
  const [file, set_file] = useState<File>()
  return <div>
    <h1>k-means-pp.js demo</h1>
    {file
      ? <K_means_pp_demo file={file} />
      : <input
        type='file'
        onChange={evt => set_file(evt.target.files![0])}
      />
    }
  </div>
}
