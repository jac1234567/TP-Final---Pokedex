import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const PokemonPinia = defineStore('pokemonStore', () => {
    const listaPokemon = ref([])
    const seleccionados = ref([])
    const textoBusqueda = ref('')

    const pokemonesFiltrados = computed(() => {
        return listaPokemon.value.filter(p => 
            p.name.toLowerCase().includes(textoBusqueda.value.toLowerCase())
        )
    })

    const traerDatos = async () => {
        try {
            const respuesta = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
            const promesas = respuesta.data.results.map(p => axios.get(p.url))
            const detalles = await Promise.all(promesas)
            
            listaPokemon.value = detalles.map(d => ({
                id: d.data.id,
                name: d.data.name,
                sprite: d.data.sprites.front_default,
                tipos: d.data.types.map(t => t.type.name)
            }))
        } catch (error) {
            console.error("Error al obtener pokemones:", error)
        }
    }

    function guardarPokemon(pokemon) {
        const existe = seleccionados.value.find(p => p.id === pokemon.id)
        if (existe) {
            seleccionados.value = seleccionados.value.filter(p => p.id !== pokemon.id)
        } else {
            if (seleccionados.value.length < 6) {
                seleccionados.value.push(pokemon)
            } else {
                alert("¡Equipo completo! (Máximo 6)")
            }
        }
    }

    return { 
        listaPokemon, 
        seleccionados, 
        textoBusqueda, 
        pokemonesFiltrados, 
        traerDatos, 
        guardarPokemon 
    }
})