/* VARIABLES DOM*/
let contenedorCarrito = document.getElementById('carrito-contenedor')
let contenedorProductos = document.getElementById('contenedor-Productos')
let contadorCarrito = document.getElementById('contadorCarrito')
let botonVaciar = document.getElementById('vaciar-carrito')
let botonComprar = document.getElementById('comprar-carrito')
let botonTachito = document.getElementsByClassName('boton-eliminar')



/* ARRAY VACIO CARRITO*/
let carrito = [];

//LLAMO LOS PRODUCTOS DEL .JSON CON FETCH
fetch("./productos.json")
    .then(response => response.json())
    .then( lista_productos => imprimir_cards(lista_productos));
    

/* IMPRIMIR ARRAY PRODUCTOS EN CARDS Y ALERTA DEL BOTON PARA AGREGAR AL CARRITO*/
function imprimir_cards(lista_productos){
     lista_productos.forEach((info) => {
        let div = document.createElement('div');
        div.classList.add('producto')
        div.innerHTML = `
        <img src=${info.img} class="img-produ">
        <h5>${info.nombre}</h5>
        <p>Precio: ${info.precio}$</p>
        <button id="agg-producto${info.id}" class="boton-agg"><i class="fas fa-shopping-cart"></i></button>
        `
        contenedorProductos.appendChild(div)
        
        let boton = document.getElementById(`agg-producto${info.id}`)
        
        boton.addEventListener('click', () => {
            agregarAlCarrito(info.id , lista_productos)
            Toastify({
                text: "Se agrego al Carrito",
                duration: 2000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true, 
                style: {
                  background: "blue",
                },
                onClick: function(){} 
              }).showToast();
        })

        /* ANIMACIONES ANIME.JS PARA CARDS Y NAV*/
anime({
  targets: '.producto',
  scale: [
    {value: .6, easing: 'easeOutSine', duration: 500},
    {value: 1, easing: 'easeInOutQuad', duration: 1200}
  ],
  delay: anime.stagger(200, {grid: [14, 5], from: 'center'})
});

anime({
  targets: '.animated',
  translateX: 2000,
  easing: 'easeInOutExpo'
});

})};


/* AGG PRODUCTO AL CARRITO SIN QUE SE REPITA*/
const agregarAlCarrito = (prodId , lista_productos) => {
    let agregar_producto = lista_productos.find(prod => prod.id == prodId)
    let existe = carrito.some(prod => prod.id === prodId)

    existe == true ? agregar_producto.cantidad++ : carrito.push(agregar_producto); //reducimos un if a la nomenclatura de operador ternario

    actualizarCarrito() 

};



/* IMPRIMIR EL CARRITO*/
const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""
    carrito.forEach((info) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${info.nombre}</p>
        <p>Precio:$${info.precio}</p>
        <p>Cantidad: <span id="cantidad">${info.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${info.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    
    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, info) => acc + info.cantidad * info.precio, 0)

    let botonEliminar = document.querySelectorAll(".boton-eliminar")

    botonEliminar.forEach(boton => {
        boton.addEventListener("click", tachitoProducto)
    })
    
};

/*CARGA EL HTML Y OBTIENE EL LOCALSTORAGE DE CARRITO*/
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

//Eliminar Productos del Carrito
const tachitoProducto = (e) => {
  let id = e.target.id
  let index = carrito.findIndex(producto => producto.id == id)
  carrito.splice(index, 1)
  localStorage.setItem('carrito', JSON.stringify(carrito))
  actualizarCarrito(carrito)

        Toastify({
          text: "Producto Eliminado",
          duration: 2000,
          newWindow: true,
          close: true,
          gravity: "top", 
          position: "right", 
          stopOnFocus: true, 
          style: {
            background: "red",
          },
          onClick: function(){} 
        }).showToast();
  }



/*BOTON SIMULAR COMPRA Y SUS ALERTAS*/
botonComprar.addEventListener('click', () => {
    
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Confirmar Compra?',
    text: "no puede cancelar si confirma!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        'Compra Confirmada',
        'se realizo la compra :)',
        'success'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Compra Cancelada',
        'cancelo su compra :(',
        'error'
      )
    }
  })

});

/* CODIGO DEL MODAL*/
const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]


botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
});
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
});

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')

});
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation() 
});














