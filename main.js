const Usuario = function(id, usuario, contraseña,saldo,movimientos) {
    this.id = id;
    this.usuario = usuario;
    this.contraseña = contraseña;
    this.saldo = saldo;
    this.movimientos = [];
}

const Movimiento = function(importe, descripcion, fecha) {
    this.importe = importe;
    this.descripcion = descripcion;
    this.fecha = fecha;
}

let usuario1 = new Usuario(0,"guido","guido01",800000,[]);
let usuario2 = new Usuario(1,"diego","diego01",20000,[]);
let usuario3 = new Usuario(2,"ignacio","ignacio01",800000,[]);
let usuario4 = new Usuario(3,"maira","maira01",800000,[]);

const arrUsuarios = [usuario1,usuario2,usuario3,usuario4];

function ValidarUsuario(usuarioIngresado) 
{
    
    let idUsuario = -1;

    arrUsuarios.forEach((usuario) => {
        if(usuario.usuario == usuarioIngresado.value)
        {
            idUsuario = usuario.id;
        }       
    });

    return idUsuario;
}

function ValidarContraseña(IdUsuario, contraseñaIngresada) 
{

    let contraseñaValida = false;

         arrUsuarios.forEach((usuario) => {
            if(usuario.contraseña == contraseñaIngresada.value && usuario.id == IdUsuario)
            {
                contraseñaValida = true;
            }       
        });

    return contraseñaValida;
}

function ValidarLogin(usuarioIngresado, contraseñaIngresada)
{

    let IdUsuario = ValidarUsuario(usuarioIngresado);
    let loginValido = ValidarContraseña(IdUsuario, contraseñaIngresada);

    if(loginValido)
    {
        Menu(IdUsuario);
    }
    else
    {
        alert("Usuario o Contraseña Incorrectos.")
    }        
}

let usuario = document.getElementById("usuario");
let usuarioIngresado = ""
usuario.addEventListener("change", (e) => usuarioIngresado = e.target.value)

let contraseña = document.getElementById("contraseña");
let contraseñaIngresada = ""
contraseña.addEventListener("change", (e) => contraseñaIngresada = e.target.value)

let btnIniciarSesion = document.getElementById("btnIniciarSesion");
btnIniciarSesion.addEventListener("click", () => ValidarLogin(usuario, contraseña));

function Menu(IdUsuario)
{
    //Remuevo login
    let Login = document.getElementById("login");
    document.body.removeChild(Login);

    //Creo div para info del usuario
    let DatosUsuario = document.createElement("div");
    DatosUsuario.innerHTML = `<h2>Información del Usuario de HomeBanking</h2>
                              <p>Nombre: ${arrUsuarios[IdUsuario].usuario}</p>`;
    document.body.appendChild(DatosUsuario);

    //Creo div para menu del usuario
    let MenuUsuario = document.createElement("div");
    MenuUsuario.innerHTML = `<ul>
                                <li><a id="IngresarDinero" href="#">Ingresar Dinero</a></li>
                                <li><a id="VerMovimientos" href="#">Ver Movimientos</a></li>
                              </ul>`;
    document.body.appendChild(MenuUsuario);

    //Asocio evento click al punto de menu "Ingresar Dinero"
    let IngresarDinero = document.getElementById("IngresarDinero");
    IngresarDinero.addEventListener("click", () => { IngresarDineroO(IdUsuario) } );

    //Asocio evento click al punto de menu "Ver Movimientos"
    let VerMovimientos = document.getElementById("VerMovimientos");
    VerMovimientos.addEventListener("click", () => {

        // Solo crear div de funcionalidad de movimientos si no existe
        if(!document.getElementById("movimientos"))
        {
          let DivMovimientos = document.createElement("div");
          DivMovimientos.setAttribute("id","movimientos");
          document.body.appendChild(DivMovimientos);

          //Creo elementro de filtro de movimientos y lo agrego como hijo al div movimientos
          let filtro = document.createElement("div");
          filtro.innerHTML = `<input type="text" id="filtro" name="filtro" placeholder="Escriba aqui para buscar"><br><br>`;                
          DivMovimientos.appendChild(filtro);

          //Hago una primer consulta de movimientos general sin filtro
          VerMovimientosS(IdUsuario, DivMovimientos, arrUsuarios[IdUsuario].movimientos);      
          
          //Asocio evento input al elemento de filtro
          let InputFiltro = document.getElementById("filtro");
          InputFiltro.addEventListener("input", (e) =>{
              let filtrado = arrUsuarios[IdUsuario].movimientos.filter((movimiento) => movimiento.descripcion.includes(e.target.value));
              VerMovimientosS(IdUsuario,DivMovimientos, filtrado);
          } );

          //Creo elemento boton para volver al menu principal del usuario
          let btnMenu = document.createElement("button");
          btnMenu.innerText ="Volver";
          DivMovimientos.appendChild(btnMenu);

          //Le asocio evento click para remover toda la funcionalidad de movimientos
          btnMenu.addEventListener("click", () =>{
              let EliminarDivMovimientos = document.getElementById("movimientos");
              EliminarDivMovimientos.remove();
          } )
        }
    });
}

