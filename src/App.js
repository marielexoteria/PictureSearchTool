import React, { Component } from 'react';

//importando componentes
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';

//importando el css que contiene el código para el spinner (barra de carga)
import './App.css';


class App extends Component {
    state = {
        termino: '',
        imagenes: [],
        pagina: '',
        cargando: false,
        totalPaginas: ''
    }

    consultarAPI = async () => {
        const termino = this.state.termino; //lo que se quiere buscar
        const pagina = this.state.pagina;
        const url = `https://pixabay.com/api/?key=11712547-51967120baf062b09ea302d9a&q=${termino}&per_page=30&page=${pagina}`;
        console.log(url);

        await fetch(url)
          .then(respuesta => {
              this.setState({
                  cargando: true
              })
              return respuesta.json();
          })
          .then(resultado => {
              const totalPaginacion = Math.ceil(resultado.totalHits / 30); //para que redondee el cociente hacia el próximo número entero - se divide entre 30 porque en el URL pusimos que muestre 30 resultados por página. Si se cambia el # a desplegar, se ha de cambiar aquí también
              setTimeout(() => {
                this.setState({
                    imagenes: resultado.hits,
                    cargando: false,
                    totalPaginas: totalPaginacion
                })
              }, 2000) //si le quito el setTimeout() entonces no tengo el efecto del spinner cuando carga la página
          })
    }

    datosBusqueda = (termino) => {
        this.setState({
            termino: termino,
            pagina: 1
        }, () => { //el arrow function aquí es un callback que se va a ejecutar cuando se agregue algo al state
            this.consultarAPI(); 
        })
    }

    paginaAnterior = () => {
        let pagina = this.state.pagina;
        if (pagina === 1) return null; //para evitar números negativos y 0 en la paginación
        pagina--;
        this.setState({ //actualizando el state
            pagina //como la variable pagina y la propiedad del objeto del state se llaman igual, se pasa así, sino sería en formato objetoState: variable
        }, () => { //haciendo un callback para ejecutar la función consultarAPI y que así se desplieguen las fotos según se cambie de página
            this.consultarAPI();
            this.scroll();
        });
    }

    paginaSiguiente = () => {
        //haciendo destructuring para extraer la info que se quiere del state, puesto que tiene más de un objeto
        let {pagina} = this.state;
        const {totalPaginas} = this.state

        if (pagina === totalPaginas) return null; //para evitar que se siga dando click al botón Adelante cuando se ha llegado al fin de los resultados
        
        pagina++;
        this.setState({ //actualizando el state
            pagina //como la variable pagina y la propiedad del objeto del state se llaman igual, se pasa así, sino sería en formato objetoState: variable
        }, () => { //haciendo un callback para ejecutar la función consultarAPI y que así se desplieguen las fotos según se cambie de página
            this.consultarAPI();
            this.scroll();
        });
    }

    scroll = () => { //para que cuando se haga click en los botones de paginación, la página se muestre en el área de las fotos y no en el área de los botones
        const elemento = document.querySelector(".jumbotron");
        elemento.scrollIntoView("smooth", "start");
    }

    render() {
        const cargando = this.state.cargando;
        let resultadoCargando;

        if (cargando) {
            resultadoCargando = <div className="spinner">
                            <div className="double-bounce1"></div>
                            <div className="double-bounce2"></div>
                        </div>
        } else {
            resultadoCargando = <Resultado
                            imagenes={this.state.imagenes}
                            paginaAnterior={this.paginaAnterior}
                            paginaSiguiente={this.paginaSiguiente}
                            pagina={this.state.pagina}
                            totalPaginas={this.state.totalPaginas}
                        />
        }

        return (
            <div className="app container">
                <div className="jumbotron"> 
                    <p className="lead text-center">Buscador de Imágenes</p>
                    <Buscador 
                        datosBusqueda={this.datosBusqueda}
                    />
                </div>

                <div className="row justify-content-center">
                    {resultadoCargando}
                </div>
            </div>
        );
        //className="jumbotron" --> clase de Bootstrap (enlazado desde index.html)
        //classname="lead" --> es una clase de Bootstrao que hace que el texto sea más grande (pero no un heading de los de H1 a H6)
    }
}

export default App;
