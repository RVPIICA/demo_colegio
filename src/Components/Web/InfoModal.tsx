import { CSSProperties } from "react";
import { Modal } from "react-bootstrap";
import { IModalButton, IModalData } from "../../util/interfaces";

const InfoModalButton: React.FC<{ button: IModalButton }> = ({ button }) => {
    return (
        <a href={button.url} target={button.target ? button.target : "_self"} className="btn btn-primary">
            {button.text}
        </a>
    )
}

const InfoModal: React.FC<{ info: IModalData | undefined, setModalData: (modalData: IModalData | undefined) => void }> = ({ info, setModalData }) => {
    return (
        <Modal show={info ? true : false} size="xl" centered={true}>
            {info ? (
                <>
                    <Modal.Header style={{
                        backgroundColor: "#1c3664",
                        color: "white"
                    }} closeButton onHide={() => setModalData(undefined)} closeVariant="white">
                        <h3>{info.title}</h3>
                    </Modal.Header>
                    <Modal.Body>
                        {info.videoUrl ?
                            <div className="embed-responsive embed-responsive-16by9">
                                <video preload="metadata" playsInline={true} controls={true} width={"100%"} autoPlay={true} src={info.videoUrl} />
                            </div>
                            : null
                        }
                        {
                            info.description ?
                                <>
                                    <p style={{ textAlign: "justify" }}>
                                        {info.description}
                                    </p>
                                </> : null
                        }

                    </Modal.Body>

                    {
                        info.buttons ?
                            <Modal.Footer>
                                {info.buttons.map((button, key) => {
                                    return (
                                        <InfoModalButton button={button} key={key} />
                                    )
                                })}
                            </Modal.Footer> : null
                    }

                </>
            ) : null}

        </Modal>
    )
}

export default InfoModal