function VerMovimientosS(IdUsuario, DivMovimientos, Movimientos) {

    let ListadoMovimientos = "";

    //Creo div de listado de movimientos solo si no existe
    if(!document.getElementById("listadoMovimientos"))
    {
       ListadoMovimientos = document.createElement("div");
       ListadoMovimientos.setAttribute("id","listadoMovimientos");
    }
    else
    {
      ListadoMovimientos = document.getElementById("listadoMovimientos");
    }

    //Agrego html al elemento de Movimientos con el array que viene filtrado o sin filtrar
    ListadoMovimientos.innerHTML = Movimientos.map((movimiento) => 
    {
    return `
      <div style="
        background: #ffffff;
        border-radius: 10px;
        box-shadow: 0 3px 8px rgba(0,0,0,0.1);
        padding: 12px;
        margin-bottom: 10px;
      ">

        <div style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        ">
          <span style="
            color: #555;
          ">
            ${movimiento.descripcion}
          </span>

          <span style="
            color: #888;
          ">
            ${movimiento.fecha}
          </span>
        </div>

        <div style="
          font-weight: bold;
          color: ${movimiento.importe < 0 ? 'red' : 'green'};
        ">
          ${movimiento.importe}
        </div>

      </div>
    `;
  }).join(""); // join quita las comas separadoras del array

  DivMovimientos.appendChild(ListadoMovimientos);
}

function IngresarDineroO(IdUsuario) {

    //Solo creo div de funcionalidad de Ingresar dinero si no existe
    if (!document.getElementById("IngresoDinero"))
    {
        let DivIngresoDinero = document.createElement("div");
        DivIngresoDinero.setAttribute("id", "IngresoDinero");
        DivIngresoDinero.innerHTML = `<label>Importe:</label><br>
                                      <input type="text" id="importe" name="importe" placeholder="Ingrese Importe"><br>
                                      <label>Descripcion:</label><br>
                                      <input type="text" id="descripcion" name="descripcion" placeholder=" Ingrese Descripcion"><br><br><br>
                                      <button id="btnIngresarDinero">Ingresar</button>`;

        document.body.appendChild(DivIngresoDinero);

        let btnIngresarDinero = document.getElementById("btnIngresarDinero");
        btnIngresarDinero.addEventListener("click", () => {

            let importe = document.getElementById("importe").value;
            let descripcion = document.getElementById("descripcion").value;

            if(importe != "" && importe != null && !isNaN(importe) && importe > 0)
            {           
                let movimiento = new Movimiento(importe, descripcion, new Date());
                arrUsuarios[IdUsuario].movimientos.push(movimiento);
                arrUsuarios[IdUsuario].saldo = arrUsuarios[IdUsuario].movimientos.forEach((movimiento) => { return movimiento += movimiento });       
                alert(" \n Se ingreso el dinero correctamente");
                let eliminarIngresoDinero = document.getElementById("IngresoDinero")
                document.body.removeChild(eliminarIngresoDinero);  
            }
            else
            {
                alert("\n Importe invalido, PRESIONE ACEPTAR PARA VOLVER AL MENU.");
            }
        })
    }
}
