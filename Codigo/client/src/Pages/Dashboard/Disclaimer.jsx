import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { JiboContext } from "../../Context/JiboContext";
import { ModalLogin } from "../../Components/Main/Modals/ModalLogin";
import { ModalRegistroCompany } from "../../Components/Main/Modals/ModalRegistroCompany";
import { ModalRegistroWorker } from "../../Components/Main/Modals/ModalRegistroWorker";
import { ModalSelectRegister } from "../../Components/Main/Modals/ModalSelectRegister";
import { Button, Col, Container } from "react-bootstrap";

export const Disclaimer = () => {
  const { showModal, setShowModal } = useContext(JiboContext);
  const navigate = useNavigate();
  return (
    <Col className="my-5">
      <Container>
        <h2>(ES UNA PRUEBA, NO ES REAL)</h2>
        <h2>Avisos Legales</h2>
        <h5>1. Términos y Condiciones de Uso</h5>
        <p>
          El uso de este sitio web está sujeto a los siguientes términos y
          condiciones de uso:
        </p>
        <p>
          El contenido de las páginas de este sitio web es solo para su
          información general y uso. Está sujeto a cambios sin previo aviso.
        </p>
        <p>
          Ni nosotros ni terceros proporcionamos ninguna garantía o garantía en
          cuanto a la precisión, puntualidad, rendimiento, integridad o
          idoneidad de la información y los materiales encontrados o ofrecidos
          en este sitio para un propósito particular. Usted reconoce que dicha
          información y materiales pueden contener inexactitudes o errores, y
          excluimos expresamente la responsabilidad por tales inexactitudes o
          errores en la medida máxima permitida por la ley.
        </p>
        <p>
          El uso de cualquier información o materiales en este sitio web es bajo
          su propio riesgo, y no seremos responsables. Es su responsabilidad
          garantizar que cualquier producto, servicio o información disponible a
          través de este sitio web cumpla con sus requisitos específicos.
        </p>
        <p>
          Este sitio web contiene material que es propiedad o está licenciado
          por nosotros. Este material incluye, pero no se limita a, el diseño,
          la apariencia, la presentación y los gráficos. Queda prohibida la
          reproducción no autorizada de estos materiales, que están protegidos
          por derechos de autor y otras leyes de propiedad intelectual.
        </p>
        <p>
          Todas las marcas comerciales reproducidas en este sitio web, que no
          son propiedad del operador o que están autorizadas, son reconocidas en
          el sitio web.
        </p>
        <p>
          El uso no autorizado de este sitio web puede dar lugar a una demanda
          por daños y perjuicios y/o ser un delito penal.
        </p>
        <p>
          De vez en cuando, este sitio web también puede incluir enlaces a otros
          sitios web. Estos enlaces se proporcionan para su conveniencia para
          proporcionar más información. No tenemos ninguna responsabilidad por
          el contenido de los sitios web vinculados.
        </p>
        <p>
          Su uso de este sitio web y cualquier disputa que surja de dicho uso
          del sitio web están sujetos a las leyes de [jurisdicción].
        </p>
        <h5>2. Política de Privacidad</h5>
        <p>
          Nuestra política de privacidad se encuentra disponible en [enlace a la
          Política de Privacidad], y establece cómo recopilamos, utilizamos y
          protegemos sus datos personales.
        </p>
        <h5>3. Política de Cookies</h5>
        Nuestra política de cookies se encuentra disponible en [enlace a la
        Política de Cookies], y explica cómo utilizamos cookies en este sitio
        web.
        <h5>4. Descargo de Responsabilidad Legal</h5>
        La información proporcionada en este sitio web es solo para fines
        informativos y no constituye asesoramiento legal, financiero o
        profesional. No nos hacemos responsables de cualquier error u omisión en
        el contenido. Hacemos esfuerzos razonables para mantener el sitio web en
        funcionamiento y libre de virus y malware, pero no garantizamos que el
        sitio esté libre de tales elementos dañinos. Es responsabilidad del
        usuario tomar medidas de seguridad adecuadas, como el uso de software
        antivirus y cortafuegos. No nos hacemos responsables de ningún daño
        directo, indirecto, consecuencial o incidental resultante del uso o la
        imposibilidad de uso de este sitio web.
        <h5>5. Contacto</h5>
        Si tiene alguna pregunta o inquietud con respecto a estos avisos
        legales, por favor contáctenos en [dirección de correo electrónico de
        contacto]. Este es un ejemplo genérico y puede ser necesario adaptarlo a
        las necesidades específicas de tu sitio web y las regulaciones legales
        de tu jurisdicción. También, te recomiendo consultar a un asesor legal
        para asegurarte de que tus avisos legales cumplan con todas las leyes y
        regulaciones aplicables. Última actualización: 04 de junio del 2023
        <div className="d-flex justify-content-center my-5">
          <Button onClick={() => navigate("/")}>Volver a inicio</Button>
        </div>
      </Container>
      {showModal === 1 ? (
        <ModalLogin show={showModal} onHide={() => setShowModal(0)} />
      ) : showModal === 2 ? (
        <ModalRegistroCompany show={showModal} onHide={() => setShowModal(0)} />
      ) : showModal === 3 ? (
        <ModalRegistroWorker show={showModal} onHide={() => setShowModal(0)} />
      ) : (
        showModal === 4 && (
          <ModalSelectRegister
            show={showModal}
            onHide={() => setShowModal(0)}
          />
        )
      )}
    </Col>
  );
};
