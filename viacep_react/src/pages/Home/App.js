import React,{Component} from 'react';
import './App.css';
import Axios from 'axios';

class App extends Component {
  
  constructor(){
    super();
    this.state ={
      cepProcurado:"",
      cep:"",
      logradouro:"", 
      complemento:"", 
      bairro:"", 
      localidade:"", 
      uf:"", 
      erro:false
    }
  }// morte do bob o construtor

  procurarCep = (event)=>{
    event.preventDefault();
    
    //#region GET CEP

        var url = "https://viacep.com.br/ws/"+ this.state.cepProcurado + "/json/";
        fetch(url)
        .then(resposta => resposta.json())
        .then(x => this.setState({
          cep : x.cep,
          logradouro : x.logradouro,
          complemento : x.complemento,
          bairro : x.bairro,
          localidade : x.localidade,
          uf : x.uf,
          erro : x.erro
        }))
        .catch(error => console.log(error))
      
    //#endregion
  
    //#region POST CEP
        // var urlPost = "https://cors-anywhere.herokuapp.com//localhost:5000/api/endereco";
        // var urlPost = "http://192.168.3.28 :5000/api/endereco";
        var urlPost = "http://localhost:5000/api/endereco";
        
        Axios.post(urlPost,{ 
          nome : "fotossintese",
          logradouro : this.state.logradouro,
          complemento : this.state.complemento,
          bairro : this.state.bairro,
          localidade :this.state.localidade, 
          uf :this.state.uf,
          cep :this.state.cep, 
        
        })
        .then(response => {
          response.status === 200 ? console.log(this.state) : console.log("deu ruim")
        }).catch(erro => console.log(erro))
        
      //#endregion
  }


  atualizarCepProcurado = (event) =>{
    event.preventDefault();
    this.setState({
      cepProcurado : event.target.value
    });
    // console.log(this.state)
  }
  
  render()
  {
      return (
        <div className="App">
        <h1>Via Cep =)</h1>

        <form onSubmit={this.procurarCep}>
          <label>
            Digite o CEP procurado:
            <input onInput = {this.atualizarCepProcurado} type="text" minLength="8" maxLength="8" id="input_cep"></input>
          </label>

          <input type="submit" id="submit_cep" value="Procurar"/>
        </form>

        <table id="tabela">
          <thead>
            <tr>
            <th>CEP</th>
            <th>Logradouro</th>
            <th>Complemento</th>
            <th>Bairro</th>
            <th>Localidade</th>
            <th>UF</th>
            </tr>
          </thead>
          <tbody>
            {this.state.erro === true ? 
             <tr>
             <td className="texto_erro">Não encontrado</td>
             <td className="texto_erro">Não encontrado</td>
             <td className="texto_erro">Não encontrado</td>
             <td className="texto_erro">Não encontrado</td>
             <td className="texto_erro">Não encontrado</td>
             <td className="texto_erro">Não encontrado</td>
           </tr>
            : 
              <tr>
                <td>{this.state.cep }</td>
                <td>{this.state.logradouro}</td>
                <td>{this.state.complemento}</td>
                <td>{this.state.bairro}</td>
                <td>{this.state.localidade}</td>
                <td>{this.state.uf}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
