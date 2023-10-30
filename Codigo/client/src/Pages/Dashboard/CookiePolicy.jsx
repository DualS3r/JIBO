import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { JiboContext } from "../../Context/JiboContext";
import { ModalLogin } from "../../Components/Main/Modals/ModalLogin";
import { ModalRegistroCompany } from "../../Components/Main/Modals/ModalRegistroCompany";
import { ModalRegistroWorker } from "../../Components/Main/Modals/ModalRegistroWorker";
import { ModalSelectRegister } from "../../Components/Main/Modals/ModalSelectRegister";
import { Button, Col, Container } from "react-bootstrap";

export const CookiePolicy = () => {
  const { showModal, setShowModal } = useContext(JiboContext);
  const navigate = useNavigate();
  return (
    <Col className="my-5">
      <Container>
        <h2>(ES UNA PRUEBA, NO ES REAL)</h2>
        <h2>Política de Cookies</h2>
        <h5>¿Qué es una cookie? ¿Y para qué usamos estas tecnologías?</h5>
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en tu
          dispositivo (PC, teléfono móvil o tablet) que nos permiten reconocer
          tu navegador web. Las cookies contienen información principalmente
          sobre tu navegador web y sobre cualquier actividad que se ha producido
          en él.
        </p>
        <p>
          También podemos utilizar tecnologías similares que reconocen las
          cookies y los identificadores y permiten a terceros establecer cookies
          en tu dispositivo. Los web beacons pueden ser utilizados para
          determinar qué anuncios deben mostrarse en tu navegador web.
        </p>
        <p>
          En esta política usamos el término "cookie" para referirnos
          colectivamente a cookies, web beacons, píxel, tags y a otras
          tecnologías similares.
        </p>
        <h5>¿Qué tipo de cookies utilizamos?</h5>
        <p>
          Cookies estrictamente necesarias: son aquellas cookies necesarias para
          prestar el servicio solicitado, así como para recordar las
          preferencias de configuración.
        </p>
        <p>
          Cookies analíticas y de preferencias: son aquellas cookies a través de
          las que obtenemos estadísticas y análisis sobre el uso que hacen los
          usuarios de nuestros servicios. Esto nos permite tener una visión
          general de cuántos usuarios únicos tenemos y cómo utilizan nuestros
          servicios. Puedes desactivar estas cookies mediante los mecanismos que
          te mostramos a continuación pero ten en cuenta que, por ejemplo, no
          podremos recordar tus preferencias y patrones de navegación, puede que
          tengas que iniciar sesión cada vez que nos visites, etc.
        </p>
        Cookies publicitarias: son aquellas cookies que nos permiten mostrarte
        publicidad. Puedes saber más sobre este tipo de publicidad
        aquí:http://www.youronlinechoices.com/es/videos-utiles/ Utilizamos
        cookies publicitarias para distintas finalidades: Cookies usadas con
        finalidades de marketing: nos permiten monitorizar las actividades en
        nuestras páginas para entender cómo se utilizan y nos permiten optimizar
        nuestras campañas de adquisición de tráfico desde redes exteriores.
        También utilizamos servicios para monitorizar la actividad de un usuario
        en nuestra web y poder llegar a ofrecer publicidad en relación con sus
        búsquedas en otras webs, así como servicios para la descarga de
        aplicaciones y para la promoción de la marca. Finalmente, utilizamos
        servicios de push notificación para darte a conocer en nuestras
        aplicaciones las novedades en nuestros servicios.
        <h5>Cookies para mostrar publicidad personalizada</h5>
        La publicidad es parte de nuestro negocio y siempre estará ahí. Usamos
        tus datos para mostrarte publicidad que sea de tu interés y se ajuste a
        lo que buscas. Si no quieres ver publicidad adaptada a tus preferencias
        a continuación te explicamos cómo puedes desactivar esta opción. Al
        desactivar este tipo de cookies te mostraremos únicamente publicidad
        genérica. Además, trabajamos con terceros para que te muestren
        publicidad personalizada en base a navegación que hagas fuera de
        nuestras páginas. Del mismo modo si quieres desactivar la publicidad
        personalizada para recibir únicamente publicidad genérica lo puedes
        realizar a través de los siguientes enlaces a terceros.
        <h5>¿Cómo puedo gestionar y eliminar las cookies?</h5>
        El siguiente link incluye vídeos didácticos en formato de
        videotutoriales en los que se explica, paso a paso, cómo configurar las
        opciones de privacidad de los navegadores, redes sociales y sistemas
        operativos móviles más comunes:
        https://www.aepd.es/areas/internet/protege-tu-privacidad.html Asimismo,
        hay disponibles servicios que han sido desarrollados especialmente para
        proporcionar a los usuarios una lista actualizada de cookies y otros
        mecanismos de seguimiento, como por ejemplo http://www.ghostery.com o
        http://disconnect.me. O también puedes utilizar soluciones alternativas
        tales como http://www.youronlinechoices.com/es/ O puedes consultar a
        continuación las principales cookies que utilizamos desde donde podrás
        desactivarlas. Última actualización: 04 de junio del 2023
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
