Responda las siguientes preguntas en su documento de entrega:

1.	Sobre Observables y Asincronía:

a.	¿Por qué las peticiones HTTP en Angular devuelven un Observable en lugar de la data directa? ¿Qué diferencia hay frente a una Promise?

    Las peticiones HTTP son operaciones asíncronas que toman tiempo, por lo que no pueden retornar datos de inmediato. Angular usa Observables (de RxJS) en lugar de Promises porque son más poderosos: permiten cancelar la petición, aplicar operadores de transformación como map o catchError, y manejar múltiples emisiones de valores a lo largo del tiempo. Una Promise solo resuelve una vez y no se puede cancelar; un Observable es lazy (no hace nada hasta que alguien hace .subscribe()) y se puede componer con otros operadores.

b.	¿Qué ocurre si un componente llama a un servicio HTTP pero nunca hace .subscribe()? ¿Se ejecuta la petición igualmente?

    La petición nunca se ejecuta. Los Observables son lazy por naturaleza: el código dentro del Observable solo corre cuando hay un suscriptor. Sin .subscribe(), no se realiza ninguna llamada HTTP al servidor.

2.	Sobre Inyección de Dependencias:

c.	¿Qué ventaja de modularidad da providedIn: 'root' frente a instanciar el servicio manualmente con new CityService() dentro de un componente?

    Con providedIn: 'root', Angular crea una única instancia del servicio compartida en toda la aplicación (singleton), la gestiona automáticamente y la inyecta donde se necesite. Instanciar con new CityService() crea una instancia nueva cada vez, sin compartir estado, y además obliga a instanciar manualmente todas sus dependencias (como HttpClient), rompiendo el principio de inversión de dependencias.

d.	¿Cómo facilitaría la inyección de dependencias la escritura de pruebas unitarias para estos servicios?

    Permite reemplazar las dependencias reales por mocks o stubs en los tests. Por ejemplo, en lugar de usar el CityService real que hace peticiones HTTP, se puede inyectar un CityService falso que retorna datos estáticos. Esto hace que las pruebas sean rápidas, predecibles y sin dependencia de una red o base de datos real.

3.	Sobre Interceptores:

e.	¿Por qué es mejor centralizar el manejo de errores en HttpInterceptor en lugar de poner bloques try/catch en cada componente?

    Porque evita duplicar lógica en cada componente. Si hay 10 servicios y cada uno necesita manejar errores HTTP, sin un interceptor habría que repetir el mismo bloque de manejo de errores 10 veces. Con un interceptor, la lógica se escribe una sola vez y se aplica automáticamente a todas las peticiones HTTP de la aplicación, siguiendo el principio DRY (Don't Repeat Yourself).

f.	Además del manejo de errores, mencione dos casos de uso adicionales para un interceptor.

    1. Autenticación: Agregar automáticamente el token JWT en el header Authorization de todas las peticiones salientes, sin tener que hacerlo manualmente en cada servicio.

    2. Logging: Registrar en consola o en un servicio externo cada petición HTTP que se realiza (URL, método, tiempo de respuesta), útil para monitoreo y debugging.

4.	Sobre el Patrón Maestro-Detalle:

g.	¿Por qué se usa @Input() para pasar la ciudad a CityDetailComponent en lugar de volver a hacer un GET a /api/cities/{id}?

    Porque los datos de la ciudad ya fueron cargados en el componente padre (CityListComponent). Hacer un GET adicional sería una petición HTTP innecesaria que añade latencia y carga al servidor. Con @Input() se reutiliza la información que ya está en memoria, siguiendo el principio de eficiencia y comunicación entre componentes padre-hijo de Angular.


h.	Observe que en la respuesta de GET /api/cities, el campo country ya viene como objeto anidado (no solo el countryId). ¿Qué ventaja de diseño tiene esta decisión del backend para el frontend?

    Evita que el frontend tenga que hacer una segunda petición para obtener el nombre del país. Si el backend solo retornara countryId: 1, el frontend tendría que hacer un GET a /api/countries/1 por cada ciudad para mostrar el nombre. Al retornar el objeto completo country: { id, name, isoCode }, el frontend puede mostrar toda la información necesaria con una sola petición, reduciendo el número de llamadas HTTP y simplificando la lógica del frontend.
