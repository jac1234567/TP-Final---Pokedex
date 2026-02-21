<template>
  <div>
    <div class="search-container">
      <input 
        v-model="store.textoBusqueda" 
        placeholder="Buscar pokemon por nombre..." 
        class="search-input"
      >
    </div>

    <div class="pokemon-grid">
      <div v-for="p in store.pokemonesFiltrados" :key="p.id" class="pokemon-card">
        <h3>{{ p.id }} - {{ p.name }}</h3>
        <img :src="p.sprite" :alt="p.name">
        <p>Tipos: {{ p.tipos.join(', ') }}</p>
        <button 
          :class="['btn-elegir', esSeleccionado(p.id) ? 'btn-quitar' : '']" 
          @click="store.guardarPokemon(p)"
        >
          {{ esSeleccionado(p.id) ? 'Quitar' : 'Elegir' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { PokemonPinia } from '@/stores/Pinia_Pokemon.js'

const store = PokemonPinia()

const esSeleccionado = (id) => {
    return store.seleccionados.some(p => p.id === id)
}

onMounted(() => {
    if (store.listaPokemon.length === 0) {
        store.traerDatos()
    }
})
</script>

<style scoped>
.search-container { 
  text-align: center; 
  margin: 20px 
}
.search-input { 
  padding: 10px; width: 300px;
  border-radius: 5px;
  border: 1px solid #ccc 
}
.pokemon-grid { 
  display: flex; 
  flex-wrap: wrap; 
  justify-content: center; 
  gap: 20px 
}
.pokemon-card { 
  background: white; 
  border-radius: 10px; 
  padding: 15px; 
  width: 160px; 
  text-align: center; 
  box-shadow: 0 4px 8px rgba(0,0,0,0.1) 
}
.btn-elegir { 
  background: #ffcb05; 
  border: none; 
  padding: 5px 15px; 
  cursor: pointer; 
  font-weight: bold; 
  border-radius: 5px 
}
.btn-quitar { 
  background: #ee1515; 
  color: white
}
</style>