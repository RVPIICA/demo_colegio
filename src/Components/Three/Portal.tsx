import { useState } from 'react'
import { CasaExterior, CasaInterior } from '../../scenes/Casa'

//Contenedor de todas las "Escenas" de nuestra aplicación
export const Portal:React.FC = () => {
    //Me permite almacenar en el estado la sección que estoy visualizando y setearla desde las escenas.
    const [section, setSection] = useState<string>('overview_frente')    
    
    ///Las secciones tienen un nombre de máquina específico 'ejemplo_uno'
    switch (section) {
        //Casa interior
        case 'casa_interior':
            return <CasaInterior onClick={setSection} />
        //Default es casa exterior. Si se quiere cambiar la escena default cambiar aquí
        default:
            return <CasaExterior onClick={setSection} /> 
    }
    
}