<template>
<div class="posicion" v-if='inVisible'>
  <div class="caja">
  <!-- SIDEBAR -->
    <nav id="menu">
      <NavegacionPrincipal/>
    </nav>
    <section id="contenido">
      <div class="navegacion">
        <EncabezadoPrincipal/>
      </div>
      <div class="ventana">
        <router-view/>
      </div>  
    </section>
  </div>
</div>
<router-view v-if='outVisible'/>  
</template>

<script>
import NavegacionPrincipal from './components/NavegacionPrincipal.vue';
import EncabezadoPrincipal from './components/EncabezadoPrincipal.vue';
import { mapGetters } from 'vuex';


export default{
  components:{
    NavegacionPrincipal,
    EncabezadoPrincipal,
  },
  computed:{
    ...mapGetters(['inVisible','outVisible'])
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons+Sharp');
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
@import '@/assets/css/fonts.css';

#app {
  font-family:'Poppins';
  font-weight: 500;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #202224;
}

body{
  background-color: #4880ff;
  padding: 0%;
  margin: 0%;
}

/** INICIO DE SESION Y COMUN */
.inicio{
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
}
.login{
  zoom:85%;
  border-radius: 15px;
  box-shadow: 0 0px 10px rgb(196, 196, 196);
  background-color: #faf6fa;
  padding: 3rem 1rem 3.75rem 1rem;
  width: 29.5rem;
  min-height: 31.25rem;
  font-weight: bold;
}

.contenedor{
  height: auto;
}

#fila{
  display: grid;
  grid-column-gap: .1rem;
  grid-row-gap: .5rem;
  grid-template-columns: 1fr 1.5fr;
  grid-auto-rows: 1fr;  
}
.form-group{
  text-align: left;
  margin: 0px 35px 10px 35px;
}

input[type="password"],input[type="text"],input[type=email],input[type="number"],input[type="adrees"],input[type="date"]{
  margin-top: 8px;
  padding: 5px 15px 5px 15px;
  width: 364px;
  background-color: #efefef;
  height: 30px;
  border-radius: 5px;
  outline: #FFFFFF;
  border-color: var(--color-blanco);
  transition: border-color 0.3s;
}
input:focus {
      border-color: var(--color-gris-medio)
    }

p,h1{
  zoom:95%;
}

button{
  width: 60%;
  height: 40px;
  background-color: #4880ff;
  box-shadow: 0 0px 5px #18a5e2;
  border-radius: 5px;
  color: #f5f6fa;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s ease;
}
button:hover{
  background-color: var(--color-morado);
  box-shadow: 0 0px 7px #186282;
}
#parrafo{
  height: 2.5rem;
}
#text{
  margin: auto;
  text-align: justify;
  width: 370px;
}

#miAlerta {
  display: none; /* Inicialmente oculto */
            position: fixed;
            top: 17%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            background-color: #575656;
            color: white;
            border: 1px solid #646464;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(80, 80, 80, 0.357);
            z-index: 1000;
            width: 500px;
            height: 120px;
            text-align: center;
}



/** MENU PRINCIPAL */
:root {
    --color-negro: #202224;
    --color-blanco: #FFFFFF;
    --color-morado: #6226EF;
    --color-verde:#00B69B;
    --color-coral:#E45D99;
    --color-naranja: #FFAB5E; 
    --color-azul: #4880FF;
    --color-rojo: #EA0234;
    --color-gris-claro: #F5F6FA;
    --color-gris-oscuro: #A6A6A6;
    --color-gris-medio: #D5D5D5;
    --color-lila: #E0D4FC;
    --color-morado2: #7B74EC;
    --color-verde-menta: #CCF0EB;
    --color-crema: #FFEDDD;
    --color-beige: #FCD7D4;
}
.posicion{
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  place-items: center;
  min-height: 100vh;
  min-width: 100vw;
}
.caja{
  font-size: 90%;
  display: grid;
  grid-template-columns: auto 1fr;
  min-height: 100vh; 
  min-width: 100vw; 
}
#menu {
  font-size: 90%;
  display: grid;
  /*grid-column-gap: 0.1rem;*/
  /*grid-row-gap: .1rem;*/
  grid-template-rows: 0.1fr 0.1fr auto 0.1fr .1fr;
  /*grid-auto-rows: 0.1fr;*/
  background: var(--color-blanco);
  width: 200px;
  height: auto;
}
#menu .logo {
  padding: 7px;
  text-align: center;
  color: var(--color-negro);
}
#menu .logo img {
  width: 60px;
}
#menu h2 {
  color: var(--color-negro);
  font-size: 16px;
  margin-top: 20px;
}
#menu .items, .fondo {
  margin-top: 4px;
}
#menu .items ul,
#menu .fondo ul{
  padding: 0;
  margin: 0px;
}
#menu .items ul li,
#menu .fondo ul li {
  list-style-type: none;
  padding: 8px 10px;
  margin: 0px;
  transition: 0.3s ease;
  display: flex;  
  align-items: center;
}
#menu .items ul li:hover,
#menu .fondo ul li:hover {
  background: var(--color-azul);
  cursor: pointer;
  color: var(--color-blanco);
}
/*cambia al unisono el color del fondo y letra*/
#menu .items li:hover span,
#menu .items li:hover a,
#menu .fondo li:hover span,
#menu .fondo li:hover a  {
    color: var(--color-blanco);
}
a{
  color: var(--color-negro);
  text-decoration: none;
  padding-left: 14px;
}
a:hover{
  color: var(--color-blanco);
}
.separador {
  border-bottom:solid 1px var(--color-gris-medio);
  width:100%;
  height:30px;
}
.espacio{
  height: auto;
}
section{
  position: relative;
  background: var(--color-gris-claro);
  height: 100%;
  width: 100%;
}

