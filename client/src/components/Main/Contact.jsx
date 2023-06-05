import HeaderMain from '../shared/HeaderMain'

import ClassicContact from './ClassicContact'

const Contact = () => {

    return (
        <div className="grid_container_home">
            <div className="item1_home">
                <HeaderMain />
            </div>
            <div className="item3_home">
                <ClassicContact />
            </div>
        </div>
    )
}

export default Contact
