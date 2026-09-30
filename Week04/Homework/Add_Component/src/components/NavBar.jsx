// I just added the Modal and my new component to the 
// navigation bar so I did not use any useEffect function

import {Link} from 'react-router-dom'
import Panel from './Panel'

const NavBar = () => {
  return (
    <Panel>
      <div className="mt-8 px-3">
        <Link to="/" className="text-blue-500">
          Buttons
        </Link>
      </div>
      <div className="mt-8 px-3">
        <Link to="/accordion" className="text-blue-500">
          Accordion
        </Link>
      </div>
      <div className="mt-8 px-3">
        <Link to="/dropdown" className="text-blue-500">
          Dropdown
        </Link>
      </div>
      {/* Homework: */}
      <div className="mt-8 px-3">
        <Link to="/modal" className="text-blue-500">
          Modal
        </Link>
      </div>
      <div className="mt-8 px-3">
        <Link to="/theme" className="text-blue-500">
          Theme
        </Link>
      </div>
    </Panel>
  )
}

export default NavBar
