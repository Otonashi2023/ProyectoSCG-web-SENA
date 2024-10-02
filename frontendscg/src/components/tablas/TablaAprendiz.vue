<template>
  <!--Tabla que lista todos los registros de la entidad-->
  <div class="container2">
    <h1>Aprendices</h1>
    <div id="scroll">
      <table>
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Cédula</th>
          <th>Ficha</th>
          <th>Formación</th>
          <th>Acceder a ...</th>
          <th style="color:orange">ver</th>
          <th>ImagenQR</th>
          <th id="rigth">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr id="fila2" v-for="(item,index) in aprendicesFiltrados" :key=index @click=consultarbyId(item.codigo)>
          <td><img :src="urlImagen(item.persona.foto)" alt="Foto" style="width: 60px; height: 60px" /></td>
          <td>{{ item.persona.nombres}}</td>
          <td>{{ item.persona.apellidos}}</td>
          <td>{{ item.persona.cedula }}</td>
          <td>{{ item.ficha.numero}}</td>
          <td>{{ item.ficha.formacion.nombre }}</td>
          <td style="width: 280px;"><button id="botonA" @click.stop="consultarItem1(item.codigo)">
              Antropometrico</button>
            <button id="botonB" @click.stop="consultarItem2(item.codigo)">
              Planes</button>
          </td>
          <td style="color: blueviolet; font-weight: 700; width:70px" @click.stop="abrirModal(item.codigo)">ver perfil</td>
          <td><font-awesome-icon icon="qrcode" id="agregar" @click.stop="abrirQR(item.codigo)"/></td>
          <td id="alibutton" style="width:120px;">
              <font-awesome-icon icon="edit" id="editar" @click="actualizar(item.codigo)"/>
              <font-awesome-icon icon="trash" id="eliminar" @click.stop="eliminar(item.persona?.codigo)"/>
          </td>            
        </tr>      
      </tbody>
    </table>
    </div> 
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  computed:{
      ...mapState('aprendiz',['aprendiz','aprendices']),
      ...mapState(['retorno','searchQuery']),

      aprendicesFiltrados() {
        const query = this.searchQuery;
        return this.aprendices.filter(item =>
          item.persona.nombres.toLowerCase().includes(query) ||
          item.persona.apellidos.toLowerCase().includes(query) ||
          item.persona.cedula.toString().includes(query) ||
          item.ficha.numero.toString().includes(query) ||
          item.ficha.formacion.nombre.toLowerCase().includes(query)
        );
      },
  },

  methods: {
    ...mapMutations(['clearSearchQuery']),
    ...mapActions('persona',['eliminarPersona']),
    ...mapActions('aprendiz',['consultarAllAprendices','consultarAprendiz']),

    urlImagen(value){
      const baseUrl = 'http://localhost:8080';
      const imagePreview = value
        ? `${baseUrl}${value}`
        : require('@/assets/foto150.png');
        return imagePreview;
    },
    
    async eliminar(value){
      await this.eliminarPersona(value);
      await this.$nextTick();
      this.consultarAllAprendices();
    },

    consultarbyId(value){
      this.$emit('ById', value);
    },
    actualizar(value){  
      this.$emit('change', value);
    },
    async consultarItem1(value){
      await this.consultarAprendiz(value);
      await this.$nextTick();
      console.log('aprendiz: ', this.aprendiz.codigo);
      this.$router.push('fichaAntropometrica');
    },
    async consultarItem2(value){
      await this.consultarAprendiz(value);
      await this.$nextTick();
      this.$router.push('aprendizPlan');
    },

    formulario(){
      if(this.retorno =='retorno'){
        this.$emit('goForm');
      }
    }, 
    async abrirModal(value){
        await this.consultarAprendiz(value);
        await this.$nextTick();
        const modal =true;
        this.$emit('verModal', modal);
    },
    async abrirQR(value){
      await this.consultarAprendiz(value);
      await this.$nextTick();
      const modal =true;
      this.$emit('verQR', modal);
    },     
  },
  async mounted(){
    this.clearSearchQuery();
    this.formulario();
    await this.consultarAllAprendices();
    await this.$nextTick();
    console.log('aprendices: ', this.aprendices);
  },
}
</script>