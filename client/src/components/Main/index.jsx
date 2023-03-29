import HeaderMain from '../shared/HeaderMain'

import ClassicHome from './ClassicHome'

const Main = () => {
  return (
    <div className="grid_container_home">
      <div className="item1_home">
        <HeaderMain />
      </div>
      <div className="item3_home">
        <ClassicHome />
      </div>

    </div>
  )
}

export default Main
