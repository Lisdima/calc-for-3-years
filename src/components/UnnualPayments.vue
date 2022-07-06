<template lang="pug">
.payments-block
    .payments-block__title.title Выплата фиксированного ежегодного дохода
    .payout-info
      .payout-info__content
        .payout-info__list
          .payout-info__item(v-for="(item, idx) of time")
            .payout-info__item-fee
              span.payout-info__item-fee--text {{ idx + 1 }}-й взнос

              span.payout-info__price {{ fee }}

            .payout-info__item-pay(:class="{'loading-color': updateData}")
              .payout-info__block-text
                span.payout-info__text выплата
                span.payout-info__percent {{payoutPercent(idx + 1)}}

              span.payout-info__price {{ payoutSum(idx + 1) }} ₽

        .payout-info__result(:class="{'loading-color': updateData}")
          .payout-info__result-img(:class="{'payout-info__result-img--black': updateData}")
          .payout-info__result-info
            span.payout-info__result-text все взносы
            span.payout-info__price.payout-info__price_total.total-pay {{ totalPay}}
            span.payout-info__result-text все выплаты
            span.payout-info__price.payout-info__price_total {{ totalFee }}
                     
</template>

<script>
import Options from '@/components/AdditionalOptions.vue';
export default {
  props: {
    sum: {
      type: String,
    },
    time: {
      type: Number,
    },
    tooltipPayments: {
      type: Boolean,
    },
    tooltipOptions: Boolean,
    error: Boolean,
    updateData: {
      type: Boolean,
    },
  },
  components: {
    Options,
  },
  data() {},
  computed: {
    currentSum() {
      if (this.sum.toString().replace(/[^\d]/g, '') < 100000) {
        return '100000';
      }
      return this.sum.toString().replace(/[^\d]/g, '');
    },
    totalPay() {
      const sum = this.sum.toString().replace(/[^\d]/g, '');
      const total = Math.floor(Number(sum) * this.time);
      return total < 300000 ? `${this.addSpacesOnInput(300000)} ₽` : `${this.addSpacesOnInput(total)} ₽`;
    },
    totalFee() {
      const sum = this.sum.toString().replace(/[^\d]/g, '');
      const total = Math.floor(Number(sum) * 0.2) + Math.floor(Number(sum) * 0.2) + Math.floor(Number(sum) * 0.2);
      return total < 60000 ? `${this.addSpacesOnInput(60000)} ₽` : `${this.addSpacesOnInput(total)} ₽`;
    },
    fee() {
      const sum = this.sum.toString().replace(/[^\d]/g, '');
      return sum < 100000 ? `${this.addSpacesOnInput(100000)} ₽` : `${this.addSpacesOnInput(sum)} ₽`;
    },
  },
  methods: {
    addSpacesOnInput(value) {
      return value
        .toString()
        .split('')
        .reverse()
        .join('')
        .replace(/(\d{3}([,.]\d{1,2})?)/g, '$1 ')
        .split('')
        .reverse()
        .join('')
        .replace(/^ /, '');
    },
    orderUrl() {
      window.location.href = `https://order.renlife.ru/policy/?programBrief=NSZH_FINANCIAL_RENT_DSF_3YEAR&sum=${this.currentSum}${window.location.search.replace('?', '&')}`;
      return window.location.href;
    },
    formatPrice(value) {
      return `${value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`;
    },
    payoutSum(time) {
      if (time === 1) {
        const sumFirstYear = Math.floor(Number(this.sum.toString().replace(/[^\d]/g, '')) * 0.2);
        return sumFirstYear < 100000 * 0.2 ? this.addSpacesOnInput(Math.floor(100000 * 0.2)) : this.addSpacesOnInput(sumFirstYear);
      }
      if (time === 2) {
        const sumSecondYear = Math.floor(Number(this.sum.toString().replace(/[^\d]/g, '')) * 0.2);
        return sumSecondYear < 100000 * 0.2 ? this.addSpacesOnInput(Math.floor(100000 * 0.2)) : this.addSpacesOnInput(sumSecondYear);
      }
      const sumThirdYear = Math.floor(Number(this.sum.toString().replace(/[^\d]/g, '')) * 0.2);
      return sumThirdYear < 100000 * 0.2 ? this.addSpacesOnInput(Math.floor(100000 * 0.2)) : this.addSpacesOnInput(sumThirdYear);
    },
    payoutPercent(time) {
      if (time === 1) {
        return '20%';
      }
      if (time === 2) {
        return '20%';
      }
      return '20%';
    },
  },
};
</script>
<style lang="scss">
.payout-info {
  width: 100%;
  font-family: 'Gerbera', 'Helvetica', Arial, sans-serif;
  margin-top: 20px;
  &__content {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: row;
    @media (max-width: 959px) {
      flex-direction: column;
    }
  }
  &__block-text {
    font-weight: 300;
    font-size: 12px;
    line-height: 14px;
    margin-bottom: 5px;
    letter-spacing: -0.02em;
  }
  &__percent {
    font-weight: 400;
    background: #ffffff;
    border-radius: 24px;
    color: #28323c;
    padding: 0px 4px;
    margin-left: 4px;
  }
  &__price {
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    letter-spacing: -0.03em;
    white-space: nowrap;
    &_total {
      font-size: 18px;
      line-height: 22px;
    }
  }
  &__list {
    display: flex;
    width: 100%;
    flex-direction: row;
    @media (max-width: 959px) {
      justify-content: space-between;
      flex-direction: column;
    }
  }
  &__item {
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-direction: column;
    margin-right: 33px;
    @media (max-width: 980px) {
      margin-right: 8px;
    }
    @media (max-width: 959px) {
      margin-right: 0;
      flex-direction: row;
    }
  }
  &__item-fee,
  &__item-pay {
    display: flex;
    flex-direction: column;
    padding: 10px 12px;
    border-radius: 4px;
    @media (max-width: 959px) {
      padding: 8px 55px;
      margin-bottom: 16px;
      text-align: center;
    }
    @media (max-width: 430px) {
      padding: 8px 0;
      text-align: center;
    }
  }
  &__item-fee {
    position: relative;
    width: 109px;
    background: #f2f6fa;
    color: #28323c;
    margin-bottom: 32px;
    @media (max-width: 959px) {
      width: 100%;
      margin-right: 48px;
    }
    .payout-info__price {
      font-size: 16px;
      line-height: 22px;
    }
    &:after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 50%;
      right: auto;
      width: 8px;
      height: 13px;
      transform: translate(-50%, 100%);
      background-image: url('@/assets/images/arrow-down-step.svg');
      background-position: center;
      @media (max-width: 959px) {
        bottom: 50%;
        left: 100%;
        width: 12px;
        height: 8px;
        transform: translate(100%, 50%);
        background-image: url('@/assets/images/arrow-right-step.svg');
        background-position: 100%;
      }
    }
  }
  &__item-pay {
    width: 100%;
    background: linear-gradient(180deg, #b589e7 0%, #8563bf 44.84%, #503988 100%);
    box-shadow: 0px 23px 25px rgba(10, 60, 106, 0.03), 0px 11px 15px rgba(10, 35, 124, 0.05);
    color: #ffffff;
    @media (max-width: 959px) {
      height: fit-content;
    }
    .payout-info__text {
      font-size: 12px;
    }
    .payout-info__price {
      font-size: 16px;
      line-height: 22px;
    }
  }
  &__result-text,
  &__item-fee--text {
    margin-bottom: 4px;
    font-weight: 300;
  }
  &__result {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8px 12px;
    border-radius: 4px;
    height: 154px;
    min-width: 126px;
    width: 100%;
    background: 'Gerbera', 'Helvetica', Arial, sans-serif;
    color: #ffffff;
    background: linear-gradient(180deg, #b589e7 0%, #8563bf 44.84%, #503988 100%);
    box-shadow: 0px 23px 25px rgba(10, 60, 106, 0.03), 0px 11px 15px rgba(10, 35, 124, 0.05);
    @media (max-width: 959px) {
      width: 100%;
      flex-direction: row;
      height: auto;
      padding: 8px 28px 8px 40px;
    }
    &-info {
      display: flex;
      flex-direction: column;
      order: 1;
    }
    .total-pay {
      margin-bottom: 4px;
    }
  }
  &__result-img {
    position: relative;
    &:after {
      content: '';
      width: 45px;
      height: 42px;
      position: absolute;
      background-image: url('@/assets/images/money.svg');
      @media (max-width: 959px) {
        top: 55%;
        transform: scale(1.3) translate(0, -50%);
      }
    }
  }
  &__result-img--black {
    &:after {
      background-image: url('@/assets/images/money--black.svg');
    }
  }
  .loading-color {
    background: #eae6ed;
    color: #28323c;
  }
}
</style>
<style lang="scss">
.payments-block {
  &__calculation {
    margin-top: 16px;
    display: flex;
    margin-bottom: 29px;
    @media (max-width: 960px) {
      flex-direction: column;
    }
    @media (max-width: 640px) {
      flex-direction: row;
      overflow-x: scroll;
      white-space: nowrap;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    @media (max-width: 480px) {
      padding-right: 30px;
    }
    .calculation-item__opacity {
      display: none;
      @media (max-width: 480px) {
        display: block;
        position: absolute;
        right: 0;
        width: 40px;
        height: 50px;
        border-radius: 3px;
        background: #ffffff;
        opacity: 0.93;
      }
    }
  }
  .item {
    max-width: 98px;
    margin-right: 14px;
    &:last-child {
      margin-right: 0;
    }
  }
  .item-info {
    display: flex;
    align-items: baseline;
    &__time {
      font-size: 14px;
      line-height: 18px;
      font-weight: 300;
      margin-right: 8px;
    }
    &__bonus {
      padding: 2px 6px;
      font-size: 12px;
      background: #8c959e;
      color: #ffffff;
      border-radius: 24px;
      line-height: 14px;
    }
    .best-bonus {
      background: #0db089;
    }
  }
  &__issue {
    margin-top: 24px;
    @media (max-width: 640px) {
      margin-top: 0;
    }
    .disabled {
      &:hover {
        cursor: not-allowed;
      }
    }
  }
}
.block-deducation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 960px) {
    flex-direction: column;
    align-items: flex-start;
  }
  @media (max-width: 640px) {
    flex-direction: row;
    align-items: center;
  }
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
  .deducation-checkbox {
    display: flex;
    @media (max-width: 960px) {
      flex-direction: column;
    }
    @media (max-width: 640px) {
      flex-direction: row;
    }
    @media (max-width: 480px) {
      flex-direction: column;
    }
    &__description {
      display: flex;
      font-weight: 300;
      color: #8c959e;
      font-size: 16px;
      line-height: 22px;
      margin-left: 8px;
      @media (max-width: 960px) {
        margin-left: 36px;
      }
      @media (max-width: 640px) {
        margin-left: 8px;
        font-size: 14px;
        line-height: 18px;
      }
      @media (max-width: 480px) {
        margin-left: 36px;
      }
    }
    .deducation__question {
      position: relative;
      margin-left: 8px;
      color: #28323c;
      .tooltip-active {
        a {
          color: #3e70bb;
        }
        @media (max-width: 960px) {
          left: -500%;
        }
        @media (max-width: 640px) {
          left: -300%;
        }
      }
    }
  }
  .deducation-total {
    @media (max-width: 640px) {
      margin-top: 0;
    }
    &__name {
      font-size: 14px;
      line-height: 18px;
      font-weight: 300;
    }
  }
  .block-checkbox__deducation {
    margin-bottom: 0;
  }
}
.deducation-options {
  display: none;
  @media (max-width: 640px) {
    display: block;
    margin-top: 24px;
  }
}
</style>
