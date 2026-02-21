<template>
  <div class="equipo-container">
    <h2>Equipo Seleccionado ({{ store.seleccionados.length }}/6)</h2>
    <div class="pokemon-grid">
      <div v-for="p in store.seleccionados" :key="p.id" class="pokemon-card">
        <h3>{{ p.id }} - {{ p.name }}</h3>
        <img :src="p.sprite">
        <button @click="store.guardarPokemon(p)" class="btn-quitar-min">X</button>
      </div>
    </div>

    <div class="form-guardar" v-if="store.seleccionados.length > 0">
      <input v-model="nombreEquipo" class="input-equipo" placeholder="Nombre del equipo">
      <button @click="guardarEnBD" class="btn-guardar">Guardar Equipo</button>
    </div>
    <hr class="divisor">
    <h2>Historial de Equipos</h2>
    <button @click="cargarHistorial" class="btn-cargar">Actualizar Historial</button>
    <br><br>
    <div class="tabla-equipos">
      <div v-for="e in listaBD" :key="e.id" class="fila-equipo">
        <strong>{{ e.nombre }}</strong>
        <span>{{ new Date(e.fecha_creacion).toLocaleDateString() }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { PokemonPinia } from '@/stores/Pinia_Pokemon.js'

const store = PokemonPinia()
const nombreEquipo = ref('')
const listaBD = ref([])

const guardarEnBD = async () => {
    if (!nombreEquipo.value) return alert("Falta un nombre al equipo")
    await axios.post('http://localhost:3000/api/guardar', {
        nombre: nombreEquipo.value,
        pokemones: store.seleccionados
    })
    alert("Equipo guardado!")
    cargarHistorial()
}

const cargarHistorial = async () => {
    const res = await axios.get('http://localhost:3000/api/listado')
    listaBD.value = res.data
}

onMounted(cargarHistorial)
</script>

<style scoped>
.equipo-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 25px;
  color: #3b4cca;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
  justify-items: center;
}

.pokemon-card {
  background: white;
  border-radius: 15px;
  padding: 15px;
  width: 140px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  position: relative;
  border: 1px solid #e0e0e0;
}

.pokemon-card:hover {
  transform: translateY(-5px);
}

.pokemon-card h3 {
  font-size: 1rem;
  margin: 10px 0;
  text-transform: capitalize;
}

.pokemon-card img {
  width: 90px;
  height: 90px;
}

.btn-quitar-min {
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  position: absolute;
  top: -10px;
  right: -10px;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.btn-quitar-min:hover {
  background: #cc0000;
}

.form-guardar {
  margin: 30px 0;
  background: #f8f9fa;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  align-items: center;
}

.input-equipo {
  padding: 12px 15px;
  border-radius: 8px;
  border: 2px solid #ddd;
  width: 280px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.input-equipo:focus {
  outline: none;
  border-color: #3b4cca;
}

.btn-guardar {
  background-color: #3b4cca;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s, transform 0.2s;
}

.btn-guardar:hover {
  background-color: #2a38a3;
  transform: scale(1.02);
}

.divisor {
  margin: 50px 0;
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, transparent, #ccc, transparent);
}

.historial-container {
  margin-top: 20px;
}

.btn-cargar {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 25px;
  transition: opacity 0.8s;
}

.btn-cargar:hover {
  opacity: 0.9;
}

.tabla-equipos {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.fila-equipo {
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.2s;
}

.fila-equipo:last-child {
  border-bottom: none;
}

.fila-equipo:hover {
  background-color: #fcfcfc;
}

.fila-equipo strong {
  color: #333;
  font-size: 1.1rem;
}

.fila-equipo span {
  color: #7f8c8d;
  font-size: 0.9rem;
  font-style: italic;
}
</style>