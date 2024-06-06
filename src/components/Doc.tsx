import GoogleLogo from '@/assets/google-icon.svg';
import Image from 'next/image';

const Doc = () => {
  return (
    <div className='mt-40 min-w-[600px] max-w-[800px]'>
      <section className='my-10'>
        <h1 className='text-5xl font-black'>Bienvenida</h1>
        <p className='mt-5'>Bienvenido al dashboard de Hedy. Acá vas a poder gestionar tus tareas en forma de tickes. Escoger la severidad y el estado de progreso en el que se encuentra</p>
        <p className='mt-5'>Espero que tu tiempo en nuestra web sea de tu agrado. Empecemos...</p>
      </section>
      <hr className='opacity-30' />

      <section className='my-10'>
        <h3 className='text-3xl font-bold'>Loguearse</h3>
        <p className='mt-5'>Para loguearte, primero acercate al botón que dice &#34;Register&#34;. Al ingresar, completa con tus datos &#34;Nombre&#34;, &#34;Email&#34; y &#34;Contraseña&#34;.</p>
        <div className='w-full h-32 flex justify-center items-center'>
          <button
            className='w-48 h-12 ml-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white'
          >Register</button>

        </div>
        <p>Una vez que ya estes logueado, automaticamente te va a redirigir al dashboard donde vas a pode crear tu primer tablero.</p>

        <p>En caso de que ya cuentes con una cuenta en Hedy Dashboard, solo tenes que ir al botón que dice &#34;Log In&#34; y te llevará al formulario de inicio de sesión y completes los campos con tus credenciales</p>
        <div className='w-full h-32 flex justify-center items-center'>
          <button
            className='w-48 h-12 ml-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white'
          >Log In</button>

        </div>
        <p>De igual manera, una vez que hayas iniciado sesión, el sistema te redirigrá a tu dashboard donde vas a ver tus tableros o crear uno nuevo.</p>

        <p>En caso que desees, vas a poder registrarte o iniciar sesión con tu cuenta de Google clickeando el botón con el icono de Google y seguir los pasos y dando los permisos.</p>

        <div className='w-full h-32 flex justify-center items-center'>

          <button type="button" className='bg-red-600 hover:bg-red-700 rounded-lg p-3 font-semibold text-lg'>
            <Image
              src={GoogleLogo}
              height={25}
              width={25}
              alt='google'
              className="fill-gray-400 md:fill-cyan-700 text-white"
            />
          </button>
        </div>
      </section>
      <hr className='opacity-30' />

      <section className='my-10'>
        <h3 className='text-3xl font-bold'>Crear un tablero</h3>
        <p className='mt-5'>Para crear un tablero, clieckea donde dice &#34;Create Board&#34; y se desplegará un formulario donde simplemente debes ingresar el nombre del tablero y una descripción.</p>
        <p>Al haber llenado los campos, clickea en donde dice &#34;Create&#34; y verás como se agrega el tablero en tu lista de tableros.</p>
        <div className='w-full h-32 flex justify-center items-center'>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600  text-white font-bold px-4 py-2 rounded-lg"
          >
            Create Board
          </button>

        </div>
        <p>Para ingresar al tablero, solo debes clickearlo.</p>
      </section>
      <hr className='opacity-30' />

      <section className='my-10'>
        <h3 className='text-3xl font-bold'>Agregar pioridad</h3>
        <p className='mt-5'>Al ingresar al tablero, vas a poder agregarle una nueva prioridad, eligiendo el nombre y cliekeando donde dice &#34;Add Priority&#34;</p>
      </section>
      <hr className='opacity-30' />

      <section className='my-10'>
        <h3 className='text-3xl font-bold'>Crear ticket</h3>
        <p className='mt-5'>Para crear un ticket, completa los campos y selecciona una &#34;Task list&#34; para seleccionar el estado de progreso de esta. Luego clickea en el boton &#34;Create Task&#34;</p>
        <div className='w-full h-32 flex justify-center items-center'>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg">
            Create Task
          </button>

        </div>
        <p>Una vez agergado, verás este ticket en la columna seleccionada segun el progreso.</p>
        <p>Para modificar el estado del ticket, solo clickealo y arrastralo a la columna que desees.</p>
      </section>
      <hr className='opacity-30' />
      <section className='my-10'>
        <h3 className='text-3xl font-bold'>Editar ticket</h3>
        <p className='mt-5'>Para modificar un ticket, clickealo y vuelve a completar sus campos. Al finalizar, da click en el boton &#34;Update Task&#34;</p>
        <div className='w-full h-32 flex justify-center items-center'>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg">
            Update Task
          </button>

        </div>
        <p>Para eliminar, simplemente da click en &#34;Delete&#34;</p>
        <div className='w-full h-32 flex justify-center items-center'>
          <button type="button" className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg">
            Delete
          </button>
        </div>
      </section>
      <hr className='opacity-30' />
    </div>
  );
};

export default Doc;
