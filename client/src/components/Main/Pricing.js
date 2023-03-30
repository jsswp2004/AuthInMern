import HeaderMain from '../shared/HeaderMain'

import ClassicPricing from './ClassicPricing'

const Main = () => {

    return (
        <div className="grid_container_home">
            <div className="item1_home">
                <HeaderMain />
            </div>
            <div className="item3_home">
                <ClassicPricing />
            </div>
        </div>
    )
}

export default Main
