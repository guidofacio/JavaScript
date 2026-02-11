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

    let UsuarioBusqueda = arrUsuarios.find(u => u.usuario == usuarioIngresado.value);

    if(UsuarioBusqueda != undefined && !Number.isNaN(UsuarioBusqueda.id))
    {
        idUsuario = UsuarioBusqueda.id;
    }

    return idUsuario;
}

function ValidarContraseña(IdUsuario, contraseñaIngresada) 
{
    let contraseñaValida = false;

    let BusquedaContraseña = arrUsuarios.find(c => c.contraseña == contraseñaIngresada.value);

    if(BusquedaContraseña != undefined && !Number.isNaN(BusquedaContraseña.contraseña))
    {
        contraseñaValida = true;
    }

    return contraseñaValida;
}

function ValidarLogin(usuarioIngresado, contraseñaIngresada)
{

    let IdUsuario = ValidarUsuario(usuarioIngresado);
    let loginValido = ValidarContraseña(IdUsuario, contraseñaIngresada);

    if(loginValido)
    {
        localStorage.setItem("usuario", usuarioIngresado.value);
        localStorage.setItem("contraseña", contraseñaIngresada.value);
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
    //obtengo cotizacion del dolar
    obtenerCotizacionDolar();

    //Remuevo login
    let Login = document.getElementById("login");
    document.body.removeChild(Login);

    //Creo div para info del usuario
    let DatosUsuario = document.createElement("div");

    let TituloInfoUsuario = document.createElement("h2");
    TituloInfoUsuario.innerText = "Información del Usuario de HomeBanking";

    let TextoUsuario = document.createElement("p");
    TextoUsuario.innerText = `Nombre: ${arrUsuarios[IdUsuario].usuario}`;

    let TextoContenedorSaldo = document.createElement("p");
    TextoContenedorSaldo.innerText = "Saldo";
    let TextoSaldo = document.createElement("p");
    TextoSaldo.setAttribute("id", "saldo");
    TextoSaldo.innerHTML = "0";
    TextoContenedorSaldo.appendChild(TextoSaldo);

    let TextoCotizacion = document.createElement("p");
    TextoCotizacion.setAttribute("id", "cotizacion");

    DatosUsuario.appendChild(TituloInfoUsuario);
    DatosUsuario.appendChild(TextoUsuario);
    DatosUsuario.appendChild(TextoContenedorSaldo);
    DatosUsuario.appendChild(TextoCotizacion);
    document.body.appendChild(DatosUsuario);

    //Creo div para menu del usuario
    let MenuUsuario = document.createElement("div");

    let ul = document.createElement("ul");

    let liIngresar = document.createElement("li");
    let aIngresar = document.createElement("a");
    aIngresar.setAttribute("id", "IngresarDinero");
    aIngresar.setAttribute("href", "#");
    aIngresar.innerText = "Ingresar Dinero";
    liIngresar.appendChild(aIngresar);

    let liVer = document.createElement("li");
    let aVer = document.createElement("a");
    aVer.setAttribute("id", "VerMovimientos");
    aVer.setAttribute("href", "#");
    aVer.innerText = "Ver Movimientos";
    liVer.appendChild(aVer);

    ul.appendChild(liIngresar);
    ul.appendChild(liVer);
    MenuUsuario.appendChild(ul);

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

        let inputFiltro = document.createElement("input");
        inputFiltro.setAttribute("type", "text");
        inputFiltro.setAttribute("id", "filtro");
        inputFiltro.setAttribute("name", "filtro");
        inputFiltro.setAttribute("placeholder", "Escriba aqui para buscar");

        filtro.appendChild(inputFiltro);
        filtro.appendChild(document.createElement("br"));
        filtro.appendChild(document.createElement("br"));

        DivMovimientos.appendChild(filtro);

        //Hago una primer consulta de movimientos general sin filtro
        VerMovimientosS(IdUsuario, DivMovimientos, arrUsuarios[IdUsuario].movimientos);

        //Asocio evento input al elemento de filtro
        let InputFiltro = document.getElementById("filtro");
        InputFiltro.addEventListener("input", (e) =>{
        
            let filtrado = arrUsuarios[IdUsuario].movimientos.filter((movimiento) => movimiento.descripcion.includes(e.target.value));
            console.log(filtrado);

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

function obtenerCotizacionDolar ()
{
    fetch('https://dolarapi.com/v1/dolares/oficial')
    .then((respuesta) => {
        if (!respuesta.ok) {
              let TextoCotizacion = document.getElementById("cotizacion");
              TextoCotizacion.innerText = "Las cotizaciones del dolar no estan disponibles en este momento";
        }
        else
        {
             return respuesta.json();
        }      
    })
    .then((respuestajson) => {
        console.log(respuestajson)
           let TextoCotizacion = document.getElementById("cotizacion");
              TextoCotizacion.innerText = `Cotización Dolar → Compra: ${respuestajson.compra} | Venta: ${respuestajson.venta}`;
    })
    .catch((err) => console.error("Error:", err));
}

function VerMovimientosS(IdUsuario, DivMovimientos, Movimientos) {

    let DivIngresoDinero = document.getElementById("IngresoDinero");

    //Si esta renderizada la funcionalidad de ingreso de dinero la quito del dom
    if(DivIngresoDinero)
    {
        document.body.removeChild(DivIngresoDinero);
    }

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
      let tarjeta = document.createElement("div");
      tarjeta.classList.add("tarjeta");

      let filaTop = document.createElement("div");

      let spanDesc = document.createElement("span");
      spanDesc.innerText = movimiento.descripcion;

      let spanFecha = document.createElement("span");
      spanFecha.innerText = movimiento.fecha;

      filaTop.appendChild(spanDesc);
      filaTop.appendChild(spanFecha);

      let importe = document.createElement("div");
      importe.innerText = movimiento.importe;

      if(movimiento.importe < 0) {
        importe.classList.add("importe-negativo");
      } else {
        importe.classList.add("importe-positivo");
      }

      tarjeta.appendChild(filaTop);
      tarjeta.appendChild(importe);

     return tarjeta.outerHTML;
  }).join(""); // join quita las comas separadoras del array

    DivMovimientos.appendChild(ListadoMovimientos);
}

function IngresarDineroO(IdUsuario) {

    // si esta renderizado la accion de ver movimientos se elimina
    DivMovimientos = document.getElementById("movimientos");
    if(DivMovimientos)
    {
        document.body.removeChild(DivMovimientos);
    }

    //Solo creo div de funcionalidad de Ingresar dinero si no existe
    if (!document.getElementById("IngresoDinero"))
    {
        let DivIngresoDinero = document.createElement("div");
        DivIngresoDinero.setAttribute("id", "IngresoDinero");

        let labelImporte = document.createElement("label");
        labelImporte.innerText = "Importe:";

        let br1 = document.createElement("br");

        let inputImporte = document.createElement("input");
        inputImporte.setAttribute("type", "text");
        inputImporte.setAttribute("id", "importe");
        inputImporte.setAttribute("name", "importe");
        inputImporte.setAttribute("placeholder", "Ingrese Importe");

        let br2 = document.createElement("br");

        let labelDesc = document.createElement("label");
        labelDesc.innerText = "Descripcion:";

        let br3 = document.createElement("br");

        let inputDesc = document.createElement("input");
        inputDesc.setAttribute("type", "text");
        inputDesc.setAttribute("id", "descripcion");
        inputDesc.setAttribute("name", "descripcion");
        inputDesc.setAttribute("placeholder", " Ingrese Descripcion");

        let br4 = document.createElement("br");
        let br5 = document.createElement("br");
        let br6 = document.createElement("br");

        let btn = document.createElement("button");
        btn.setAttribute("id", "btnIngresarDinero");
        btn.innerText = "Ingresar";

        DivIngresoDinero.appendChild(labelImporte);
        DivIngresoDinero.appendChild(br1);
        DivIngresoDinero.appendChild(inputImporte);
        DivIngresoDinero.appendChild(br2);
        DivIngresoDinero.appendChild(labelDesc);
        DivIngresoDinero.appendChild(br3);
        DivIngresoDinero.appendChild(inputDesc);
        DivIngresoDinero.appendChild(br4);
        DivIngresoDinero.appendChild(br5);
        DivIngresoDinero.appendChild(br6);
        DivIngresoDinero.appendChild(btn);

        document.body.appendChild(DivIngresoDinero);

        let btnIngresarDinero = document.getElementById("btnIngresarDinero");
        btnIngresarDinero.addEventListener("click", () => {

        let importe = document.getElementById("importe").value;
        let descripcion = document.getElementById("descripcion").value;

        if(importe != "" && importe != null && !isNaN(importe) && importe > 0)
        {
            let movimiento = new Movimiento(importe, descripcion, new Date());
            arrUsuarios[IdUsuario].movimientos.push(movimiento);
                    
            let saldo = arrUsuarios[IdUsuario].movimientos.reduce((saldo, mov) => {
                        return parseInt(saldo) + parseInt(mov.importe);
                        }, 0);
                        
            arrUsuarios[IdUsuario].saldo = saldo;

            let TextoSaldo = document.getElementById("saldo");
            TextoSaldo.innerHTML = saldo;

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