import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";

test('App.vue muestra el titulo de las notas dentro de una lista | Asegúrate de que App.vue defina en su función data la propiedad "notas", y que por cada elemento se despliegue un boton con el titulo de la nota', () => {
  const notas = [{ titulo: "testing 12", contenido: "Contenido 1" }, { titulo: "testing 3", contenido: "Contenido 1" }];

  const wrapper = shallowMount(App, {
    data() {
      return {
        notas,
        notaActual: null
      };
    }
  });

  const listItems = wrapper.findAll("li");

  for (let i = 0; i < listItems.length; i++) {
    const item = listItems[i];
    const button = item.find('button');
    expect(button.text()).toBe(notas[i].titulo);
  }
});

test('App.vue muestra "No hay notas guardadas" cuando el arreglo de notas está vacío | Asegúrate de que App.vue muestre un <p> con "No hay notas guardadas" cuando el arreglo de notas se encuentre vacío', () => {
  const notas = [];

  const wrapper = shallowMount(App, {
    data() {
      return {
        notas,
        notaActual: null
      };
    }
  });

  const p = wrapper.get("p");

  expect(p.text().toLowerCase()).toBe('no hay notas guardadas');
});

test('App.vue muestra la nota actual cuándo es seleccionada | Asegúrate de que por cada nota, se despliegue un boton que, al presionarlo asigne la variable notaActual a la nota seleccionada', async () => {
  const notas = [{ titulo: "testing 12", contenido: "Contenido 1" }, { titulo: "testing 2", contenido: "Contenido 4" }];

  const wrapper = shallowMount(App, {
    data() {
      return {
        notas,
        notaActual: null
      };
    }
  });

  const buttons = wrapper.findAll('button');

  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    await button.trigger('click');
    expect(wrapper.find('p').text().toLowerCase()).toBe(notas[i].contenido.toLowerCase());
    expect(wrapper.find('h2').text().toLowerCase()).toBe(notas[i].titulo.toLowerCase());
  }
});


test('App.vue no muestra información de la notaActual hasta que algún boton haya sido apretado | Asegúrate de que App.vue despliegue la información de la notaActual SOLO si notaActual se encuentra definida', async () => {
  const notas = [{ titulo: "testing 12", contenido: "Contenido 1" }, { titulo: "testing 2", contenido: "Contenido 4" }];

  const wrapper = shallowMount(App, {
    data() {
      return {
        notas,
        notaActual: null
      };
    }
  });

  expect(wrapper.find('h2').exists()).toBe(false);
  expect(wrapper.find('p').exists()).toBe(false);
});
