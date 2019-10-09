import React,{Component} from 'react';
import logo from "./icon.png";
import './App.css';

export default class App extends Component{
  constructor(){
    super();
    this.state = {
      listaRepositorios : [],
      nomeProcurado : "",
      erro : "",
    }
  }

  atualizarEstadoNome = (event) =>{
    event.preventDefault();
    this.setState({nomeProcurado : event.target.value});
  }

  procurarUsuario =(event)=> {
    event.preventDefault();

    let url = "https://api.github.com/users/"+this.state.nomeProcurado+"/repos";
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
      data.message == null ? this.setState( { listaRepositorios : data, erro : ""} ) : this.setState({erro : data.message})
    })
    .catch(error => console.log(error))
  }
  
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <div id="logo_fundo">
            <img src ={logo}/>
          </div>
          <h1>GitHub - Repositórios</h1>
        </header>
        <main>
          <form id="username_form">
              <label>Usuário procurado <br/>
                <input onChange={this.atualizarEstadoNome} type="text" id="username_input" placeholder=" username"/>
              </label>
              <input onClick={this.procurarUsuario} type="submit" value="Procurar" id="username_submit"/>
          </form>
          { this.state.erro === "" && this.state.listaRepositorios != null?
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Data de criação</th>
                  <th>Tamanho</th>
                </tr>
              </thead>
              <tbody>
                {this.state.listaRepositorios.map(element =>{
                  return(
                    <tr class="linha_tabela">
                          <td key={element.id}>{element.id}</td>
                          <td>{element.name}</td>
                          <td>{element.description}</td>
                          <td>{element.created_at}</td>
                          <td>{element.size}</td>
                      </tr>
                  )
                })}
              </tbody>
            </table>
            :
            <h2>Erro : {this.state.erro}</h2>
          }
        </main>
      </div>
    );
  }
}

