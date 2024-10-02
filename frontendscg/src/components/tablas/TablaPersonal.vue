<template>
    <!--Tabla que lista todos los registros de la entidad-->
  <div class="container2">
    <h1>lista funcionarios</h1>
    <div id="scroll">
      <table>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>#Identificación</th>
            <th>Telefono</th>
            <th>Correo</th>
            <th>cargo</th>
            <th>Ver</th>
            <th id="rigth">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr id="fila2" v-for="(item, index) in personalAllFiltrados" :key="index" @click="() => {callMetodoP(item.personal.codigo); consultar(item.codigo);}">
            <td><img :src="urlImagen(item.personal.persona.foto)" alt="Foto" style="width: 60px; height: 60px;" /></td>
            <td>{{ item.personal.persona.nombres}}</td>
            <td>{{ item.personal.persona.apellidos }}</td>
            <td>{{ item.personal.persona.cedula }}</td>
            <td>{{ item.personal.persona.celular }}</td>
            <td>{{ item.personal.persona.correo }}</td>
            <td>{{ item.personal.cargo.nombre }}</td>
            <td style="color: blueviolet; font-weight: 700;width:80px" @click.stop="abrirModal(item.codigo)">ver perfil</td>
            <td id="alibutton" style="width:120px;">
                <font-awesome-icon icon="edit" id="editar" @click="actualizar($event, item.codigo)"/>
                <font-awesome-icon icon="trash" id="eliminar" @click="eliminar($event, item.personal?.persona?.codigo)"/>
            </td>            
          </tr>      
        </tbody>
    </table>
    </div>      
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default{
    computed:{
      ...mapState('personal',['personal']),
      ...mapState('usuario',['usuarios']),
      ...mapState(['retorno2','retorno3','searchQuery']),

      personalAllFiltrados() {
        const query = this.searchQuery;
        return this.usuarios.filter(item =>
          item.personal.persona.nombres.toLowerCase().includes(query) ||
          item.personal.persona.apellidos.toLowerCase().includes(query) ||
          item.personal.persona.cedula.toString().includes(query) ||
          item.personal.cargo.nombre.toLowerCase().includes(query) ||
          item.personal.persona.celular.toString().includes(query) ||
          item.personal.persona.correo.toLowerCase().includes(query)
        );
      },
    },
    methods:{
      ...mapMutations(['clearSearchQuery']),
      ...mapActions('persona',['eliminarPersona']),
      ...mapActions('personal',['consultarPersonal']),
      ...mapActions('usuario',['consultarAllUsuarios']),

      urlImagen(value){
      const baseUrl = 'http://localhost:8080';
      const imagePreview = value
        ? `${baseUrl}${value}`
        : require('@/assets/foto150.png');
        return imagePreview;
    },

      async eliminar(event, value){
        event.stopPropagation();
        await this.eliminarPersona(value);
        this.consultarAllUsuarios();
      },

      actualizar(event, value){
        event.stopPropagation();
        this.$emit('change',value);
      },

      consultar(value){
        this.$emit('ById', value);
      },

      async callMetodoP(value){
        if(this.retorno3 == 'retorno'){
          await this.consultarPersonal(value);
          await this.$nextTick();
          this.$router.push('fichaAntropometrica');
        }
      },
      formulario(){
        console.log('aqui en tabla personal', this.retorno2);
        if(this.retorno2=='retorno'){
          this.$emit('goForm');
        }
      },
      async abrirModal(value){
        await this.consultarPersonal(value);
        const modal =true;
        this.$emit('verModal', modal);
      },
    },
    mounted(){
      this.clearSearchQuery();
      this.consultarAllUsuarios();
      this.formulario();
    }
}

</script>