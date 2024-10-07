function Calculadora() {
    //chama no html a classe display
    this.display = document.querySelector('.display');

    //inicia a calculadora
    this.inicia = () => {
        this.capturaCliques();// captura os clique dos botões
        this.capturaEnter(); // captura a tecla enter para realizar cálculos
    };
    // capturas os botões do display  
    this.capturaCliques = () => {
        document.addEventListener('click', event => {
            const el = event.target;
            if (el.classList.contains('btn-num')) {
                this.addNumDisplay(el);
            }
            if (el.classList.contains('btn-clear')) this.clear();
            if (el.classList.contains('btn-del')) this.del();
            if (el.classList.contains('btn-eq')) this.realizaConta();
        });
    };
    // adiciona numero ou operador ao display
    this.addNumDisplay = el => {
        //impede a colocar zero no início da conta
        if(this.impedezeronoinicio (el)){
            return;
        };
        
        this.display.value += el.innerText;
        this.display.focus();
    };
    
    // deleta o ultimo numero do display
    this.del = () => this.display.value = this.display.value.slice(0, -1);

    //limpa o display
    this.clear = () => this.display.value = '';

    //impede que coloque o numero zero no inicio da conta
    this.impedezeronoinicio = el => {
        const zeroInicio = this.display.value;
        return zeroInicio === '' && el.innerText === '0';
    };

    // Realiza os calculos
    this.realizaConta = () => {
        let conta = this.display.value;
        // avalia a expressão
        if (/^[0-9+\-*/().\s]*$/.test(conta)) {
            try {
                const resultado = Function('"use strict"; return (' + conta + ')')();
                this.display.value = String(resultado);
                this.resultadoCalculado = true; // Marca que um resultado foi calculado
            } catch (error) {
                alert("Conta inválida");
            }
        } else {
            alert("Entrada inválida");
        }
    };

    //funcionalidade da tecla enter
    this.capturaEnter = () => {
        document.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                this.realizaConta();
            }
        });
    };
}

const calculadora = new Calculadora();
calculadora.inicia();