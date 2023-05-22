import { Col, Row, Spinner } from "react-bootstrap"

const LoadingSpinner = () => {
    return (
        <Row className="justify-content-center">
            <Col xs={4} style={{ textAlign:"center", marginTop:"200px" }}>
                <Spinner animation="grow" variant="light" style={{ color:"#1C3664", marginRight:"10px" }} />
                <Spinner animation="grow" variant="light" style={{ color:"#1C3664", marginRight:"10px" }} />
                <Spinner animation="grow" variant="light" style={{ color:"#1C3664" }} />
            </Col>
        </Row>
    )
}

export default LoadingSpinner