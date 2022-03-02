class Produtos{
    constructor(){
        this.Id = 1
        this.ArrayProdutos = []
        this.EditId == null
    }

    Salvar(){        
        let Produto = this.IncorporarDados()
        if(this.ValidarDados(Produto) == true){
            if(this.EditId == null){
                this.AdicionarProduto(Produto)
                this.AdicionarTabela()
            }else{
                this.Atualizar(this.EditId, Produto)
            }
        }        
        console.log(this.EditId)
        this.Somar()
        this.Cancelar()
        document.querySelector('#ProdutoName').focus()
    }

    ValidarDados(Produto){
        let msg = ''
        if(Produto.Nome == ''){
            msg += "\n - Adicione o Nome do Produto !!"
        }
        if(Produto.Valor == ''){
            msg += "\n - Adicione o Valor do Produto !!"
        }
        if(Produto.Quantidade == ''){
            msg += "\n - Adicione a Quantidade do produto !!"
        }if(msg != ""){
            alert(msg)
            return false

        }else{
            return true
        }
               
    }

    AdicionarProduto(Produto){
        this.ArrayProdutos.push(Produto)
        this.Id++
        console.log(this.ArrayProdutos)
    }

    IncorporarDados(){
        let Produto = {}
        Produto.Id = this.Id
        Produto.Nome = document.querySelector('#ProdutoName').value
        Produto.Valor = document.querySelector('#ProdutoValor').value
        Produto.Quantidade = document.querySelector('#ProdutoQuantidade').value
        return Produto        
    }

    AdicionarTabela(){
        let Tbody = document.querySelector('#Tbody')
        Tbody.innerText = ""
        for(let i = 0; i<this.ArrayProdutos.length; i++){
            let tr = Tbody.insertRow();
            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_quant = tr.insertCell();
            let td_valoruni = tr.insertCell();
            let td_valorall = tr.insertCell();
            let td_acao = tr.insertCell();
            td_acao.setAttribute('class', 'Icon')
            td_acao.innerHTML = '<i class="fa-solid fa-pen-to-square" id="'+`Edit${i}`+'"></i><i class="fa-solid fa-xmark" onclick="produtos.Deletar('+this.ArrayProdutos[i].Id+')"></i>'
            td_id.textContent = this.ArrayProdutos[i].Id
            td_produto.textContent = this.ArrayProdutos[i].Nome
            td_quant.textContent = this.ArrayProdutos[i].Quantidade
            td_valoruni.textContent = "R$ "   
            td_valorall.textContent = "R$ "   
            td_valoruni.textContent += this.ArrayProdutos[i].Valor
            td_valorall.textContent += this.ArrayProdutos[i].Valor * this.ArrayProdutos[i].Quantidade
            if(this.ArrayProdutos[i].Valor % 1 ==0){
                td_valoruni.textContent += ",00"
            }
            if((this.ArrayProdutos[i].Valor * this.ArrayProdutos[i].Quantidade) % 1 ==0){
                td_valorall.textContent += ",00"
            }         
            document.querySelector(`#Edit${i}`).setAttribute("onclick", "produtos.Editar("+ JSON.stringify(this.ArrayProdutos[i]) +")")  

            
        }
    }

    Somar(){
        let ValorFinal = 0
        let Real = "R$ "        
        for (let i=0; i<this.ArrayProdutos.length; i++){            
            let Valor = Number(this.ArrayProdutos[i].Valor * this.ArrayProdutos[i].Quantidade )          
            ValorFinal += Valor          
        }
        if(isNaN(ValorFinal)){
            ValorFinal = 0
        }
        if(ValorFinal %1 == 0){
            ValorFinal.toFixed(2)
            Math.round(ValorFinal *100 )/100
            ValorFinal += ".00"
        }
        console.log(Real + ValorFinal)        
        document.querySelector("#Total").textContent = Real + ValorFinal
        
        return ValorFinal
    }
    LimparTudo(){
        if(confirm("Deseja mesmo apagar todos os Dados da Tabela??")){
            this.ArrayProdutos.length = 0
            let Tbody = document.querySelector('#Tbody')
            Tbody.innerText = ""
            this.Id = 1
            this.Somar()
            document.querySelector('#ProdutoName').focus()
        }
    }
    Cancelar(){
        document.querySelector('#ProdutoName').value = ''
        document.querySelector('#ProdutoValor').value = ''
        document.querySelector('#ProdutoQuantidade').value = ''
        document.querySelector('#ProdutoName').focus()
        document.querySelector('#btn1').innerText = "Salvar"
        this.EditId = null
    }
    Deletar(Id){
        if(confirm("Deseja Realmente deletar o produto " + Id + "?")){
            let Tbody = document.querySelector('#Tbody')
            for(let i=0; i< this.ArrayProdutos.length; i++){
                if(this.ArrayProdutos[i].Id == Id){
                    this.ArrayProdutos.splice(i, 1)
                    Tbody.deleteRow(i)
                    this.RestaurarId()
                }
            }
        }
        this.Somar()
    }
    Editar(dados){
        this.EditId = dados.Id
        console.log("---------------------------------------")
        console.log(this.EditId)
        console.log(dados)
        console.log("---------------------------------------")
        document.querySelector("#ProdutoName").value = dados.Nome
        document.querySelector("#ProdutoValor").value =dados.Valor
        document.querySelector('#ProdutoQuantidade').value = dados.Quantidade
        document.querySelector('#btn1').textContent = "Atualizar"
    }
    Atualizar(Id, produto){
        for(let i=0; i< this.ArrayProdutos.length; i++){
            if(this.ArrayProdutos[i].Id == Id){
                this.ArrayProdutos[i].Nome = produto.Nome
                this.ArrayProdutos[i].Valor = produto.Valor
                this.ArrayProdutos[i].Quantidade = produto.Quantidade
                console.log("---------------------------------------")
                console.log(this.ArrayProdutos)
                console.log("---------------------------------------")
                this.AdicionarTabela()
            }
        }
    }
    RestaurarId(){
        console.log(this.ArrayProdutos.length)
        for(let i = 0; i<this.ArrayProdutos.length; i++){
            this.ArrayProdutos[i].Id = i+1
        }
        this.AdicionarTabela()
        this.Id = this.ArrayProdutos.length+1
    }
}

const produtos = new Produtos()

document.addEventListener('keypress', function(e){
    if(e.keyCode == 13){
        produtos.Salvar()
    }
})