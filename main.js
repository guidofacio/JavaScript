let usuario = null;
let constraseña = null;
let idUsuario = null;

const arrUsuarios = [
    {
        id: 0,
        usuario: "guido",
        contraseña: "guido01",
        saldo: 800000,
        movimientos: []
    },
    {
         id: 1,
        usuario: "diego",
        contraseña: "diego01",
        saldo: 20000,
        movimientos: []
    },
    {
        id: 2,
        usuario: "ignacio",
        contraseña: "ignacio01",
        saldo: 1000,
        movimientos: []
    },
    {
        id: 3,
        usuario: "maira",
        contraseña: "maira01",
        saldo: 0,
        movimientos: []
    }
];

function ValidarUsuario() {

    let usuarioValido = false;

    do {
        usuario = prompt("Ingrese su usuario:");
        console.log(usuario);

        for(i=0; i < arrUsuarios.length; i++)
        {
            if(usuario == arrUsuarios[i].usuario)
            {
                idUsuario = arrUsuarios[i].id;
                usuarioValido = true;
            }
        }  

    } while (!usuario || !usuarioValido);

    return usuarioValido;
}

let usuarioValido = ValidarUsuario();

function ValidarContraseña() {

    let contraseñaValida = false;

    do {
        contraseña = prompt("Ingrese su contraseña:");
        console.log(contraseña);

        if(contraseña == arrUsuarios[idUsuario].contraseña)
        {
            contraseñaValida =  true;
        }

    } while (!contraseña || !contraseñaValida);

    return contraseñaValida;
}

let contraseñaValida = ValidarContraseña();

function IngresarDinero() {

    let ingresoValido = false;
    let ingreso = null;
    let lista = "";

    do {
         
         ingreso = prompt("Saldo: " + arrUsuarios[idUsuario].saldo + "\n ------------------ \n"
                          + lista + "\n" 
                          + " \n INGRESE EL MONTO O ENTER/CANCELAR PARA SALIR:");
        lista = "";

        if(ingreso != "" && ingreso != null)
        {
            ingresoValido = true;
            let ingresoTipado = parseInt(ingreso)
            arrUsuarios[idUsuario].movimientos.push(ingresoTipado);
            arrUsuarios[idUsuario].saldo += ingresoTipado; 
                      
            for (const item of arrUsuarios[idUsuario].movimientos) {
            lista += `Movimiento: ${item}\n`;
            }

            console.log(lista);
        }
        else
        {
            ingresoValido = false;
        }
    } while (ingresoValido);

    return true;
}

if(usuarioValido && contraseñaValida)
{
    let opcionValida = false;
    let opcionMenu = 0;

    do {

        opcionMenu =  prompt("1) Ingresar Dinero \n 2) Retirar Dinero \n 3) SALIR");

        console.log(opcionMenu);
        switch (opcionMenu) {
        case "1":
            opcionValida = true;
            IngresarDinero();
            break;
        case "2":
            console.log("UN TIRADO");
            opcionValida = true;
            break;
         case "3":
            console.log("SALIENDO");
            opcionValida = true;
            break;
        }
    } while (!opcionValida);

}