#contenido .navegacion {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--color-blanco);
    padding: 15px 30px;
    position: relative;
    height: 40px;
    width: auto;
}

#contenido .navegacion .busqueda {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 0px 14px;
    background: var(--color-gris-claro);
    border: 1px solid var(--color-gris-medio);
    border-radius: 20px;
    width: auto;
}

#contenido .navegacion .busqueda span {
    margin-right: 14px;
}

#contenido .navegacion .busqueda input{
    border: none;
    outline: none;
    font-size: 14px;
    background: var(--color-gris-claro);
    margin: 0;
}
.busqueda #resetQuery{
    height: 14px;
    margin-left:14px; 
    cursor:pointer;
}

#contenido .navegacion .perfil {
    display: flex;
    justify-content: start;
    align-items: center;
}

#contenido .navegacion .perfil span {
    font-size: 16px;
    color: var(--color-morado2);
}

#contenido .navegacion .perfil img {
  margin-right: 15px;
    width: 30px;
    height: 30px;
}


/** COMPONENTES */
#form{
  height:100%;padding-bottom: 8px;
}
#simple-form {
  display: flex;
  align-items: center;
  padding: 0%;
  margin: 0%;
}
#simple-form .form-group input[type="text"], input[type="number"]{
  outline: none;
  border: 1px solid var(--color-gris-medio);
}
#simple-form #guardar {
  font-size: 90%;
  margin: 0px;
  width: 120px;
}
.comp-form-group{
  display: grid;
  grid-column-gap: 0.1rem;
  grid-row-gap: .1rem;
  grid-template-columns: auto auto auto;
  grid-auto-rows: 0.1fr;
}
.comp-form-group .form-group{
  display: grid;
  grid-column-gap: 0.1rem;
  grid-row-gap: .1rem;
  grid-template-rows: auto;
  grid-auto-rows: 0.1fr;
}
.comp-form-group .form-group #input2 {
  width: auto;
  outline: none;
  border: 1px solid var(--color-gris-medio);
}
.comp-form-group2{
  display: grid;
  grid-column-gap: 0.1rem;
  grid-row-gap: .1rem;
  grid-template-columns: auto auto;
  grid-auto-rows: 0.1fr;
}
.comp-form-group2 .form-group{
  display: grid;
  grid-column-gap: 0.1rem;
  grid-row-gap: .1rem;
  grid-template-rows: auto;
  grid-auto-rows: 0.1fr;
}
.comp-form-group2 .form-group #input2 {
  width: 220px;
  outline: none;
  border: 1px solid var(--color-gris-medio);
}

#formbutton{
  margin-top: 48px;
  margin-left: 20px;
  display: flex;
  width:250px;
  padding: 0;
}
#dist{
  display: grid;
  grid-column-gap: 0.1rem;
  grid-row-gap: .1rem;
  grid-template-columns: auto auto;
  grid-auto-rows: 0.1fr;
}
ventana{
  position: relative;
  display: grid;
  justify-content: center;
  width: 100%;
}
.container{
  border-radius: 10px;
  font-size: 90%;
  margin: .5rem;
  /*box-shadow: 0 0 10px rgba(76, 92, 164, 1);*/
  background-color: var(--color-blanco);
  padding-left: 1rem;
  padding-right: 1rem;
  height:90vh;
  max-width: 100vw;
  width: auto;
}
.containerT{
  border-radius: 10px;
  font-size: 90%;
  margin: .5rem;
  /*box-shadow: 0 0 10px rgba(76, 92, 164, 1);*/
  background-color: var(--color-blanco);
  padding-left: 1rem;
  padding-right: 1rem;
  height:70vh;
}

