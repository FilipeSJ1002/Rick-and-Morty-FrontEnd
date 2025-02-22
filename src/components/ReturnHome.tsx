import { useNavigate } from "react-router-dom";
import ButtonConfig from "./ButtonConfig";

function ReturnHome(){
    const navigate = useNavigate()
    const goToLogin = () => {
        navigate('/')
    }

    return(
        <div>
            <ButtonConfig text='Voltar para o inicio' onClick={goToLogin} />
        </div>
    )
}

export default ReturnHome;