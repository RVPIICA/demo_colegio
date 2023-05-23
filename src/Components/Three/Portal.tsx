import { useState } from 'react'
import { CasaExterior, CasaInterior } from '../../scenes/Casa'
import { IModalData } from '../../util/interfaces'


export const Portal:React.FC = () => {
    const [section, setSection] = useState<string>('overview_frente')    
    
    switch (section) {
        //Casa
        case 'casa_interior':
            return <CasaInterior onClick={setSection} />
        default:
            return <CasaExterior onClick={setSection} /> 
    }
    
}