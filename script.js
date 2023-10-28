
class Calculator {

    constructor(prevOperandText, curOperandText) {
        this.prevOperandText = prevOperandText;
        this.curOperandText = curOperandText;
        this.clear()
    }

    clear() {
        this.prevOperand = ''
        this.curOperand = ''
        this.operation = undefined
    }

    delChar() {
        // let test = "notFound"
        // if (this.curOperand.length <= 0 && this.prevOperand.length <= 0) return
           
        //      else if (this.curOperand.length <= 0 && this.prevOperand.length != 0) {
        //             test = this.prevOperand;
        //             test = test.substring(0, test.length - 1);
        //             this.prevOperand = test;
        //         } else {
        //             test = this.curOperand;
        //             test = test.substring(0, test.length - 1);
        //             this.curOperand = test;
        //         }
            
       
        // console.log(test, " ", this.prevOperand);

        this.curOperand= this.curOperand.toString().slice(0,-1)
        if(this.curOperand.toString().length <=0){
            this.operation= ''
            this.prevOperand= this.prevOperand.toString().slice(0,-1)
        }
        
    }

    appendNo(number) {
        if (number === '.' && this.curOperand.toString().includes('.')

        ) return
        this.curOperand = this.curOperand.toString() + number.toString();
        console.log(this.curOperand);
    }

    getDisplayNumber(number){
        // const floatNumber= parseFloat(number)
        // if(isNaN(floatNumber)) return '' 
        // return floatNumber.toLocaleString('en')

        const stringNumber= number.toString();
        const integerDigits= parseFloat(stringNumber.split('.')[0])
        const decimalDigits= stringNumber.split('.')[1]

        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay= ''
        }else{
            integerDisplay= integerDigits.toLocaleString('en', {maximumFractionDigits:0})

        }

        if(decimalDigits!= null){
            return `${integerDisplay}.${decimalDigits}`
        }

        return integerDisplay

    }

    updateDisplay() {
        // console.log("updated");
        // console.log(this.curOperand);
        // this.curOperandText.innerText = this.curOperand;
        // this.prevOperandText.innerText = this.prevOperand;
        // if(this.prevOperand==''){
        //     this.prevOperandText.innerText= this.prevOperand
        // }
        this.curOperandText.innerText= 
        this.getDisplayNumber(this.curOperand);
        if(this.operation!= null){
                this.prevOperand= this.prevOperand
            this.prevOperandText.innerText= 
            `${this.getDisplayNumber(this.prevOperand)}${this.operation}`
        }else{
            this.prevOperandText.innerText= ''
        }
    }

    chooseOper(operation) {
        if (this.curOperand === '') return

        if (this.prevOperand !== '') {
            this.compute()

        }
        this.operation = operation;
        this.prevOperand = this.curOperand 

        // console.log("operation", operation, " ", this.prevOperandText);
        // console.log(typeof("chooseOp",this.curOperand));
        this.curOperand = '';
        // console.log(typeof (this.operation));

    }

    compute() {

        let res
        let prev = parseFloat(this.prevOperand)
        let cur = parseFloat(this.curOperand)
        console.log("comput: ", prev, " ", cur);

        if (isNaN(prev) || isNaN(cur)) {

            // throw (console.error("NAN value"))
            return

        }

        switch (this.operation) {
            case '+':
                res = prev + cur
                break;

            case '-':
                res = prev - cur
                break;

            case '*':
                res = prev * cur
                break;

            case '/':
                res = prev / cur
                break;

            case '+':
                res = prev + cur
                break;

            default:
                console.log("invalid Operation")
                break;
        }

        this.curOperand = res
        // this.prevOperandText.innerText = res;

        this.prevOperand = '';
        this.operation = undefined
        console.log("afterCompute: ", this.curOperand, " ", this.prevOperand);


    }
}







let prevOperandText = document.querySelector('[data-prev]');
let curOperandText = document.querySelector('[data-cur]');

// let prevOperandText= document.querySelector('.previous-operand');
// let curOperandText= document.querySelector('.cur-operand');

let numButtons = document.querySelectorAll('[data-num]');
let opButtons = document.querySelectorAll('[data-operation]');
let delButton = document.querySelector('[data-del]');

let equalsButton = document.querySelector('[data-equal]');
let clrButton = document.querySelector('[data-all-clr]');


const calculator = new Calculator(prevOperandText, curOperandText);

numButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // console.log(btn.innerText);
        calculator.appendNo(btn.innerText);
        calculator.updateDisplay();
    })
})


opButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // console.log(btn.innerText);
        calculator.chooseOper(btn.innerText);
        calculator.updateDisplay();
    })
})


equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})


clrButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})


delButton.addEventListener('click', () => {
    calculator.delChar()
    calculator.updateDisplay()
})



