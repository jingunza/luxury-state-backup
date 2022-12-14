const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      /*-------------------------------  INICIO DE LOS LISTADOS (CASI) ESTATICOS PARA OPCTIONS DE LOS SELECT --------------------------------*/
      listaprovincias: [],
      listacomunidades: [
        {
          Andalucía: [
            "Almería",
            "Cádiz",
            "Córdoba",
            "Granada",
            "Huelva",
            "Jaén",
            "Málaga",
            "Sevilla",
          ],
        },
        { Aragón: ["Huesca", "Teruel", "Zaragoza"] },
        { Asturias: ["Oviedo"] },
        { Baleares: ["Palma de Mallorca"] },
        {
          Canarias: ["Santa Cruz de Tenerife", "Las Palmas de Gran Canaria"],
        },
        { Cantabria: ["Santander"] },
        {
          "Castilla-La Mancha": [
            "Albacete",
            "Ciudad Real",
            "Cuenca",
            "Guadalajara",
            "Toledo",
          ],
        },
        {
          "Castilla y León": [
            "Ávila",
            "Burgos",
            "León",
            "Salamanca",
            "Segovia",
            "Soria",
            "Valladolid",
            "Zamora",
          ],
        },
        { Cataluña: ["Barcelona", "Gerona", "Lérida", "Tarragona"] },
        {
          "Comunidad Valenciana": [
            "Alicante",
            "Castellón de la Plana",
            "Valencia",
          ],
        },
        { Extremadura: ["Badajoz", "Cáceres"] },
        { Galicia: ["La Coruña", "Lugo", "Orense", "Pontevedra"] },
        { "La Rioja": ["Logroño"] },
        { Madrid: ["Madrid"] },
        { Murcia: ["Murcia"] },
        { Navarra: ["Pamplona"] },
        { "País Vasco": ["Vizcaya", "Guipuzcoa", "Alaba"] },
      ],
      /*----------------------------------  FIN DE LOS LISTADOS (CASI) ESTATICOS PARA OPCTIONS DE LOS SELECT --------------------------------*/

      /*---------------------------- INICIO DE LA DATA SIMULADA DE API PARA PRUEBAS ANTES DE IMPLEMENTAR FETCH ------------------------------*/
      body_request: {},
      body_response: "buscando coincidencias...",

      /*---------------------------- FIN DE LA DATA SIMULADA DE API PARA PRUEBAS ANTES DE IMPLEMENTAR FETCH ---------------------------*/

      /*--------------------------------------- INICIO DE LAS VARIABLES DE FILTROS ------------------------------------------------------*/
      operacion: "todas", // este dato va si o si en el fetch get
      comunidad: "todas",
      provincia: "todas",
      preciomin: 0,
      preciomax: 999999999,
      vista: "listado",
      vivienda_piso: false,
      vivienda_chalet: false,
      vivienda_villa: false,
      caracteristica_pet: false,
      caracteristica_garage: false,
      caracteristica_piscina: false,
      caracteristica_terraza: false,
      habitaciones: "cualquiera",
      baños: "cualquiera",
      /*------------------------------------------ FIN DE LAS VARIABLES DE FILTROS -----------------------------------------------------*/
    },
    //
    actions: {
      //
      createRequest: () => {
        const store = getStore();
        let aux = {};
        aux["operacion"] = store.operacion;
        aux["comunidad"] = store.comunidad;
        aux["provincia"] = store.provincia;
        // store.preciomin >= store.preciomax
        //   ? (aux["preciomin"] = 0)
        aux["preciomin"] = store.preciomin;
        // store.preciomax <= store.preciomin
        //   ? (aux["preciomax"] = 999999999)
        aux["preciomax"] = store.preciomax;
        aux["vivienda_piso"] = store.vivienda_piso;
        aux["vivienda_chalet"] = store.vivienda_chalet;
        aux["vivienda_villa"] = store.vivienda_villa;
        aux["caracteristica_pet"] = store.caracteristica_pet;
        aux["caracteristica_garage"] = store.caracteristica_garage;
        aux["caracteristica_piscina"] = store.caracteristica_piscina;
        aux["caracteristica_terraza"] = store.caracteristica_terraza;
        aux["habitaciones"] = store.habitaciones;
        aux["baños"] = store.baños;
        setStore({ body_request: aux });
      },

      clearResponse: () => {
        const store = getStore();
        setStore({ body_response: "buscando coincidencias..." });
      },

      /*------------------------------- INICIO DE LAS FUNCIONES DE EVENTOS PARA LOS FILTROS --------------------------------------------*/

      // selectores que estan en Home y Aside (dashboard):

      updateOperacion: (e) => {
        // funcion onChange de Select
        setStore({ operacion: e.target.value });
        setStore({ preciomin: 0 });
        setStore({ preciomax: 999999999 });
        getActions().fillLocalStorage();
      },
      updateComunidad: (e) => {
        // funcion onChange de Select
        const store = getStore();
        setStore({ comunidad: "todas" });
        setStore({ provincia: "todas" });
        setStore({ comunidad: e.target.value });

        let comunidad = store.comunidad;
        let provincias = [];
        for (let x of store.listacomunidades) {
          if (x[comunidad]) {
            provincias = x[comunidad];
          }
        }
        setStore({ listaprovincias: provincias });
        getActions().fillLocalStorage();
      },
      updateProvincia: (e) => {
        // funcion onChange de Select
        setStore({ provincia: e.target.value });
        getActions().fillLocalStorage();
      },
      updatePreciomin: (e) => {
        // funcion onChange de Select
        const store = getStore();
        if (e.target.value == "Mín") {
          setStore({ preciomin: 0 });
        } else if (e.target.value >= store.preciomax) {
          setStore({ preciomin: e.target.value });
          setStore({ preciomax: 999999999 });
        } else {
          setStore({ preciomin: e.target.value });
        }
        getActions().fillLocalStorage();
      },
      updatePreciomax: (e) => {
        // funcion onChange de Select
        const store = getStore();
        if (e.target.value == "Máx") {
          setStore({ preciomax: 999999999 });
        } else if (e.target.value <= store.preciomin) {
          setStore({ preciomax: e.target.value });
          setStore({ preciomin: 0 });
        } else {
          setStore({ preciomax: e.target.value });
        }
        getActions().fillLocalStorage();
      },

      // selectores que solo estan en Aside:

      // funcion de checkbox
      updateViviendaPiso: () => {
        const store = getStore();
        if (store.vivienda_piso == true) {
          setStore({ vivienda_piso: false });
        } else {
          setStore({ vivienda_piso: true });
        }
        getActions().fillLocalStorage();
      },
      // funcion de checkbox
      updateViviendaChalet: () => {
        const store = getStore();
        if (store.vivienda_chalet == true) {
          setStore({ vivienda_chalet: false });
        } else {
          setStore({ vivienda_chalet: true });
        }
        getActions().fillLocalStorage();
      },
      // funcion de checkbox
      updateViviendaVilla: () => {
        const store = getStore();
        if (store.vivienda_villa == true) {
          setStore({ vivienda_villa: false });
        } else {
          setStore({ vivienda_villa: true });
        }
        getActions().fillLocalStorage();
      },
      // funcion de checkbox (IMPORTANTE: una caracteristica en valor True NO excluirá a las otras caracteristicas en el filtrado en API)
      updateCaracteristicaPet: () => {
        const store = getStore();
        if (store.caracteristica_pet == true) {
          setStore({ caracteristica_pet: false });
        } else {
          setStore({ caracteristica_pet: true });
        }
        getActions().fillLocalStorage();
      },
      // funcion de checkbox (IMPORTANTE: una caracteristica en valor True NO excluirá a las otras caracteristicas en el filtrado en API)
      updateCaracteristicaGarage: () => {
        const store = getStore();
        if (store.caracteristica_garage == true) {
          setStore({ caracteristica_garage: false });
        } else {
          setStore({ caracteristica_garage: true });
        }
        getActions().fillLocalStorage();
      },
      // funcion de checkbox (IMPORTANTE: una caracteristica en valor True NO excluirá a las otras caracteristicas en el filtrado en API)
      updateCaracteristicaPiscina: () => {
        const store = getStore();
        if (store.caracteristica_piscina == true) {
          setStore({ caracteristica_piscina: false });
        } else {
          setStore({ caracteristica_piscina: true });
        }
        getActions().fillLocalStorage();
      },
      // funcion de checkbox (IMPORTANTE: una caracteristica en valor True NO excluirá a las otras caracteristicas en el filtrado en API)
      updateCaracteristicaTerraza: () => {
        const store = getStore();
        if (store.caracteristica_terraza == true) {
          setStore({ caracteristica_terraza: false });
        } else {
          setStore({ caracteristica_terraza: true });
        }
        getActions().fillLocalStorage();
      },
      // funcion de checkbox  (IMPORTANTE: una option excluirá a las otras options en el filtrado en API)
      updateHabitacion: (e) => {
        const store = getStore();
        setStore({ habitaciones: e.target.value });
        getActions().fillLocalStorage();
      },
      // funcion de checkbox  (IMPORTANTE: una option excluirá a las otras options en el filtrado en API)
      updateBaño: (e) => {
        const store = getStore();
        setStore({ baños: e.target.value });
        getActions().fillLocalStorage();
      },

      /*--------------------------------------------- FIN DE LAS FUNCIONES DE LOS FILTROS --------------------------------------------*/

      /*----------------------------------- INICIO DE LAS FUNCIONES DE PESTAÑA EN EL TABLERO DE RESULTADOS ---------------------------*/
      updateOperacionAlquiler: () => {
        // funcion especial para los pills del dashboard
        const store = getStore();
        setStore({ operacion: "alquiler" });
        setStore({ preciomin: 0 });
        setStore({ preciomax: 999999999 });
      },
      updateOperacionCompra: () => {
        // funcion especial para los pills del dashboard
        const store = getStore();
        setStore({ operacion: "compra" });
        setStore({ preciomin: 0 });
        setStore({ preciomax: 999999999 });
      },
      updateVistaListado: () => {
        // funcion especial para los pills del dashboard
        const store = getStore();
        setStore({ vista: "listado" });
      },
      updateVistaMapa: () => {
        // funcion especial para los pills del dashboard
        const store = getStore();
        setStore({ vista: "mapa" });
      },
      /*------------------------------------ FIN DE LAS FUNCIONES DE PESTAÑA EN EL TABLERO DE RESULTADOS -------------------------------*/

      /*------------------------------------- INICIO DE LAS FUNCIONES DE ENTREGA Y RECUPERACION DE DATA ------------------------------ */

      fillLocalStorage: () => {
        const store = getStore();
        // funcion vuelca datos del store en LocalStorage al pasar a otra página. Se debe usar al actualizar cada filtro
        localStorage.clear();
        localStorage.setItem("operacion", store.operacion);
        localStorage.setItem("comunidad", store.comunidad);
        localStorage.setItem("provincia", store.provincia);
        localStorage.setItem("preciomin", store.preciomin);
        localStorage.setItem("preciomax", store.preciomax);
        localStorage.setItem("vista", "listado");
        localStorage.setItem("vivienda_piso", store.vivienda_piso);
        localStorage.setItem("vivienda_chalet", store.vivienda_chalet);
        localStorage.setItem("vivienda_villa", store.vivienda_villa);
        localStorage.setItem("caracteristica_pet", store.caracteristica_pet);
        localStorage.setItem(
          "caracteristica_garage",
          store.caracteristica_garage
        );
        localStorage.setItem(
          "caracteristica_piscina",
          store.caracteristica_piscina
        );
        localStorage.setItem(
          "caracteristica_terraza",
          store.caracteristica_terraza
        );
        localStorage.setItem("habitaciones", store.habitaciones);
        localStorage.setItem("baños", store.baños);
      },
      syncLocalStorageToStore: () => {
        // funcion recupera datos de LocalStorage y los guarda en el store nuevamente al cargar la página
        const store = getStore();
        setStore({ operacion: localStorage.getItem("operacion") });
        setStore({ comunidad: localStorage.getItem("comunidad") });
        setStore({ provincia: localStorage.getItem("provincia") });
        setStore({ preciomin: localStorage.getItem("preciomin") });
        setStore({ preciomax: localStorage.getItem("preciomax") });
        setStore({ vista: localStorage.getItem("vista") });
        setStore({ vivienda_piso: localStorage.getItem("vivienda_piso") });
        setStore({ vivienda_chalet: localStorage.getItem("vivienda_chalet") });
        setStore({ vivienda_villa: localStorage.getItem("vivienda_villa") });
        setStore({
          caracteristica_pet: localStorage.getItem("caracteristica_pet"),
        });
        setStore({
          caracteristica_garage: localStorage.getItem("caracteristica_garage"),
        });
        setStore({
          caracteristica_piscina: localStorage.getItem(
            "caracteristica_piscina"
          ),
        });
        setStore({
          caracteristica_terraza: localStorage.getItem(
            "caracteristica_terraza"
          ),
        });
        setStore({ habitaciones: localStorage.getItem("habitaciones") });
        setStore({ baños: localStorage.getItem("baños") });
      },
      backHome: () => {
        // esta funcion resetea los filtros al volver al home desde el nav o al refrescar el home
        const store = getStore();
        localStorage.clear();
        setStore({ comunidad: "todas" });
        setStore({ provincia: "todas" });
        setStore({ operacion: "todas" });
        setStore({ preciomin: 0 });
        setStore({ preciomax: 999999999 });
        setStore({ vista: "listado" });
        setStore({ vivienda_piso: false });
        setStore({ vivienda_chalet: false });
        setStore({ vivienda_villa: false });
        setStore({ caracteristica_pet: false });
        setStore({ caracteristica_garage: false });
        setStore({ caracteristica_piscina: false });
        setStore({ caracteristica_terraza: false });
        setStore({ habitaciones: "cualquiera" });
        setStore({ baños: "cualquiera" });
      },

      /*------------------------------------- FIN DE LAS FUNCIONES DE ENTREGA Y RECUPERACION DE DATA ------------------------------ */

      /*----------------------------------------- INICIO DE LAS FUNCIONES FETCH API -------------------------------------------------*/
      joinBodies: (arreglo1, arreglo2) => {
        const store = getStore();
        const arr1 = arreglo1;
        const arr2 = arreglo2;
        arr1.forEach((item) => (item["fotos"] = []));

        for (let i of arr1) {
          for (let j of arr2) {
            if (j["inmueble_id"] == i["id"]) {
              i["fotos"].push(j["imagen_url"]);
            }
          }
        }
        return arr1;
      },

      getProperties: async () => {
        const store = getStore();
        const request = store.body_request;
        let opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/properties",
            opts
          );
          if (resp.status != 200) {
            throw new Error("The fetch has failed");
          }
          const data = await resp.json();
          const aux1 = data["inmuebles"];
          const aux2 = data["imagenes"];
          const aux3 = getActions().joinBodies(aux1, aux2);
          setStore({ body_response: aux3 });
          console.log("this came from the backend", aux3);
        } catch (error) {
          console.log("The fetch has failed: ", error);
        }
      },

      // Use getActions to call a function within a fuction
      // exampleFunction: () => {
      //   getActions().changeColor(0, "green");
      // },

      // getMessage: async () => {
      //   try {
      //     // fetching data from the backend
      //     const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
      //     const data = await resp.json();
      //     setStore({ message: data.message });
      //     // don't forget to return something, that is how the async resolves
      //     return data;
      //   } catch (error) {
      //     console.log("Error loading message from backend", error);
      //   }
      // },
    },
  };
};

export default getState;
