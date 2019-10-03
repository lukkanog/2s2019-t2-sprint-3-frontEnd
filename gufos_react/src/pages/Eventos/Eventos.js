import React,{Component} from "react";
import Rodape from "../../components/Rodape/Rodape";
import logo from "../../assets/img/icon-login.png"
import Axios from "axios";
import Moment from 'react-moment';


import Titulo from "../../components/Titulo/Titulo";


export default class Eventos extends Component{
    
    constructor(){
        super();
        this.state = {
            lista : [],
            categorias : [],
            
            titulo:"",
            localizacao:"",
            data:"",
            descricao:"",
            idCategoria:"",
            ativo : false
        }
    }

    atualizarTitulo = (event) =>{
        event.preventDefault();
        this.setState({titulo : event.target.value});
        console.log(this.state)
    }

    atualizarLocalizacao = (event) =>{
        event.preventDefault();
        this.setState({localizacao : event.target.value});
    }

    atualizarData = (event) =>{
        event.preventDefault();
        this.setState({data : event.target.value});


        // let dia = JSON.stringify(event.target.value,);
        // console.log(dia)
        // let stringData = dia.getFullYear().toString() +"-"+ dia.getMonth().toString() +"-"+ dia.getFullYear().toString() +"-"+ dia.getDate().toString() +"T"+dia.getHours().toString() +":"+ dia.getMinutes().toString()  +":"+ dia.getSeconds().toString() 

        // console.log(this.state.data)
    }

    atualizarDescricao = (event) =>{
        event.preventDefault();
        this.setState({descricao : event.target.value});
    }

    atualizarCategoria = (event) =>{
        event.preventDefault();
        this.setState({idCategoria : event.target.value});
    }

    atualizarAtivo = (event) =>{
        event.preventDefault();
        this.setState({ativo : event.target.value});
    }
    



    cadastrarCategoria = () =>{
        console.log(this.state);

        Axios.post("http://192.168.7.85:5000/api/eventos",{
            titulo : this.state.titulo,
            descricao: this.state.descricao,
            // dataEvento: this.state.data,
            dataEvento : "2020-12-20T00:00:00",
            localizacao:this.state.localizacao,
            idCategoria:this.state.idCategoria,
            ativo : this.state.ativo
        })
        .then(response => console.log(response.status))
    }


    componentDidMount(){
        Axios.get("http://192.168.7.85:5000/api/eventos")
            .then(data => {
                this.setState({lista : data.data})
            })
            .catch(erro => console.log(erro))

        Axios.get("http://192.168.7.85:5000/api/categorias")
            .then(response => {
                this.setState({categorias : response.data})
            })
            .catch(erro => console.log(erro))

            
    }//didMount
    
    render(){
        return(
            <div>
                <header className="cabecalhoPrincipal">
                    <div className="container">
                    <img src={logo} />

                    <nav className="cabecalhoPrincipal-nav">
                        Administrador
                    </nav>
                    </div>
                </header>

                <main className="conteudoPrincipal">
                    <section className="conteudoPrincipal-cadastro">
                        <Titulo titulo="Eventos"/>
                        <div className="container" id="conteudoPrincipal-lista">

                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Evento</th>
                                        <th>Data</th>
                                        <th>Acesso Livre</th>
                                        <th>Tipo do Evento</th>
                                    </tr>
                                </thead>

                                <tbody id="tabela-lista-corpo">
                                    {
                                        this.state.lista.map(element =>{
                                            return(
                                                <tr>
                                                    <td>{element.idEvento}</td>
                                                    <td>{element.titulo}</td>
                                                    <td>{element.dataEvento}</td>
                                                    <td>{element.ativo ? "Ativo" : "Inativo"}</td>
                                                    <td>{element.idCategoriaNavigation.nome}</td>   
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                        </div>

                        <div className="container" id="conteudoPrincipal-cadastro">
                            <h2 className="conteudoPrincipal-cadastro-titulo">Cadastrar Evento</h2>
                            <div className="container">

                                <input onInput={this.atualizarTitulo} type="text" id="evento__titulo" placeholder="título do evento" />
                                <input onInput={this.atualizarLocalizacao} type="text" id="evento__localizacao" placeholder="localização"/>
                                <input  onInput={this.atualizarData} type="text" id="evento__data" placeholder="dd/MM/yyyy"/>
                                <select id="option__acessolivre" onChange={this.atualizarAtivo}>
                                    <option disabled selected>Selecione</option>
                                    <option value="true">Ativo</option>
                                    <option value="false">Desativo</option>
                                </select>

                                <select id="option__tipoevento" onChange={this.atualizarCategoria}>
                                    <option  disabled selected>Categoria do Evento</option>
                                    {this.state.categorias.map(element =>{
                                        return(
                                            <option value={element.idCategoria}>{element.nome}</option>
                                        )
                                    })}

                                </select>
                                <textarea onInput={this.atualizarDescricao} rows="3" cols="50" placeholder="descrição do evento" id="evento__descricao"></textarea>

                            </div>
                            <button  onClick={this.cadastrarCategoria} className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro">Cadastrar</button>
                        </div>
                    </section>
                </main>

                <Rodape/>
            </div>
        )
    }

}
// export default Eventos;