.container2{
  border-radius: 10px;
  font-size: 90%;
  margin: .5rem;
  padding: auto;
  /*box-shadow: 0 0 10px rgba(76, 92, 164, 1);*/
  background-color: var(--color-blanco);
  padding-left: 1rem;
  padding-right: 1rem;
  max-height: 100vh;
  height: 100%;
  width: auto;
  max-width: 100vw;
}
.containerF{
  border-radius: 10px;
  font-size: 90%;
  margin: .5rem;
  padding: auto;
  /*box-shadow: 0 0 10px rgba(76, 92, 164, 1);*/
  background-color: var(--color-blanco);
  padding-left: 1rem;
  padding-right: 1rem;
  max-height: auto;
  height: 100%;
  width: auto;
  max-width: 100vw;
}
.container h1, .container2 h1{
  padding-top: 8px;
}
 
table{
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 20px;
}

th, td{
  transition: 0.3s ease;
  text-wrap: balance;
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid var(--color-gris-medio);
}
thead{
  background-color:var(--color-morado);
  color: white;
}

.head2 td{
  background-color: var(--color-gris-claro);
  font-weight: 600;
  border-bottom:3px solid var(--color-gris-medio)
}
#space{
  width: 150px;
}
tr:hover td:nth-of-type(1n+1) {
  transition: 0.1s ease;
  background-color: var(--color-gris-medio);
  border-bottom:1px solid var(--color-gris-claro);
}
tr:hover .head2 {
  border-bottom:3px solid var(--color-gris-claro);
  color: var(--color-morado);
  font-weight: 600;
}

#scroll{
  border-radius: 8px;
  overflow-x: auto;
  overflow-y: auto;
  height: 68vh;
  max-width: 100%;
  white-space: nowrap;
}
#scroll2{
  border-radius: 8px;
  overflow-x: auto;
  overflow-y: auto;
  width: auto;
  height: 57vh;
  white-space: nowrap;
}
#scroll3{
  border-radius: 8px;
  overflow-x: auto;
  overflow-y: auto;
  width: auto;
  height: 90%;
  white-space: nowrap;
}
#scroll4{
  border-radius: 8px;
  overflow-x: auto;
  overflow-y: auto;
  min-width: auto;
  height: auto;
  white-space: nowrap;
}
#fila2{
  cursor: pointer;
}
#up{
  display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 8px;
}
#alitext{
  text-align: left;
  margin:10px 8px 0 0;
  padding-left: 1rem;

}
#agregar{
  margin: 12px 10px 0 0;
  padding: 0 8px;
  height: 30px;
  transition: 0.3s ease;
  cursor: pointer;
}
#agregar :hover{
  color: var(--color-azul);
}

#cerrar2{
  margin: 12px 10px 0 0;
  padding: 0 8px;
  height: 30px;
  transition: 0.3s ease;
  cursor: pointer;
}
#cerrar2 :hover{
  color: var(--color-rojo);
}
 #cerrar3{
  margin: 4px 0px 0 8px;
  padding: 0 8px;
  height: 25px;
  transition: 0.3s ease;
  cursor: pointer;
}
#cerrar3 :hover{
  color: var(--color-rojo);
}

#editar{
  margin: 0 9px;
  padding: 0%;
  height: 25px;
  transition: 0.3s ease;
  cursor: pointer;
}

#editar :hover{
  color: var(--color-verde);
}
#eliminar{
  margin: 0 10px;
  padding: 0%;
  height: 25px;
  transition: 0.3s ease;
  cursor: pointer;
}

#eliminar :hover{
  color: var(--color-rojo);
}
#cancelacion{
  margin: 0 10px;
  padding: 0%;
  height: 25px;
  transition: 0.3s ease;
  cursor: pointer;
}

#cancelacion :hover{
  color: orangered;
}

#alibutton{
  text-align: right;
}

#rigth{
  text-align: right;
  padding-right: 1.3rem;
}
#cerrar{
  padding: 0 8px;
  margin: 0 10px;
  height: 30px;
  transition: 0.3s ease;
  cursor: pointer;
}
#cerrar :hover{
  color: var(--color-rojo);
  cursor: pointer;
}
#flex{
  display: flex;
  align-items: center;
}
#lista{
  margin: 12px 16px 0 16px;
  padding: 10px 8px 0 8px;
  border-radius: 10px;
  padding-left: 20px;
  text-align: left;
  font-size: 14px;
  height: 100%;
  background-color: var(--color-blanco);
  list-style-type: none;
}
#lista ul{
  list-style-type: none;
}
#listando{
  display: grid;
  grid-column-gap: 0.1rem;
  grid-row-gap: .1rem;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 0.1fr;
}

#botonA{
  color:#00B69B;
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  width: 90px;
  background: none;
  border: none;
  margin-right: 6px;
  margin-left: 6px;
  height: 30px;
}
#botonB{
  color:#4880FF;
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  width: 90px;
  background: none;
  border: none;
  margin-left: 6px;
  height: 30px;
}

</style>
