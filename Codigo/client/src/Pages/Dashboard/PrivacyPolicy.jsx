import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { JiboContext } from "../../Context/JiboContext";
import { ModalLogin } from "../../Components/Main/Modals/ModalLogin";
import { ModalRegistroCompany } from "../../Components/Main/Modals/ModalRegistroCompany";
import { ModalRegistroWorker } from "../../Components/Main/Modals/ModalRegistroWorker";
import { ModalSelectRegister } from "../../Components/Main/Modals/ModalSelectRegister";
import { Button, Col, Container } from "react-bootstrap";

export const PrivacyPolicy = () => {
  const { showModal, setShowModal } = useContext(JiboContext);
  const navigate = useNavigate();
  return (
    <Col className="my-5">
      <Container>
        <h2>(ES UNA PRUEBA, NO ES REAL)</h2>
        <h2>Política de Privacidad JIBO</h2>
        <h4>Información sobre Protección de Datos</h4>
        <h5>1. RESPONSABLE</h5>
        <p>¿Quién es el Responsable del tratamiento de tus datos?</p>
        <p>Identidad: ---</p>
        <p>Dirección social: ---</p>
        <p>NIF: ---</p>
        <p>Teléfono de contacto: ---</p>
        <p>Correo electrónico de contacto Delegado Protección de Datos: ---</p>
        <h5>2. TIPOLOGÍA DE DATOS TRATADOS</h5>
        <p>
          ¿Cómo vamos a tratar tus datos personales y qué nos permite hacerlo?
          Gestionamos tus datos personales para poder prestarte los servicios
          que nos hayas solicitado a través de tus interacciones en el Sitio Web
          y en la Aplicación Móvil, al solicitar determinada información
          personal.
        </p>
        <p>
          Dichos datos personales que tratamos, pueden ser, a título enunciativo
          pero no limitativo: tu nombre, apellidos, fecha de nacimiento, datos
          de contacto, fotografía de perfil, identificación como usuario,
          contraseña, datos curriculares, datos de navegación, competencias y
          habilidades, según el caso, entre otros.
        </p>
        <p>
          Todos los campos que aparezcan señalados con un asterisco (*) en los
          formularios serán de obligada cumplimentación. Por tanto, en el caso
          de que no se faciliten o se faciliten de forma incorrecta, podría
          conllevar la imposibilidad de que se le puedan facilitar los servicios
          o información solicitados, sin perjuicio de poder seguir visualizando
          el contenido del Sitio Web y/o de la Aplicación Móvil.
        </p>
        <h5>3. FINALIDADES DE TRATAMIENTO Y BASES LEGALES LEGITIMADORAS</h5>
        <p>¿Por cuánto tiempo conservaremos tus datos?</p>
        <p>
          En cuanto al listado de servicios que nos puedes solicitar y te
          podemos prestar, se incluyen:
        </p>
        <h5>
          3.1. REGISTRO EN NUESTRAS PLATAFORMAS Y PRESTACIÓN DE NUESTROS
          SERVICIOS
        </h5>
        <p>
          Gestión del registro de alta como usuario de Infojobs, de tal modo que
          puedas acceder a nuestra plataforma y beneficiarte de los servicios de
          Infojobs, administrando tu cuenta de usuario. La base legitimadora
          será la ejecución de un contrato.
        </p>
        <p>
          Inscripción a ofertas de empleo y comunicación de tus datos al
          ofertante de empleo, siendo la base legitimadora tu consentimiento.
          Encontrarás tres tipologías de ofertas: Oferta de empleo gestionada en
          Infojobs. En este caso, tu curriculum vitae será visible para la
          empresa a cuyo proceso de selección te hayas inscrito durante el plazo
          máximo de visualización del curriculum vitae que ésta haya contratado,
          con el fin de que pueda gestionar tu candidatura a ese proceso
          selectivo.
        </p>
        <p>
          Oferta de empleo gestionada a través de la base de datos de la empresa
          ofertante de empleo. Debes saber que, al inscribirte en dicha oferta
          de empleo, tu curriculum vitae será cedido a la empresa ofertante de
          empleo y tus datos serán tratados conforme a lo dispuesto en su
          política de privacidad. Esta circunstancia será indicada en el detalle
          de la oferta de empleo y, con carácter previo a tu inscripción,
          deberás aceptar la Política de Privacidad de dicha empresa
          autorizándonos a cederle tu curriculum vitae para poder inscribirte en
          su proceso de selección.
        </p>
        <p>
          Oferta de empleo con “perfil ciego”. En este caso, te inscribirás en
          una oferta de empleo en la que la empresa decide no hacer pública su
          identidad. Tu curriculum vitae será visualizado o cedido a la empresa,
          en los términos anteriormente expuestos (dependiendo si la oferta es
          gestionada en Infojobs o es gestionada a través de la base de datos de
          la empresa) y no podremos informarte de su identidad en el momento de
          la inscripción. Sin embargo, en todo momento podrás contactar con
          nosotros y te ayudaremos a ejercer tus derechos respecto de tus datos
          personales.
        </p>
        <p>
          Permitir que empresas puedan visualizar tu curriculum vitae y puedan
          ponerse en contacto directo contigo. Los datos que incluyas en tu
          curriculum vitae serán visibles para las empresas que, sin haber
          publicado una oferta de empleo, buscan en nuestra base de datos de
          candidatos. Si una empresa se interesa en tu perfil, es posible que
          contacte contigo para comprobar si estás interesado en su oferta de
          empleo. La base legitimadora será el interés legítimo. Recuerda que
          siempre podrás cambiar esta configuración en los ajustes de tu menú
          privado de candidato.
        </p>
        <p>
          Crear tu perfil visible en internet. Si así lo decides, y únicamente
          si lo activas en los ajustes del menú privado de candidato, crearemos
          un enlace para que tu perfil profesional aparezca en las búsquedas que
          se realicen desde Internet. La base legitimadora será tu
          consentimiento.
        </p>
        <p>
          Servicio de test de competencias. La realización de la prueba y el
          resultado del mismo te permitirá conocer tus competencias, así como a
          las empresas interesadas en tu perfil, a las cuales se les facilitará
          el resultado obtenido con información adicional que le permita
          interpretar el mismo. El test y los resultados únicamente serán
          compartidos con las empresas a las que hayas consentido, de forma
          expresa, la visualización del mismo. En base a dicho resultado no se
          tomarán decisiones automatizadas por parte de las empresas.
        </p>
        <p>La base legitimadora será tu consentimiento.</p>
        <p>
          Servicio de mensajería instantánea. Las empresas podrán iniciar
          contigo una conversación a través de nuestro servicio de mensajería
          instantánea. La base legitimadora será la ejecución de un contrato.
        </p>
        Configuración de cuenta y de perfil. La base legitimadora será tu
        consentimiento. Gestionar el servicio solicitado. Te enviaremos
        comunicados incluyendo recordatorios, confirmación de inscripción a
        ofertas de empleo, cambios en el estado de tus candidaturas. La base
        legitimadora será la ejecución del contrato. Gestión del envío de
        alertas para informarte de la publicación de ofertas de empleo que
        coincidan con las preferencias de búsquedas que hayas guardado.
        Trataremos tus datos curriculares, tus búsquedas de empleo y tus
        inscripciones para avisarte de las ofertas de empleo que se adapten
        mejor a tu perfil. Asimismo, también puedes crear una alerta para que te
        avisemos de aquellas ofertas que mejor se adapten a tus intereses y
        perfil. La base legitimadora será tu consentimiento. Guardar y gestionar
        tus ofertas guardadas. La base legitimadora será tu consentimiento.
        Envío de comunicaciones importantes, y necesarias relacionadas con la
        prestación de nuestros servicios, incluyendo el envío de recordatorios,
        avisos técnicos, actualizaciones, alertas de seguridad, mensajes de
        soporte, entre otros. La base legitimadora será la ejecución de un
        contrato y el cumplimiento de obligaciones legales, en aquellos casos
        que aplique. Formulario de contacto, a través del cual podrás ponerte en
        contacto con nosotros y hacernos llegar dudas, consultas, o peticiones.
        La base legitimadora será tu consentimiento. Podrás beneficiarte de los
        servicios prestados a través de nuestro chatbot con el que podrás
        interactuar con el fin de que pueda proporcionarte la información que
        nos pidas, acerca de tu cuenta, productos o servicios de Infojobs. La
        base legitimadora será la adopción de medidas precontractuales al
        acceder al chatbot y realizar la consulta pertinente y enviarla de forma
        voluntaria, o la relación contractual, en el caso de que ya seas usuario
        registrado y decidas utilizar esta funcionalidad del servicio para
        comunicarte con nosotros. Prestación del servicio de atención al
        candidato con el fin de atender tu reclamación o consulta. La base
        legitimadora será la ejecución del contrato. 3.2. FINES ANALÍTICOS Y
        ESTADÍSTICOS Elaboración de informes estadísticos sobre tu perfil de
        usuario en función de tus hábitos de acceso y la actividad desarrollada
        en el Sitio Web y en la Aplicación Móvil, en su caso, de acuerdo con
        nuestra política de cookies, con el fin de poder desarrollar y mejorar
        el funcionamiento de Infojobs. La base legitimadora será tu
        consentimiento, prestado a través del configurador de las cookies (CMP).
        Mejorar los servicios a los que te suscribas y prestaciones de Infojobs
        mediante el estudio de tu comportamiento como usuario. La base
        legitimadora será el interés legítimo. Elaboración de informes
        estadísticos y de transparencia sobre la moderación de contenido y el
        promedio mensual de usuarios, entre otras cuestiones exigidas por la
        normativa vigente. La base legitimadora será una obligación legal. 3.3.
        ACTIVIDADES DE MARKETING Y ESTUDIOS DE MERCADO Elaboración de un perfil
        comercial en base a la información facilitada por ti, con el fin de
        realizar acciones comerciales ajustadas al mismo, por cualquier canal,
        utilizando tus datos personales derivados de la gestión de los productos
        contratados así como datos de navegación, hábitos de acceso, tráfico,
        etc. No se tomarán decisiones automatizadas en base a dicho perfil que
        produzcan efectos jurídicos para ti o que te afecten significativamente
        de un modo similar.Por su parte, tu perfil comercial podrá ser utilizado
        por otros sites de Adevinta Spain cuyo listado consta en el siguiente
        enlace www.adevinta.es o por sites de terceros para mostrarte publicidad
        personalizada. La base legitimadora será tu consentimiento. Enviarte
        mensajes de Infojobs para informarte de mejoras o novedades en nuestros
        productos y servicios, así como para enviarte consejos con el objetivo
        de ayudarte a mejorar tu curriculum vitae, cómo preparar una entrevista,
        cómo buscar empleo de forma eficiente, entre otro contenido relacionado,
        en base a nuestro interés legítimo salvo que nos indiques lo contrario
        (para usuarios registrados). Recuerda que siempre podrás personalizar
        estos envíos a través de los ajustes de tu menú privado de candidato.
        Envío de comunicaciones personalizadas por parte otros sites de Adevinta
        Spain sobre los diferentes servicios prestados por los mismos, que
        puedan ser de tu interés en base a tu perfil, a través de diferentes
        canales. La base legitimadora será tu consentimiento. Envío de
        comunicaciones personalizadas, a través de diferentes canales, sobre
        productos y servicios de terceros que puedan resultar de tu interés en
        base a tu perfil, como ofertas y promociones relacionadas con alguno de
        los siguientes sectores: Financiero, Editorial, Educación o Formación,
        Empleo, Automoción, Telecomunicaciones, Informática, Tecnología, Hogar,
        Belleza, Inmobiliaria, Venta a distancia, Gran consumo, Textil,
        Alimentación, Coleccionismo, Contenidos audiovisuales, Música,
        Pasatiempos, Ocio, Viaje y Turismo, Seguros, Energía y Agua, ONG y
        servicios prestados por la administración pública. La base legitimadora
        será tu consentimiento. Envío de alertas push sobre novedades y
        recomendaciones de Infojobs, contenido relacionado con el mercado
        laboral e Infojobs y comunicaciones acerca de tus candidaturas. La base
        legitimadora será tu consentimiento. Envío de encuestas de satisfacción
        en relación con los servicios prestados y el análisis y tratamiento de
        la información resultante de dichas encuestas, incluyendo la posibilidad
        de contactar contigo en relación con las respuestas que voluntariamente
        respondas y nos facilites, por motivos de calidad y de mejora de
        nuestros productos y servicios. La base legitimadora será el interés
        legítimo. Infojobs puede seleccionar a determinados usuarios e
        invitarles a participar en estudios de mercado, a través de la
        realización de entrevistas. Si aceptas la invitación, tus opiniones nos
        servirán para mejorar nuestros productos y servicios. La base que
        legitima la participación en estos estudios será tu consentimiento.
        <h5>3.4. SEGURIDAD CUENTA Y PLATAFORMA</h5>
        Prevención de abusos y fraudes en el uso de nuestros servicios (por
        ejemplo, actividades fraudulentas, ataques de denegación de servicios,
        envío de spam, entre otros). La base legitimadora será el interés
        legítimo.
        <h5>3.5. CUMPLIMIENTO DE OBLIGACIONES LEGALES</h5>
        Dar cumplimiento de obligaciones establecidas en la normativa,
        incluyendo la atención de los ejercicios de derechos de los interesados
        reconocidos por la normativa aplicable. En caso de resultar necesario,
        usaremos tu información según se requiera para que podamos cumplir con
        nuestras obligaciones legales. La base legitimadora será el cumplimiento
        de una obligación legal.
        <h5>4. PLAZOS DE CONSERVACIÓN</h5>
        ¿Por cuánto tiempo conservaremos tus datos? Te informamos de que,
        mientras seas usuario de Infojobs y utilices nuestros servicios, tus
        datos serán conservados durante la vigencia de la relación contractual y
        comercial con nosotros. En aquellos casos en los que el tratamiento de
        tus datos esté basado en tu consentimiento, hasta que revoques el mismo.
        En los supuestos legalmente previstos, trataremos tus datos hasta que
        solicites la supresión de los mismos, sin perjuicio de que los datos
        sean conservados por nosotros el tiempo necesario para cumplir con
        nuestras obligaciones legales y los plazos establecidos por la Ley. En
        relación al resultado del test de competencia realizado, en su caso, se
        conservará por un período de un (1) año desde la realización del mismo.
        Transcurrido dicho plazo, el test será eliminado. Durante todo el
        período de conservación, se aplican medidas de seguridad apropiadas para
        evitar cualquier riesgo de destrucción, pérdida, alteración accidental o
        acceso no autorizado a sus datos personales. Igualmente, te indicamos
        que, con carácter previo a que tus datos personales sean eliminados en
        su totalidad, éstos se conservarán bloqueados al finalizar el
        tratamiento al que se destinan y durante los plazos de prescripción de
        obligaciones definidos para cada finalidad del tratamiento, a los solos
        efectos de responder o cumplir con posibles responsabilidades derivadas
        del tratamiento.
        <h5>5. ENLACES O PÁGINAS DE TERCEROS</h5>
        Con el fin de ofrecerte los mejores servicios relacionados con Infojobs
        y el mercado laboral, podemos hacer referencia y/o facilitarte el acceso
        a servicios prestados por terceros que puedan resultar de tu interés y a
        los que podrás acceder a través de enlaces o links a páginas web
        externas a Infojobs. En estos casos, te recordamos que el servicio será
        prestado directamente por cada uno de ellos, sin que Infojobs sea
        responsable de los tratamientos llevados a cabo por estos, ni ceda
        ningún tipo de información, de tal forma que tendrás que aceptar sus
        respectivas políticas de privacidad y textos legales, con carácter
        previo a facilitarles tus datos personales.
        <h5>6. DESTINATARIOS</h5>
        ¿A quiénes se comunicarán tus datos? Infojobs únicamente compartirá o
        facilitará tus datos a terceros en la medida en que sea necesario y esté
        permitido o sea obligatorio de conformidad con la normativa vigente. En
        este sentido, tus datos podrán ser comunicados:. En el caso de
        inscripción a ofertas de empleo gestionada en Infojobs, tus datos serán
        visibles para la empresa a cuyo proceso de selección te hayas inscrito
        durante el plazo máximo de visualización del curriculum vitae que ésta
        haya contratado. En el caso de inscripción a ofertas de empleo
        gestionadas a través de la propia base de datos de la empresa tus datos
        serán comunicados a la empresa que se indique en el detalle de cada
        oferta de empleo. En el caso de que hayas optado por permitir que las
        empresas puedan visualizar tu curriculum vitae y puedan ponerse en
        contacto contigo, tus datos serán visibles para estas empresas que, sin
        haber publicado una oferta de empleo, buscan en nuestra base de datos de
        candidatos. Para llevar a cabo nuestra actividad, acudimos a
        determinados proveedores y servicios de confianza que podrían acceder a
        nuestros sistemas a fin de prestarnos los servicios o bien para
        prestártelos a ti en nuestro nombre. En estos casos, te informamos de
        que Adevinta Spain ha suscrito los correspondientes contratos de encargo
        de tratamiento con cada uno de ellos. Estos proveedores tienen la
        obligación contractual de proteger tus datos personales con las máximas
        garantías posibles y únicamente podrán acceder a ellos con el fin de
        llevar a cabo los servicios contratados por Infojobs. En algunos casos,
        estos proveedores están establecidos fuera del Espacio Económico
        Europeo, lo que puede implicar que sus datos puedan ser objeto de una
        transferencia internacional. En estos casos, los datos personales
        estarán protegidos por los proveedores de servicios a través de la
        adopción de medidas adecuadas y/o mediante la firma de las cláusulas
        contractuales tipo de la Unión Europea relativas a la transferencia de
        datos aprobadas por la Comisión Europea, garantizando un nivel de
        protección equivalente al europeo. Por otra parte, los datos personales
        que nos proporciones podrán quedar disponibles para su acceso a miembros
        de nuestras empresas del Grupo Adevinta para fines administrativos y de
        soporte. Podremos comunicar tus datos de carácter personal a organismos
        públicos, órganos policiales, juzgados y tribunales, autoridades
        fiscales y organismos reguladores siempre y cuando sean requeridos de
        conformidad con las disposiciones legales y reglamentarias, sea
        necesario para cumplir con nuestras obligaciones legales o con un
        requerimiento/ solicitud legalmente vinculante y en aquellos casos en
        los que sea necesario para responder a causas presentadas contra
        Infojobs.
        <h5>7. DERECHOS</h5>
        ¿Cuáles son tus derechos cuando nos facilitas tus datos y cómo puedes
        ejercerlos? Tienes derecho a obtener confirmación sobre si en Adevinta
        Spain estamos tratando datos personales que te conciernan, o no.
        Asimismo, tienes derecho a acceder a tus datos personales, así como a
        solicitar la rectificación de los datos inexactos o, en su caso,
        solicitar su supresión cuando, entre otros motivos, los datos ya no sean
        necesarios para los fines que fueron recogidos. En determinadas
        circunstancias, podrás solicitar la limitación del tratamiento de tus
        datos, en cuyo caso únicamente los conservaremos para el ejercicio o la
        defensa de reclamaciones. Adicionalmente, en determinadas circunstancias
        y por motivos relacionados con tu situación particular, podrás oponerte
        al tratamiento de tus datos. Adevinta Spain dejará de tratar los datos,
        salvo por motivos legítimos imperiosos, contractuales o el ejercicio o
        la defensa de posibles reclamaciones. Asimismo, puedes ejercer el
        derecho a la portabilidad de los datos, así como retirar los
        consentimientos facilitados en cualquier momento, sin que ello afecte a
        la licitud del tratamiento basado en el consentimiento previo a su
        retirada. Si deseas ejercitar cualquiera de tus derechos puedes
        dirigirte a nosotros a través de los enlaces habilitados que encontrarás
        en los correos electrónicos y comunicaciones de ---Empresa datos--- o o
        accediendo a tu perfil en tu cuenta de usuario. Igualmente puedes
        remitirnos un correo electrónico a la dirección: ---Email---.
        Alternativamente, también puedes dirigirte a nosotros mediante correo
        postal en la siguiente dirección: ---Dirección fiscal---, dirigido a
        Atención al Usuario e indicando en el sobre “Protección de Datos”. A fin
        de cursar tu solicitud sin demoras, recuerda facilitar con claridad la
        mayor información posible sobre tu solicitud: nombre y apellidos,
        dirección de correo electrónico que utilizas para la cuenta o portal
        objeto de tu solicitud. Además, te recordamos que el ejercicio de estos
        derechos es gratuito, salvo que se formulen solicitudes de acceso
        manifiestamente infundadas o excesivas, en cuyo caso estamos legalmente
        habilitados para aplicar un canon razonable que cubra el coste de la
        tramitación de su solicitud. Por último, te informamos que puedes
        dirigirte ante la Agencia Española de Protección de Datos y demás
        organismos públicos competentes para cualquier reclamación derivada del
        tratamiento de tus datos. En relación con los datos facilitados a las
        empresas a cuyas ofertas son gestionadas en la propia base de datos de
        la empresa, puedes ejercer tus derechos frente a la misma, dirigiéndote
        a la dirección que figura en la “Información Básica de Protección de
        Datos” que se proporciona en el detalle de la oferta de empleo. Se
        entiende, en este caso, por empresa toda aquella persona física o
        jurídica que publique una oferta de empleo en nuestro Portal. En
        relación con los datos facilitados a las empresas que publican ofertas
        bajo un “perfil ciego”, podrás contactar con nosotros y te ayudaremos a
        ejercer tus derechos respecto de tus datos personales.
        <h5>8. COOKIES</h5>
        Infojobs utiliza cookies y otras tecnologías similares en su Sitio Web y
        en su Aplicación Móvil. Para obtener más información acerca de las
        cookies que utilizamos en el Sitio Web y en la Aplicación Móvil, puedes
        consultar nuestra política de cookies a la que puedes acceder a través
        del siguiente enlace política de cookies y acceder al listado de las
        cookies que utilizamos.
        <h5>9. CONFIDENCIALIDAD Y SEGURIDAD</h5>
        Infojobs garantiza que tratará tus datos de forma confidencial,
        guardando en todo momento el preceptivo y más estricto deber de secreto
        respecto de los mismos, conforme a lo dispuesto en la normativa de
        aplicación. Igualmente, te informamos de que Infojobs revisa
        periódicamente las medidas de seguridad técnicas y organizativas que
        aplica en sus sistemas de información y comunicación con el objeto de
        impedir la pérdida, alteración, uso indebido o cualquier otro
        tratamiento no autorizado de su información personal.
        <h5>10. MODIFICACIONES DE LA POLÍTICA DE PRIVACIDAD</h5>
        JIBO se reserva el derecho de modificar la presente política de
        privacidad en cualquier momento con el fin de adaptarla a la legislación
        aplicable vigente. Todas las modificaciones serán publicadas tanto en el
        Sitio Web como en la Aplicación Móvil, por lo que te recomendamos que
        las consultes con carácter habitual. Última actualización: 04 de junio
        del 2023
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
