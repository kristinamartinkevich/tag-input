import './App.css'
import TributeInput from './modules/HashtagInput/components/InputTribute'
import TagInput from './modules/HashtagInput/components/TagInput'

function App() {

  return (
    <>
      <div className='row justify-content-center mt-5'>
        <div className='col-auto'>
          <h3>Written from scratch</h3>
        </div>
      </div>
      <div className='row justify-content-center'>
        <div className='col-auto'>
          <TagInput />
        </div>
      </div>
      <div className='row justify-content-center mt-5'>
        <div className='col-auto'>
          <h3>Using library Tribute.js</h3>
        </div>
      </div>
      <div className='row justify-content-center'>
        <div className='col-auto'>
          <TributeInput />
        </div>
      </div>
    </>
  )
}

export default App
