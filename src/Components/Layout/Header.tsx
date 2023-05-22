import logo from '../../assets/images/logos/logo_iica.svg'

const Header: React.FC = () => {

    return (
        <header id="header" className="header sticky-top d-flex align-items-center">

            <div className="d-flex align-items-center justify-content-between">
                <a href="/" className="logo d-flex align-items-center">
                    <img src={logo} alt="IICA" />
                </a>
            </div>

        </header>
    )
}

export default Header