export class Financiamento {
    valorParcela = 0;
    totalAPrazo = 0;
    constructor(
      private readonly valorPresente: number,
      private readonly taxa: number,
      private readonly parcelas: number
    ) {
      this.calculate();
    }
    private calculate() {
      return parseFloat(
        (
          (this.valorPresente *
            (Math.pow(1 + this.taxa, this.parcelas) * this.taxa)) /
          (Math.pow(1 + this.taxa, this.parcelas) - 1)
        ).toFixed(2)
      );
    }
  }
  