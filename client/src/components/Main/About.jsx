import HeaderMain from '../shared/HeaderMain'

import ClassicAbout from './ClassicAbout'

const Main = () => {

    return (
        <div className="grid_container_home">
            <div className="item1_home">
                <HeaderMain />
            </div>
            <div className="item3_home">
                <ClassicAbout />
            </div>
        </div>
    )
}

export default Main
